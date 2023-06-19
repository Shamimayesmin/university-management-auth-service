import express from 'express';

import { studentController } from './student.controller';

const router = express.Router();

router.get('/:id', studentController.getSingleStudent);

router.get('/', studentController.getAllStudents);

router.delete('/', studentController.deleteStudent);

// router.patch(
//   '/create-student',
//   validateRequest(UserValidation.createUserZodSchema),
//   UserController.createStudent
// );

export const StudentRouter = router;
