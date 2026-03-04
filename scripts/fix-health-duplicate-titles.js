#!/usr/bin/env node
/**
 * Remove duplicate # headings from health docs
 * Starlight uses the frontmatter title, so the first # heading is redundant
 */

import fs from 'fs';
import path from 'path';

const HEALTH_DOCS_DIR = process.env.HOME + '/projects/dwain.maralack.com-astro/src/content/docs/health';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Match frontmatter
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) return;

  const frontmatter = fmMatch[1];
  let body = fmMatch[2];

  // Check if body starts with a # heading (allowing whitespace)
  const headingMatch = body.match(/^\s*#\s+.+\n+/);
  if (headingMatch) {
    // Remove the first heading
    body = body.replace(/^\s*#\s+.+\n+/, '');
    content = `---\n${frontmatter}\n---\n\n${body}`;
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.md')) {
      processFile(filePath);
    }
  }
}

console.log('Removing duplicate # headings from health docs...\n');
walkDir(HEALTH_DOCS_DIR);
console.log('\nDone!');
