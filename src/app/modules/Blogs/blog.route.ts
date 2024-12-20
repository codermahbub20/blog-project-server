import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import { BlogController } from './blog.controller';
import auth from '../../middlewares/auth';

import { USER_ROLE } from '../User/user.constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BlogValidation.createValidationSchema),
  BlogController.createBlog,
);

router.patch(
  '/:blogId',
  auth(USER_ROLE.user),
  validateRequest(BlogValidation.updateValidationSchema),
  BlogController.updateBlog,
);

export const blogRoutes = router;
