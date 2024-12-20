import { z } from 'zod';

const createValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is Required' }),
    content: z.string({ required_error: 'Content is Required' }),
  }),
});

const updateValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
  }),
});

export const BlogValidation = {
  createValidationSchema,
  updateValidationSchema,
};
