import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog', entry =>
    entry.id.startsWith('it/') && !entry.data.draft
  );

  return rss({
    title: 'Alexandru Chifeac',
    description: 'Scrivo di AI e di tutto ciò che non capisco ancora.',
    site: context.site,
    items: posts
      .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
      .map(post => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/it/blog/${post.id.replace(/^it\//, '').replace(/\.md$/, '')}`,
      })),
  });
}
