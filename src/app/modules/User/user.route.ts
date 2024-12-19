import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';

const router = Router();

router.post(
  '/register',
  //   validateRequest(UserValidation.createUseValidationSchema),
  UserController.createUser,
);

export const userRoutes = router;
