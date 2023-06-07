import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHanders'
import { UserRouter } from './app/modules/user/user.route'

const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
// console.log(app.get("env"));
app.use('/api/v1/users', UserRouter)

// testing
// app.get('/',  (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('testing error logger')
//   // next('there is an error occured')
// })

// global error handler
app.use(globalErrorHandler)

export default app
