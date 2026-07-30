#!/usr/bin/env python3
"""
OpenAI Billing Tracker — fetch usage/cost data from OpenAI's API.

Usage:
  python3 billing.py today          # spend today
  python3 billing.py week           # spend this week (last 7 days)
  python3 billing.py month          # spend this month
  python3 billing.py YYYY-MM-DD     # spend on a specific date
  python3 billing.py YYYY-MM-DD YYYY-MM-DD  # spend in date range

Requires: OPENAI_API_KEY in environment (with billing/usage read permissions).
"""

import os
import sys
import json
import urllib.request
import urllib.error
from datetime import date, datetime, timedelta, timezone


def api_key():
    key = os.environ.get("OPENAI_API_KEY", "")
    if not key:
        print("ERROR: OPENAI_API_KEY not set in environment.", file=sys.stderr)
        sys.exit(1)
    return key


def fetch_usage(start_date: date, end_date: date) -> list[dict]:
    """Fetch daily usage from OpenAI's usage API."""
    url = (
        f"https://api.openai.com/v1/usage"
        f"?date={start_date.isoformat()}"
        f"&end_date={end_date.isoformat()}"
    )
    req = urllib.request.Request(url)
    req.add_header("Authorization", f"Bearer {api_key()}")
    req.add_header("Content-Type", "application/json")

    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            return data.get("data", [])
    except urllib.error.HTTPError as e:
        body = e.read().decode() if e.fp else ""
        print(f"API error {e.code}: {body}", file=sys.stderr)
        sys.exit(1)


def resolve_dates(args: list[str]) -> tuple[date, date]:
    """Parse CLI args into a date range."""
    today = date.today()

    if not args:
        return today, today

    arg = args[0].lower()

    if arg == "today":
        return today, today
    elif arg == "yesterday":
        d = today - timedelta(days=1)
        return d, d
    elif arg in ("week", "7d"):
        return today - timedelta(days=6), today
    elif arg in ("month", "30d"):
        return today - timedelta(days=29), today
    elif arg == "last-month":
        first = today.replace(day=1) - timedelta(days=1)
        return first.replace(day=1), first
    else:
        # Try parsing as a date
        try:
            start = datetime.strptime(arg, "%Y-%m-%d").date()
        except ValueError:
            print(f"Unknown date range: {arg}", file=sys.stderr)
            print("Use: today, week, month, YYYY-MM-DD, or YYYY-MM-DD YYYY-MM-DD", file=sys.stderr)
            sys.exit(1)

        if len(args) >= 2:
            try:
                end = datetime.strptime(args[1], "%Y-%m-%d").date()
            except ValueError:
                print(f"Invalid end date: {args[1]}", file=sys.stderr)
                sys.exit(1)
            return start, end
        return start, start


def format_cost(cents: float) -> str:
    """Format cost from cents to a readable dollar amount."""
    dollars = cents / 100
    if dollars >= 1:
        return f"${dollars:.2f}"
    return f"{cents:.1f}¢"


def main():
    args = sys.argv[1:]
    start, end = resolve_dates(args)

    print(f"📊 OpenAI usage: {start.isoformat()} → {end.isoformat()}")
    print()

    usage_data = fetch_usage(start, end)

    if not usage_data:
        print("No usage data for this period.")
        return

    total_cost_cents = 0.0
    model_costs: dict[str, float] = {}
    daily_costs: dict[str, float] = {}

    for day in usage_data:
        day_total = 0.0
        date_str = day.get("snapshot_id", "unknown")  # "yyyy-mm-dd"

        for result in day.get("results", []):
            n_requests = result.get("n_requests", 0)
            n_context_tokens = result.get("n_context_tokens_total", 0)
            n_generated_tokens = result.get("n_generated_tokens_total", 0)

            # OpenAI bills in "usage cents" — each result has a cost field
            # The exact field name varies; try a few
            cost_cents = (
                result.get("usage_cents", 0) or
                result.get("cost", 0) or
                0.0
            )

            model = (
                result.get("snapshot_id", "") or
                result.get("model", "unknown")
            )

            if cost_cents:
                total_cost_cents += cost_cents
                day_total += cost_cents
                model_costs[model] = model_costs.get(model, 0) + cost_cents

        if day_total > 0:
            daily_costs[date_str] = day_total

    # Output
    print(f"  💰 Total: {format_cost(total_cost_cents)}")
    print()

    if model_costs:
        print("  By model:")
        for model, cost in sorted(model_costs.items(), key=lambda x: -x[1]):
            bar = "█" * min(int(cost / max(model_costs.values()) * 20) if max(model_costs.values()) > 0 else 0, 20)
            print(f"    {model:30s} {format_cost(cost):>8s}  {bar}")
        print()

    if daily_costs and len(daily_costs) > 1:
        print("  Daily:")
        for d in sorted(daily_costs):
            print(f"    {d}  {format_cost(daily_costs[d])}")


if __name__ == "__main__":
    main()
