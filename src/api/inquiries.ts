import { Hono } from 'hono';
import { authMiddleware } from '@getmocha/users-service/backend';

const inquiries = new Hono<{ Bindings: Env }>();

// Public endpoint - submit inquiry
inquiries.post('/', async (c) => {
  try {
    const body = await c.req.json();
    
    const result = await c.env.DB.prepare(
      'INSERT INTO inquiries (name, email, company, service, message, status) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(
      body.name,
      body.email,
      body.company || null,
      body.service,
      body.message,
      'new'
    ).run();
    
    return c.json({ success: true, id: result.meta.last_row_id }, 201);
  } catch (error) {
    return c.json({ error: 'Failed to submit inquiry' }, 500);
  }
});

// Admin endpoints - protected
inquiries.get('/', authMiddleware, async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM inquiries ORDER BY created_at DESC'
    ).all();
    
    return c.json(results);
  } catch (error) {
    return c.json({ error: 'Failed to fetch inquiries' }, 500);
  }
});

inquiries.patch('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  
  try {
    await c.env.DB.prepare(
      'UPDATE inquiries SET status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).bind(body.status, body.notes || null, id).run();
    
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: 'Failed to update inquiry' }, 500);
  }
});

inquiries.delete('/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  
  try {
    await c.env.DB.prepare('DELETE FROM inquiries WHERE id = ?').bind(id).run();
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: 'Failed to delete inquiry' }, 500);
  }
});

export default inquiries;
