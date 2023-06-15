import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHanders';

import routes from './app/routes';
import httpStatus from 'http-status';
// import { generateFacultyId } from './app/modules/user/user.utils';

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

// const academicSemester = {
//   code : '01',
//   year:'2025'

// }

// const testId =async()=>{
//   const testId =await generateFacultyId()
// console.log(testId);

// }

// testId()

export default app;
