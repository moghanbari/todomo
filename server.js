const express = require('express')
const authRoute = require('./routes/api/auth')
const userRoute = require('./routes/api/user')
const todoRoute = require('./routes/api/todo')
const connectDB = require('./config/db')
const path = require('path')
const config = require('./config')

const { MONGO_URI, PORT } = config

const app = express()

// Middleware
app.use(express.json({ extended: false }))

// Connect to DB
connectDB(MONGO_URI)

// Define Routes
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/todo', todoRoute)

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = PORT || 5000

app.listen(port, () => console.log(`Server is running on port ${port}`))
