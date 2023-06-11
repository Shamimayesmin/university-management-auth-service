import express from 'express';
import { UserRouter } from '../modules/user/user.route';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

// router.use('/users', UserRouter)
// router.use('/academic-semesters', AcademicSemesterRouter);

export default router;
