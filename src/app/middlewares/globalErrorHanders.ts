import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import ApiError from '../../Errors/ApiError';
import handleVlidationError from '../../Errors/handleValidationError';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaces/error';
import handleZodError from '../../Errors/handleZodError';
import handleCastError from '../../Errors/handleCastError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res) => {
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
  } else if (error?.name === 'CastError') {
    // res.status(200).json({error})
    const simplefiledError = handleCastError(error);
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
};

export default globalErrorHandler;
