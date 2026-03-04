#!/usr/bin/env node
/**
 * Add Starlight-compatible frontmatter to health docs
 * Extracts title from first # heading
 */

import fs from 'fs';
import path from 'path';

const HEALTH_DOCS_DIR = process.env.HOME + '/projects/dwain.maralack.com-astro/src/content/docs/health';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Check if already has frontmatter
  if (content.startsWith('---')) {
    // Already has frontmatter, check if it has title
    const fmEnd = content.indexOf('---', 3);
    if (fmEnd !== -1) {
      const frontmatter = content.slice(3, fmEnd);
      if (frontmatter.includes('title:')) {
        console.log(`Skipping (has title): ${filePath}`);
        return;
      }
      // Add title to existing frontmatter
      const titleMatch = content.match(/^#\s+(.+)$/m);
      if (titleMatch) {
        const title = titleMatch[1].trim();
        const newFrontmatter = `title: "${title}"\n${frontmatter}`;
        content = `---\n${newFrontmatter}---${content.slice(fmEnd + 3)}`;
        fs.writeFileSync(filePath, content);
        console.log(`Added title to: ${filePath}`);
      }
    }
    return;
  }

  // No frontmatter, extract title from first heading
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    const title = titleMatch[1].trim();
    const newContent = `---\ntitle: "${title}"\n---\n\n${content}`;
    fs.writeFileSync(filePath, newContent);
    console.log(`Created frontmatter: ${filePath}`);
  } else {
    // No heading, use filename
    const filename = path.basename(filePath, '.md');
    const title = filename.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const newContent = `---\ntitle: "${title}"\n---\n\n${content}`;
    fs.writeFileSync(filePath, newContent);
    console.log(`Created frontmatter from filename: ${filePath}`);
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

console.log('Processing health docs...\n');
walkDir(HEALTH_DOCS_DIR);
console.log('\nDone!');
