import { z } from 'zod';

const createValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is Required' }),
    content: z.string({ required_error: 'Content is Required' }),
  }),
});

export const BlogValidation = {
  createValidationSchema,
};
