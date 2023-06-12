import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHanders';
// import { UserRouter } from './app/modules/user/user.route';
// import { AcademicSemesterRouter } from './app/modules/academicSemester/academicSemester.route';
import routes from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
// console.log(app.get("env"));

// app.use('/api/v1/users', UserRouter);
// app.use('/api/v1/academic-semesters', AcademicSemesterRouter);
app.use('/api/v1', routes);

// testing
// app.get('/',  (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('testing error logger')
//   // next('there is an error occured')
// })

// global error handler
app.use(globalErrorHandler);

// handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
