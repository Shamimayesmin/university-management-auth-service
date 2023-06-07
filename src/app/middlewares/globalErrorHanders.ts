import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error'
import handleVlidationError from '../../interfaces/handleValidationError'
import ApiError from '../../Errors/ApiError'
// import { error } from 'winston';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500
  let message = 'Something went wrong !'
  let errorMessages: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplefiledError = handleVlidationError(error)
    statusCode = simplefiledError.statusCode
    message = simplefiledError.message
    errorMessages = simplefiledError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }
  // res.status(400).json({err:err})

  res
    .status(statusCode)
    .json({
      success: false,
      message,
      errorMessages,
      stack: config.env !== 'production' ? error?.stack : undefined,
    })
  next()
}

export default globalErrorHandler
