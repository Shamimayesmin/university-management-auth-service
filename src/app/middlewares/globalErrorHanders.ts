import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import ApiError from '../../Errors/ApiError';
import handleVlidationError from '../../Errors/handleValidationError';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaces/error';
import handleZodError from '../../Errors/handleZodError';
// import { error } from 'winston';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplefiledError = handleVlidationError(error);
    statusCode = simplefiledError.statusCode;
    message = simplefiledError.message;
    errorMessages = simplefiledError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplefiledError = handleZodError(error);
    statusCode = simplefiledError.statusCode;
    message = simplefiledError.message;
    errorMessages = simplefiledError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
