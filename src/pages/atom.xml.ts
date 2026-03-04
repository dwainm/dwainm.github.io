import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import type { APIContext } from 'astro';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');

  const sortedPosts = posts
    .filter(post => !post.data.draft)
    .sort((a, b) => {
      const dateA = a.data.date || new Date(0);
      const dateB = b.data.date || new Date(0);
      return dateB.getTime() - dateA.getTime();
    });

  function extractTitle(post: typeof posts[0]): string {
    if (post.data.title) return post.data.title;
    const match = post.body?.match(/^#\s+(.+)$/m);
    if (match) return match[1];
    return post.id.replace(/-/g, ' ');
  }

  return rss({
    title: 'Dwain Maralack',
    description: 'Life, software and business.',
    site: context.site || 'https://dwain.maralack.com',
    items: sortedPosts.map(post => ({
      title: extractTitle(post),
      pubDate: post.data.date || new Date(),
      link: `/${post.id}/`,
      content: sanitizeHtml(parser.render(post.body || ''), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      }),
    })),
  });
}
