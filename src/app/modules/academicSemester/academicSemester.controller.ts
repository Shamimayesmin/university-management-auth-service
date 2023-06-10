import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.services';

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemisterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemisterData
    );
    res.status(200).json({
      success: true,
      message: 'academic semester is created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const AcademicSemesterController = {
  createSemester,
};
