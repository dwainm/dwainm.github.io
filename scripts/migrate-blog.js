#!/usr/bin/env node
/**
 * Migration script for Jekyll blog posts to Astro
 *
 * - Extracts date from Jekyll filename (YYYY-MM-DD-slug.md)
 * - Strips date prefix from new filename
 * - Injects/updates date in front matter
 * - Updates image paths from /images/ to /images/blog/
 * - Handles drafts (0draft-* files) separately
 */

import fs from 'fs';
import path from 'path';

const JEKYLL_POSTS_DIR = process.env.HOME + '/dwain.maralack.com/_posts';
const ASTRO_BLOG_DIR = process.env.HOME + '/projects/dwain.maralack.com-astro/src/content/blog';
const ASTRO_DRAFTS_DIR = process.env.HOME + '/projects/dwain.maralack.com-astro/src/content/drafts';

// Regex to match Jekyll post filename: YYYY-MM-DD-slug.md
const JEKYLL_FILENAME_REGEX = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/;
// Regex to match draft filename: 0draft-* or 0draft_*
const DRAFT_FILENAME_REGEX = /^0draft[-_](.+)$/;

function parseFrontMatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (match) {
    return {
      frontMatter: match[1],
      body: match[2],
      hasFrontMatter: true
    };
  }
  return {
    frontMatter: '',
    body: content,
    hasFrontMatter: false
  };
}

function updateImagePaths(content) {
  // Update markdown image syntax: ![alt](/images/...) -> ![alt](/images/blog/...)
  // Also handle images that might be in root like /071CFE3E-...
  let updated = content.replace(
    /!\[([^\]]*)\]\(\/images\/([^)]+)\)/g,
    '![alt](/images/blog/$2)'
  );

  // Update Jekyll post_url references to simple links
  updated = updated.replace(
    /\{%\s*post_url\s+(\d{4}-\d{2}-\d{2})-([^\s%]+)\s*%\}/g,
    '/$2/'
  );

  return updated;
}

function extractDateFromFrontMatter(frontMatter) {
  const dateMatch = frontMatter.match(/^date:\s*(.+)$/m);
  if (dateMatch) {
    // Extract just the date part (YYYY-MM-DD) from various formats
    const dateStr = dateMatch[1].trim();
    const isoMatch = dateStr.match(/^(\d{4}-\d{2}-\d{2})/);
    if (isoMatch) {
      return isoMatch[1];
    }
  }
  return null;
}

function updateOrAddDate(frontMatter, date) {
  if (frontMatter.match(/^date:/m)) {
    // Update existing date to just YYYY-MM-DD format
    return frontMatter.replace(/^date:\s*.+$/m, `date: ${date}`);
  }
  // Add date after title if exists, otherwise at start
  if (frontMatter.match(/^title:/m)) {
    return frontMatter.replace(/^(title:\s*.+)$/m, `$1\ndate: ${date}`);
  }
  return `date: ${date}\n${frontMatter}`;
}

function removeLayoutField(frontMatter) {
  return frontMatter.replace(/^layout:\s*.+\r?\n?/m, '');
}

function migratePost(filename) {
  const filePath = path.join(JEKYLL_POSTS_DIR, filename);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Check if it's a draft
  const draftMatch = filename.match(DRAFT_FILENAME_REGEX);
  if (draftMatch) {
    // Handle draft
    let newFilename = draftMatch[1];
    if (!newFilename.endsWith('.md')) {
      newFilename += '.md';
    }
    // Clean up filename
    newFilename = newFilename
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-\.]/g, '');

    const destPath = path.join(ASTRO_DRAFTS_DIR, newFilename);

    // Update image paths in drafts too
    const updatedContent = updateImagePaths(content);
    fs.writeFileSync(destPath, updatedContent);

    console.log(`Draft: ${filename} -> drafts/${newFilename}`);
    return { type: 'draft', source: filename, dest: newFilename };
  }

  // Check if it's a dated post
  const match = filename.match(JEKYLL_FILENAME_REGEX);
  if (!match) {
    console.warn(`Skipping non-standard file: ${filename}`);
    return null;
  }

  const [, dateFromFilename, slug] = match;
  const newFilename = `${slug}.md`;
  const destPath = path.join(ASTRO_BLOG_DIR, newFilename);

  const { frontMatter, body, hasFrontMatter } = parseFrontMatter(content);

  // Determine the date to use
  const existingDate = extractDateFromFrontMatter(frontMatter);
  const finalDate = existingDate || dateFromFilename;

  // Build new content
  let newFrontMatter = frontMatter;
  newFrontMatter = updateOrAddDate(newFrontMatter, finalDate);
  newFrontMatter = removeLayoutField(newFrontMatter);

  // Update image paths in body
  const updatedBody = updateImagePaths(body);

  let newContent;
  if (hasFrontMatter || newFrontMatter.trim()) {
    newContent = `---\n${newFrontMatter.trim()}\n---\n${updatedBody}`;
  } else {
    newContent = updatedBody;
  }

  fs.writeFileSync(destPath, newContent);

  console.log(`Post: ${filename} -> blog/${newFilename} (date: ${finalDate})`);
  return { type: 'post', source: filename, dest: newFilename, date: finalDate };
}

function main() {
  console.log('Starting blog migration...\n');

  // Ensure destination directories exist
  fs.mkdirSync(ASTRO_BLOG_DIR, { recursive: true });
  fs.mkdirSync(ASTRO_DRAFTS_DIR, { recursive: true });

  const files = fs.readdirSync(JEKYLL_POSTS_DIR);

  const results = {
    posts: [],
    drafts: [],
    skipped: []
  };

  for (const file of files) {
    if (!file.endsWith('.md') && !file.match(DRAFT_FILENAME_REGEX)) {
      continue;
    }

    const result = migratePost(file);
    if (result) {
      if (result.type === 'post') {
        results.posts.push(result);
      } else {
        results.drafts.push(result);
      }
    } else {
      results.skipped.push(file);
    }
  }

  console.log('\n--- Migration Summary ---');
  console.log(`Posts migrated: ${results.posts.length}`);
  console.log(`Drafts migrated: ${results.drafts.length}`);
  console.log(`Skipped: ${results.skipped.length}`);

  if (results.skipped.length > 0) {
    console.log('\nSkipped files:');
    results.skipped.forEach(f => console.log(`  - ${f}`));
  }
}

main();
