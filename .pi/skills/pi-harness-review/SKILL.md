# Pi Harness Review

Analyze pi session history to identify automation opportunities and suggest new tools, skills, and AGENTS.md improvements.

## Quick Commands

If using the `harness-review.ts` extension:
- `/review-all-sessions` — Full analysis across all session history
- `/review-session` — Analyze just the current session

## When to Use

Run this skill when:
- You want to optimize your pi workflow
- You're experiencing friction with repetitive tasks
- You want to discover what tools/skills would be most valuable to build
- You're setting up a new project and want to copy useful patterns
- It's been a week+ since your last review

## Analysis Process

### 1. Gather Session Data

First, scan all session directories to understand your usage patterns:

```bash
# Find all session files with metadata
ls -la ~/.pi/agent/sessions/*/

# Get session counts per project
for dir in ~/.pi/agent/sessions/*/; do
  project=$(basename "$dir" | sed 's/--Users-dwain-//; s/--/\//g')
  count=$(ls "$dir"/*.jsonl 2>/dev/null | wc -l)
  echo "$count sessions: $project"
done | sort -rn

# Find largest sessions (most activity)
find ~/.pi/agent/sessions -name "*.jsonl" -exec wc -l {} \; 2>/dev/null | sort -rn | head -20
```

### 2. Analyze Tool Usage Patterns

Extract tool calls from sessions to see what you're using most:

```bash
# Sample recent sessions for tool patterns
cat ~/.pi/agent/sessions/--Users-dwain-.pi--/*.jsonl 2>/dev/null | \
  grep -o '"toolName":"[^"]*"' | sort | uniq -c | sort -rn | head -20
```

Look for:
- **High-frequency tools**: Good candidates for automation/aliases
- **Tool combinations**: Common sequences that could become single tools
- **Missing tools**: Tasks done via bash that could be native tools
- **Extension tools**: Which custom extensions are you actually using?

### 3. Identify Repetitive Patterns

Common repetition signals:

| Pattern | Suggestion |
|---------|------------|
| Frequent `j list` + `j start` | `j resume` command or smarter auto-suggest |
| Multiple `read` calls on same config files | Config watcher tool or cached reads |
| Repeated git status/add/commit sequences | Git batch tool or smart commit skill |
| Common file find + read patterns | Fuzzy file cache tool |
| Repeated `cd` to same directories | Project jumper command |
| Frequent `which j` / `cat $(which j)` | Better tool location skill |
| Model switching commands | Model preset shortcuts |

### 4. Review Extension Usage

Check which extensions are actively used vs just loaded:

```bash
# List all enabled extensions
ls ~/.pi/agent/extensions/*.ts 2>/dev/null | xargs -n1 basename

# Check if extensions have matching sessions (indicates active use)
grep -l "tilldone" ~/.pi/agent/sessions/*/*.jsonl 2>/dev/null | head -5
grep -l "purpose-gate" ~/.pi/agent/sessions/*/*.jsonl 2>/dev/null | head -5
grep -l "harness-review" ~/.pi/agent/sessions/*/*.jsonl 2>/dev/null | head -5
```

### 5. Identify Pain Points from Sessions

Look for error patterns and recovery flows:

```bash
# Find error responses in sessions
grep -h '"isError":true' ~/.pi/agent/sessions/*/*.jsonl 2>/dev/null | \
  jq -r '.message.content[0].text' 2>/dev/null | head -20

# Look for "not found" / "no such" errors
grep -h "ENOENT\|not found\|No such" ~/.pi/agent/sessions/*/*.jsonl 2>/dev/null | head -10
```

Common pain points to watch for:
- File not found errors → Better path completion
- JSON parse errors → JSON validation skill
- Git repo errors → Better git state detection
- TillDone gate blocks → Smarter task detection
- Permission errors → Permission pre-check tool

### 6. Cross-Reference with Other Agents

Check if Claude/Gemini/Codex have useful patterns:

```bash
# Check for other agent configs
ls -la ~/.claude/ 2>/dev/null
ls -la ~/.gemini/ 2>/dev/null
ls -la ~/.codex/ 2>/dev/null

# Look at cross-agent discoveries
ls .claude/commands/ 2>/dev/null
ls .claude/skills/ 2>/dev/null
```

## Suggested Tools & Skills to Build

Based on your current setup analysis, consider building:

### High Priority (Immediate Value)

1. **`job-picker` skill** - Suggests which job to start based on:
   - Recent git activity in project directories
   - Time since last session per project
   - Uncommitted changes
   - J jobs with "active" status but old timestamps

2. **`config-guard` tool** - Pre-validates JSON/config edits:
   - Catch trailing commas before save
   - Validate against schemas where known
   - Suggest fixes inline

3. **`project-hopper` command** - Fast project switching:
   - `/hop <fuzzy>` jumps to known project dirs
   - Maintains list of active projects
   - Auto-detects from git repos in ~/projects/

### Medium Priority (Workflow Enhancement)

4. **`session-summarizer` tool** - On session end:
   - Summarizes what was done
   - Suggests next steps
   - Updates j job status if appropriate
   - Generates changelog entries

5. **`git-batch` tool** - Smart git operations:
   - `/git status-all` - Status across all active projects
   - `/git sync` - Auto-commit + push with generated message
   - `/git clean-branches` - Remove merged branches across projects

6. **`model-rotate` command** - Quick model switching:
   - `/fast` → switches to fast/cheap model
   - `/deep` → switches to thinking model
   - `/local` → switches to local model

### Lower Priority (Nice to Have)

7. **`health-check` tool** - Diagnostics:
   - Validates pi configuration
   - Checks API key validity
   - Reports on extension load status
   - Suggests fixes for common issues

## AGENTS.md Improvements

Based on session analysis, suggest additions to `~/.pi/AGENTS.md`:

### Current Workflow Context

Add sections documenting:

```markdown
## Active Projects

Track current work contexts for smarter suggestions:

| Project | Path | Last Active | Current Job |
|---------|------|-------------|-------------|
| gesondheid.com | ~/projects/gesondheid.com | 2025-03-16 | Billing Invoicing |
| dotfiles | ~/.config | 2025-03-15 | pi harness |

## Preferred Tools by Context

When in specific project types:

**Laravel/PHP projects:**
- Use `artisan` commands over raw SQL
- Prefer `phpstan` checks before edits
- Run `pint` after PHP changes

**Pi harness work:**
- Always validate JSON before saving
- Use `/reload` after extension changes
- Check `j status` before starting

## Common Sequences

Document sequences you frequently run:

1. **Start work session:**
   ```
   j list → j start <job> → j status
   ```

2. **Make changes:**
   ```
   read → edit → bash (test) → tilldone complete
   ```

3. **End session:**
   ```
   git status → git add -p → git commit → j done
   ```
```

### Extension Configuration Notes

Add configuration patterns:

```markdown
## Extension Behavior

### TillDone
- Required before any tool execution
- Use `tilldone new-list` for exploratory work
- Use `tilldone add` for planned tasks

### Purpose Gate
- Set PURPOSE env var to skip prompt: `PURPOSE="fix auth" pi`
- Purpose persists for entire session
- Widget shows current purpose in UI

### J-Pi
- Gate is OFF by default — run `/j on` to enforce
- Without gate: tracks jobs but doesn't block
- With gate: blocks tools until job is active
```

## Review Checklist

When running this skill, verify:

- [ ] Analyzed session frequency by project
- [ ] Identified top 10 most-used tools
- [ ] Found 3+ repetitive patterns
- [ ] Checked for error patterns
- [ ] Reviewed active vs disabled extensions
- [ ] Cross-referenced other agent configs
- [ ] Generated specific tool/skill recommendations
- [ ] Suggested AGENTS.md improvements
- [ ] Prioritized suggestions (high/medium/low)

## Output Format

Produce findings as:

```markdown
# Pi Harness Review — YYYY-MM-DD

## Usage Summary
- X total sessions across Y projects
- Most active project: NAME (Z sessions)
- Average session length: N messages

## Tool Usage Rankings
1. read (45%) - consider caching frequently read configs
2. edit (25%) - validation skill would help
3. bash (15%) - many could be native tools
...

## Repetitive Patterns Found
1. [Pattern] → [Suggested Solution]
2. ...

## Recommended New Tools
### High Priority
1. **tool-name** - What it does and why

### Medium Priority
1. ...

## AGENTS.md Suggestions
- Add section: X
- Document pattern: Y
- Configure extension: Z
```

## Steps

1. Run session analysis commands to gather data
2. Identify patterns and pain points
3. Cross-reference with extensions and other agents
4. Generate prioritized recommendations
5. Suggest AGENTS.md improvements
6. Output formatted review report
