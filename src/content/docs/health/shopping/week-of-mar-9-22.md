---
title: "Week of Mar 9-22"
sidebar:
  badge:
    text: "Current"
    variant: success
---

2-week shopping list from the menu plan, scaled for a family of 6.

_Tip: checkboxes are interactive and saved in this browser._

## Produce

- [ ] Onions: 18-22 medium
- [ ] Garlic: 8-10 bulbs
- [ ] Potatoes (white/gold): 10-12 kg (22-26 lb)
- [ ] Sweet potatoes: 16-20 medium
- [ ] Cauliflower: 4 large heads
- [ ] Butternut squash: 3-4 medium
- [ ] Mushrooms (mix of portobello + brown): 5-6 kg (11-13 lb)
- [ ] Bell peppers: 12-16
- [ ] Carrots: 3 kg (6-7 lb)
- [ ] Celery: 3 bunches
- [ ] Spinach + kale + arugula + romaine: 16-20 total bags/bunches
- [ ] Fresh tomatoes: 2.5-3 kg (5-7 lb)
- [ ] Avocados: 12-16
- [ ] Limes: 10-12
- [ ] Lemons: 10-12
- [ ] Fresh herbs (cilantro, basil, parsley): 8-10 bunches
- [ ] Grapefruit: 24
- [ ] Apples: 18-24
- [ ] Bananas: 30-36

## Canned / Jarred / Cartons

- [ ] Black beans: 16-20 cans
- [ ] Cannellini/white beans: 12-16 cans
- [ ] Chickpeas: 8-10 cans
- [ ] Lentils: 2-2.5 kg dry (or 16-20 cans)
- [ ] Fava beans: 6-8 cans (or frozen equivalent)
- [ ] Diced/crushed/fire-roasted tomatoes: 20-24 cans
- [ ] Tomato paste: 8-10 small cans
- [ ] Vegetable broth/stock: 10-12 liters
- [ ] Coconut milk: 8-10 cans
- [ ] Salsa/pico: 5-6 large jars
- [ ] Nutritional yeast: 500-700 g
- [ ] Tahini or peanut butter: 1 large jar

## Grains, Pasta, Bread, Tortillas

- [ ] Rolled oats: 4-5 kg (9-11 lb)
- [ ] Oat flour (or extra oats to blend): 1-1.5 kg
- [ ] Teff flour: 1-1.5 kg
- [ ] Brown rice: 3-4 kg
- [ ] Barley: 1.5-2 kg
- [ ] Dry pasta (penne/linguine/spaghetti): 4.5-5.5 kg
- [ ] Corn tortillas: 90-110
- [ ] Whole grain bread: 6-8 loaves
- [ ] Burger buns: 12-18

## Refrigerated

- [ ] Plant milk: 12-16 liters
- [ ] Vegan cheese/shreds (if using): 1.5-2.5 kg
- [ ] Plant yogurt (optional): 2-3 large tubs

## Frozen

- [ ] Corn kernels: 2-3 kg
- [ ] Mixed vegetables (backup): 2-3 kg
- [ ] Spinach (backup): 1.5-2 kg
- [ ] Berries: 2-3 kg

## Baking + Snacks

- [ ] Raisins: 1.5-2 kg
- [ ] Maple syrup: 1-1.5 liters
- [ ] Dates (optional): 1 kg
- [ ] Vanilla extract: 1 bottle
- [ ] Cinnamon: 1 jar
- [ ] Nutmeg: 1 jar
- [ ] Baking powder: 1 pack
- [ ] Baking soda: 1 pack
- [ ] Dark chocolate chips/cocoa (optional): 500 g-1 kg

## Nuts, Seeds, Spices

- [ ] Walnuts: 800 g-1 kg
- [ ] Chia/hemp/flax mix: 1-1.5 kg total
- [ ] Salt, pepper, cumin, coriander, paprika, smoked paprika, chili powder, oregano, turmeric, curry powder/garam masala, garlic powder, onion powder: top up to full jars

<script is:inline>
  (() => {
    const checkboxes = Array.from(
      document.querySelectorAll('.sl-markdown-content li.task-list-item input[type="checkbox"]'),
    );

    if (checkboxes.length === 0) return;

    const storageKey = `shopping-list:${window.location.pathname}`;
    const saved = JSON.parse(window.localStorage.getItem(storageKey) || '{}');

    const persist = () => {
      const next = {};
      checkboxes.forEach((checkbox, index) => {
        const itemText = checkbox.parentElement?.textContent?.trim() || `item-${index}`;
        next[itemText] = checkbox.checked;
      });
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    };

    checkboxes.forEach((checkbox, index) => {
      const itemText = checkbox.parentElement?.textContent?.trim() || `item-${index}`;
      checkbox.disabled = false;
      checkbox.checked = Boolean(saved[itemText]);
      checkbox.addEventListener('change', persist);
    });
  })();
</script>
