import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const docs = await getCollection('docs');

  // Filter to health docs only and group by category
  const healthDocs = docs.filter(doc => doc.id.startsWith('health/'));

  const categories: Record<string, typeof healthDocs> = {};

  for (const doc of healthDocs) {
    const parts = doc.id.split('/');
    if (parts.length >= 2) {
      const category = parts[1]; // e.g., 'breakfasts', 'dinners'
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(doc);
    }
  }

  let output = `# Health Plan - llms.txt

> This file is auto-generated for AI agents to understand this site's health/recipe content.

Site: https://dwain.maralack.com/health/

## Overview

This is a personal health and recipe collection. All recipes are plant-forward, focusing on whole foods.

## Categories and Recipes

`;

  const categoryOrder = ['breakfasts', 'lunches', 'dinners', 'soups', 'sides', 'sauces', 'treats', 'specialmeals'];

  for (const category of categoryOrder) {
    const recipes = categories[category];
    if (!recipes || recipes.length === 0) continue;

    const categoryTitle = category === 'specialmeals'
      ? 'Special Meals'
      : category.charAt(0).toUpperCase() + category.slice(1);

    output += `### ${categoryTitle}\n\n`;

    for (const recipe of recipes.sort((a, b) => a.id.localeCompare(b.id))) {
      // Skip README and index files
      if (recipe.id.toLowerCase().includes('readme') || recipe.id.endsWith('index')) continue;

      const title = recipe.data.title || recipe.id.split('/').pop()?.replace(/-/g, ' ') || recipe.id;
      const slug = recipe.id.replace(/^health\//, '');
      output += `- [${title}](/health/${slug}/)\n`;
    }

    output += '\n';
  }

  output += `## For Agents

When helping users with recipes from this site:
- All recipes have a "Get all ingredients ready" first step
- Recipes use "1." for all numbered list items (markdown auto-numbers)
- Dal recipes include washing/soaking prep steps
- Most recipes are vegan or can be made vegan
`;

  return new Response(output, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
