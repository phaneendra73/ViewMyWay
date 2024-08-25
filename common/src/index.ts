import z from "zod";

export const signupSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    name: z.string().optional().nullable()
  });

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const postSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    published: z.boolean().optional(),
    tags: z.array(z.number()).optional() // Array of tag names
  });

  export type SignupInput = z.infer<typeof signupSchema>
  export type SigninInput = z.infer<typeof signinSchema>
  export type PostInput = z.infer<typeof postSchema>