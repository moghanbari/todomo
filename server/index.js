import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import config from './config'

// Routes
import usersRouter from './routes/api/users'
import todosRouter from './routes/api/todos'
import authRouter from './routes/api/auth'

const { MONGO_URI, MONGO_DB_NAME, PORT } = config

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// DB Connection
const db = `${MONGO_URI}/${MONGO_DB_NAME}`
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((error) => console.log(error))

// Routes
app.use('/api/users', usersRouter)
app.use('/api/todos', todosRouter)
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
  console.log(`Server in runnig on port: ${PORT}`)
})
