import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/udate-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
);

export const UserRouter = router;
