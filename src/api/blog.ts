import { Hono } from 'hono';
import { authMiddleware } from '@getmocha/users-service/backend';

const blog = new Hono<{ Bindings: Env }>();

// Get all published blog posts (public)
blog.get('/', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT id, title, slug, excerpt, author, category, tags, featured_image, published_at FROM blog_posts WHERE is_published = 1 ORDER BY published_at DESC'
    ).all();
    
    return c.json(results);
  } catch (error) {
    return c.json({ error: 'Failed to fetch blog posts' }, 500);
  }
});

// Get all blog posts including drafts (admin)
blog.get('/admin/all', authMiddleware, async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM blog_posts ORDER BY created_at DESC'
    ).all();
    
    return c.json(results);
  } catch (error) {
    return c.json({ error: 'Failed to fetch blog posts' }, 500);
  }
});

// Create blog post (admin)
blog.post('/', authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    
    const result = await c.env.DB.prepare(
      'INSERT INTO blog_posts (title, slug, excerpt, content, author, category, tags, featured_image, is_published, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      body.title,
      body.slug,
      body.excerpt || null,
      body.content,
      body.author,
      body.category || null,
      body.tags || null,
      body.featured_image || null,
      body.is_published ? 1 : 0,
      body.is_published ? new Date().toISOString() : null
    ).run();
    
    return c.json({ success: true, id: result.meta.last_row_id }, 201);
  } catch (error) {
    return c.json({ error: 'Failed to create blog post' }, 500);
  }
});

// Update blog post (admin)
blog.patch('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  
  try {
    await c.env.DB.prepare(
      'UPDATE blog_posts SET title = ?, slug = ?, excerpt = ?, content = ?, author = ?, category = ?, tags = ?, featured_image = ?, is_published = ?, published_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).bind(
      body.title,
      body.slug,
      body.excerpt || null,
      body.content,
      body.author,
      body.category || null,
      body.tags || null,
      body.featured_image || null,
      body.is_published ? 1 : 0,
      body.is_published && !body.published_at ? new Date().toISOString() : body.published_at,
      id
    ).run();
    
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: 'Failed to update blog post' }, 500);
  }
});

// Delete blog post (admin)
blog.delete('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  
  try {
    await c.env.DB.prepare('DELETE FROM blog_posts WHERE id = ?').bind(id).run();
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: 'Failed to delete blog post' }, 500);
  }
});

// Get single blog post by slug (public)
blog.get('/:slug', async (c) => {
  const slug = c.req.param('slug');
  
  try {
    const post = await c.env.DB.prepare(
      'SELECT * FROM blog_posts WHERE slug = ? AND is_published = 1'
    ).bind(slug).first();
    
    if (!post) {
      return c.json({ error: 'Blog post not found' }, 404);
    }
    
    return c.json(post);
  } catch (error) {
    return c.json({ error: 'Failed to fetch blog post' }, 500);
  }
});

export default blog;
