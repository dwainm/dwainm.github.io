#!/usr/bin/env node
/**
 * Generate health index.md with auto-generated recipe lists
 */

import fs from 'fs';
import path from 'path';

const HEALTH_DOCS_DIR = process.env.HOME + '/projects/dwain.maralack.com-astro/src/content/docs/health';

const categories = ['breakfasts', 'lunches', 'dinners', 'soups', 'sides', 'treats', 'specialmeals'];
const categoryNames = {
  breakfasts: 'Breakfasts',
  lunches: 'Lunches',
  dinners: 'Dinners',
  soups: 'Soups',
  sides: 'Sides',
  treats: 'Treats',
  specialmeals: 'Special Meals',
};

function getTitle(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^title:\s*"?([^"\n]+)"?/m);
  return match ? match[1] : path.basename(filePath, '.md');
}

function getRecipes(category) {
  const dir = path.join(HEALTH_DOCS_DIR, category);
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md') && f !== 'README.md')
    .map(f => ({
      slug: f.replace('.md', ''),
      title: getTitle(path.join(dir, f)),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

let content = `---
title: "Meals"
---

Our core rotation. These are automatic, repeatable, and scalable.

`;

for (const cat of categories) {
  const recipes = getRecipes(cat);
  content += `## ${categoryNames[cat]} (${recipes.length})\n\n`;

  for (const r of recipes) {
    content += `- [${r.title}](/health/${cat}/${r.slug}/)\n`;
  }

  content += '\n';
}

content += `---

## Rules for Adding Meals

1. Must feed 6 people without stress
2. Must use ingredients on our standard shopping list
3. Must be acceptable to all 4 kids (or easily modified)
4. Must work as leftovers for lunch
5. No more than 22 total

---

*Simple, repeatable, sustainable.*
`;

fs.writeFileSync(path.join(HEALTH_DOCS_DIR, 'index.md'), content);
console.log('Generated health index.md');
