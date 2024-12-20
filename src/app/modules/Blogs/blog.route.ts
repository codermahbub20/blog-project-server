import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import { BlogController } from './blog.controller';

const router = Router();

router.post(
  '/',
  validateRequest(BlogValidation.createValidationSchema),
  BlogController.createBlog,
);

export const blogRoutes = router;
