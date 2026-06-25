import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog', entry =>
    entry.id.startsWith('en/') && !entry.data.draft
  );

  return rss({
    title: 'Alexandru Chifeac',
    description: "I write about AI and everything I don't yet understand.",
    site: context.site,
    items: posts
      .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
      .map(post => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/en/blog/${post.id.replace(/^en\//, '').replace(/\.md$/, '')}`,
      })),
  });
}
