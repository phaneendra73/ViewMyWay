import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const tagRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables:{
    UserId:string;
  }
}>();

// Middleware to apply JWT verification to all routes
tagRoutes.use('/*', async (c, next) => {
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader) {
      return c.json({ error: 'Unauthorized: No token provided' }, 401);
    }
    const token = authHeader.split(' ')[1]; 
  
    try {
      const user = await verify(token, c.env.JWT_SECRET);
      if (user) {
        c.set('UserId', String(user.id)); // Set user ID for later use in the request
        await next(); // Proceed to the next middleware or route handler
      } else {
        return c.json({ error: 'Unauthorized: Invalid token' }, 401);
      }
    } catch (err) {
      console.error(err); // Log the error for debugging
      return c.json({ error: 'Unauthorized: Token verification failed' }, 401);
    }
  });

tagRoutes.get('/tags', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate());
          const tags = await prisma.tag.findMany();
          return c.json(tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
      return c.json({ error: 'Internal server error' }, 500);
    }
  });

  tagRoutes.get(':id/posts', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate());
          const { id } = c.req.param();
console.log(id)
        try {
          const tagId = parseInt(id, 10);
          if (isNaN(tagId)) {
            return c.json({ error: 'Invalid tag ID' }, 400);
          }
      
          const tag = await prisma.tag.findUnique({
            where: { id: tagId },
            include: {
              posts: true, // Fetch related posts
            },
          });
      
          if (!tag) {
            return c.json({ error: 'Tag not found' }, 404);
          }
      
          return c.json(tag.posts); // Return only the posts
        } catch (error) {
          console.error("Error fetching posts by tag ID:", error);
          return c.json({ error: 'Internal server error' }, 500);
        }
    } catch (error) {
      console.error("Error fetching tags:", error);
      return c.json({ error: 'Internal server error' }, 500);
    }
  });
