const mongoose = require('mongoose')
//const config = require('config')
// const db = process.env.mongoURI

const connectDB = async (db) => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })

    console.log('MongoDB connected..')
  } catch (error) {
    console.error(error.message)
    // Exit process with failiure
    process.exit(1)
  }
}

module.exports = connectDB
