import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { postSchema } from '@phaneendra73/blog-common';

// Initialize Prisma Client once


export const postRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables:{
    UserId:string;
  }
}>();



// Middleware to apply JWT verification to all routes
postRoutes.use('/*', async (c, next) => {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader) {
    return c.json({ error: 'Unauthorized: No token provided' }, 401);
  }
console.log(authHeader)
  const token = authHeader.split(' ')[1]; 

  try {
    const user = await verify(token, c.env.JWT_SECRET);
    
    if (user) {
      c.set('UserId', String(user.Id)); // Set user ID for later use in the request
      await next(); // Proceed to the next middleware or route handler
    } else {
      return c.json({ error: 'Unauthorized: Invalid token' }, 401);
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    return c.json({ error: 'Unauthorized: Token verification failed' }, 401);
  }
});


// Get all posts
postRoutes.get('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());


  const posts = await prisma.post.findMany({
    include: {
      author: true,
      tags: true,
    },
  });
  return c.json(posts);
});

// Create a new post
postRoutes.post('/create', async (c) => {
  const body = await c.req.json();
  const parsedBody = postSchema.safeParse(body);

  if (!parsedBody.success) {
    return c.json({ error: 'Invalid input', details: parsedBody.error.errors }, 400);
  }

  const { title, content, published, tags } = parsedBody.data;
  const userId = c.get('UserId');

  if (!userId) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  // Create the post with associated tags
  const post = await prisma.post.create({
  
    data: {
      title,
      content,
      published: published ?? false,
      authorId: userId,
      tags: {
        connect: (tags || []).map((tagId : any) => ({ id: tagId })),
      },
    },
  });

  return c.json(post, 201);
});

// Get a post by ID
postRoutes.get('/get/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const { id } = c.req.param();
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
      tags: true,
    },
  });

  if (!post) {
    return c.json({ error: 'Post not found' }, 404);
  }

  return c.json(post);
});

// Update a post by ID
postRoutes.put('/update/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const { id } = c.req.param();
  const userId = c.get('UserId');
  const body = await c.req.json();
  const parsedBody = postSchema.safeParse(body);

  if (!parsedBody.success) {
    return c.json({ error: 'Invalid input', details: parsedBody.error.errors }, 400);
  }

  const { title, content, published, tags } = parsedBody.data;

  // Check if the post exists and retrieve the author ID
  const post = await prisma.post.findUnique({
    where: { id },
    select: {
      authorId: true,
      title: true,
      content: true,
      published: true,
      tags: true,
    },
  });

  if (!post) {
    return c.json({ error: 'Post not found' }, 404);
  }

  if (post.authorId !== userId) {
    return c.json({ error: 'Unauthorized to update this post' }, 403);
  }

  // Proceed with updating the post if the user is the author
  const updatedPost = await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      published: published ?? false,
      tags: tags ? {
        set: tags.map((tagId: any) => ({ id: tagId })),
      } : undefined,
    },
    include: {
      tags: true,
    },
  });

  return c.json(updatedPost);
});

// delete a post by ID
postRoutes.delete('/delete/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const { id } = c.req.param();
  const userId = c.get('UserId');

  // Check if the post exists and retrieve the author ID
  const post = await prisma.post.findUnique({
    where: { id },
    select: {
      authorId: true,
      title: true,
      content: true,
      published: true,
      tags: true,
    },
  });

  if (!post) {
    return c.json({ error: 'Post not found' }, 404);
  }

  if (post.authorId !== userId) {
    return c.json({ error: 'Unauthorized to delete this post' }, 403);
  }

  // Update the post to set published to false instead of deleting
  const updatedPost = await prisma.post.update({
    where: { id },
    data: {
      published: false, // Set published to false to "delete" the post
    },
    include: {
      tags: true,
    },
  });
  return c.json(post);
});


/* 
pagination code for get all the posts 

postRoutes.get('/', async (c) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());

  // Retrieve pagination parameters from query string
  const page = parseInt(c.req.query.page) || 1;
  const pageSize = parseInt(c.req.query.pageSize) || 10;

  // Calculate offset based on the current page and pageSize
  const offset = (page - 1) * pageSize;

  // Validate pagination parameters
  if (page < 1 || pageSize < 1) {
    return c.json({ error: 'Invalid pagination parameters' }, 400);
  }

  // Fetch posts with pagination
  const posts = await prisma.post.findMany({
    skip: offset,
    take: pageSize,
    include: {
      author: true,
      tags: true,
    },
  });

  // Optionally, fetch the total number of posts for pagination metadata
  const totalPosts = await prisma.post.count();

  // Respond with paginated results and metadata
  return c.json({
    posts,
    pagination: {
      page,
      pageSize,
      totalPosts,
      totalPages: Math.ceil(totalPosts / pageSize),
    },
  });
}); */