import { Hono } from 'hono';
import { cors } from 'hono/cors'
import { userRoutes } from './routes/user';
import { postRoutes } from './routes/post';

const app = new Hono();
app.use('/*', cors())
// Define your specific routes
app.route('/api/v1/user', userRoutes);
app.route('/api/v1/post', postRoutes);

// Catch-all route for unmatched routes
app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});

// Optional: Catch-all for other types of errors
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: 'Internal Server Error' }, 500);
});

export default app;