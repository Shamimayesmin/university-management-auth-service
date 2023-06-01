import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersServices from './app/modules/user/users.services'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// testing
app.get('/', async (req: Request, res: Response) => {
  await usersServices.createUser({
    id: '999',
    password: '12234',
    role: 'student',
  })
  res.send('Hello World from university management!')
})

export default app
