import { Hono } from 'hono';
import { authMiddleware } from '@getmocha/users-service/backend';

const portfolio = new Hono<{ Bindings: Env }>();

// Public endpoint - get all portfolio items
portfolio.get('/', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM portfolio_items ORDER BY display_order ASC, created_at DESC'
    ).all();
    
    return c.json(results);
  } catch (error) {
    return c.json({ error: 'Failed to fetch portfolio items' }, 500);
  }
});

// Admin endpoints - protected
portfolio.post('/', authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    
    const result = await c.env.DB.prepare(
      'INSERT INTO portfolio_items (title, slug, category, description, problem, solution, tools, image, demo_url, github_url, is_featured, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      body.title,
      body.slug,
      body.category,
      body.description || null,
      body.problem || null,
      body.solution || null,
      body.tools || null,
      body.image || null,
      body.demo_url || null,
      body.github_url || null,
      body.is_featured ? 1 : 0,
      body.display_order || 0
    ).run();
    
    return c.json({ success: true, id: result.meta.last_row_id }, 201);
  } catch (error) {
    return c.json({ error: 'Failed to create portfolio item' }, 500);
  }
});

portfolio.patch('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  
  try {
    await c.env.DB.prepare(
      'UPDATE portfolio_items SET title = ?, slug = ?, category = ?, description = ?, problem = ?, solution = ?, tools = ?, image = ?, demo_url = ?, github_url = ?, is_featured = ?, display_order = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).bind(
      body.title,
      body.slug,
      body.category,
      body.description || null,
      body.problem || null,
      body.solution || null,
      body.tools || null,
      body.image || null,
      body.demo_url || null,
      body.github_url || null,
      body.is_featured ? 1 : 0,
      body.display_order || 0,
      id
    ).run();
    
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: 'Failed to update portfolio item' }, 500);
  }
});

portfolio.delete('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  
  try {
    await c.env.DB.prepare('DELETE FROM portfolio_items WHERE id = ?').bind(id).run();
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: 'Failed to delete portfolio item' }, 500);
  }
});

export default portfolio;
