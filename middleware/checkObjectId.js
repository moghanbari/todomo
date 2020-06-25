const mongoose = require('mongoose')

const checkObjectId = (idToCheck) => (request, response, next) => {
  if (!mongoose.Types.ObjectId.isValid(request.params[idToCheck]))
    return response.status(400).json({ msg: 'Invalid ID' })
  next()
}

module.exports = checkObjectId
