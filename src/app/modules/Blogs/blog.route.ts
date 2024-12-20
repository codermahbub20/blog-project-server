import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import { BlogController } from './blog.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/',
  auth(),
  validateRequest(BlogValidation.createValidationSchema),
  BlogController.createBlog,
);

export const blogRoutes = router;
