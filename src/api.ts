import { Hono } from 'hono';

const app = new Hono();

// Inquiries endpoint
app.post('/api/inquiries', async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // For now, just log the inquiry (database will be added in a future task)
    console.log('New inquiry received:', { name, email, phone, service, message });

    return c.json({ 
      success: true, 
      message: 'Inquiry received successfully' 
    });
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return c.json({ error: 'Failed to process inquiry' }, 500);
  }
});

export default app;
