const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(__dirname, '.env') })

module.exports = {
  PORT: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  JWTSecret: process.env.JWT_SECRET,
}
