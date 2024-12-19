import { z } from 'zod';

const createUseValidationSchema = z.object({
  name: z.string({ required_error: 'Name Is required' }),
  email: z.string({ required_error: 'email Is required' }),
  password: z
    .string({
      invalid_type_error: 'Password Must Be String',
    })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
});

export const UserValidation = {
  createUseValidationSchema,
};
