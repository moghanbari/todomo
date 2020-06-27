const express = require('express')
const authRoute = require('./routes/api/auth')
const userRoute = require('./routes/api/user')
const todoRoute = require('./routes/api/todo')
const connectDB = require('./config/db')

const port = process.env.PORT || 5000
const app = express()

// Middleware
app.use(express.json({ extended: false }))

// Connect to DB
connectDB()

app.get('/', (request, response) => response.send('Server is running'))

// Define Routes
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/todo', todoRoute)

app.listen(5000, () => console.log('Server is running on port 5000'))
