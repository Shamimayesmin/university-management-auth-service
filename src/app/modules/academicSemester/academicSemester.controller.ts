import { Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.services';
import catchAsync from '../../../shared/catchAsync';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemisterData } = req.body;
  const result = await AcademicSemesterService.createSemester(
    academicSemisterData
  );
  res.status(200).json({
    success: true,
    message: 'academic semester is created successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemester,
};
