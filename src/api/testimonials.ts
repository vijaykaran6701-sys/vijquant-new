import { Hono } from 'hono';
import { authMiddleware } from '@getmocha/users-service/backend';

const testimonials = new Hono<{ Bindings: Env }>();

// Get all featured testimonials (public)
testimonials.get('/', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM testimonials WHERE is_featured = 1 ORDER BY display_order ASC'
    ).all();
    
    return c.json(results);
  } catch (error) {
    return c.json({ error: 'Failed to fetch testimonials' }, 500);
  }
});

// Get all testimonials (admin)
testimonials.get('/admin/all', authMiddleware, async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM testimonials ORDER BY display_order ASC, created_at DESC'
    ).all();
    
    return c.json(results);
  } catch (error) {
    return c.json({ error: 'Failed to fetch testimonials' }, 500);
  }
});

// Create testimonial (admin)
testimonials.post('/', authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    
    const result = await c.env.DB.prepare(
      'INSERT INTO testimonials (client_name, client_title, client_company, client_image, testimonial, rating, project_type, is_featured, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      body.client_name,
      body.client_title || null,
      body.client_company || null,
      body.client_image || null,
      body.testimonial,
      body.rating || 5,
      body.project_type || null,
      body.is_featured ? 1 : 0,
      body.display_order || 0
    ).run();
    
    return c.json({ success: true, id: result.meta.last_row_id }, 201);
  } catch (error) {
    return c.json({ error: 'Failed to create testimonial' }, 500);
  }
});

// Update testimonial (admin)
testimonials.patch('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  
  try {
    await c.env.DB.prepare(
      'UPDATE testimonials SET client_name = ?, client_title = ?, client_company = ?, client_image = ?, testimonial = ?, rating = ?, project_type = ?, is_featured = ?, display_order = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).bind(
      body.client_name,
      body.client_title || null,
      body.client_company || null,
      body.client_image || null,
      body.testimonial,
      body.rating || 5,
      body.project_type || null,
      body.is_featured ? 1 : 0,
      body.display_order || 0,
      id
    ).run();
    
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: 'Failed to update testimonial' }, 500);
  }
});

// Delete testimonial (admin)
testimonials.delete('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  
  try {
    await c.env.DB.prepare('DELETE FROM testimonials WHERE id = ?').bind(id).run();
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: 'Failed to delete testimonial' }, 500);
  }
});

export default testimonials;
