const mongoose = require('mongoose')

const checkObjectId = (idToCheck) => (request, response, next) => {
  if (!mongoose.Types.ObjectId.isValid(request.params[idToCheck]))
    return response.status(400).json({ msg: 'Invalid ID' })
  next()
}

/*
For educational purpose:
Basically the above code means this, however I don't get the logic.
I mean how come request, response and next is recognizable throught the second function?
How did Traversy know about this?

function checkObjectId(idToCheck) {
  return function (request, response, next) {
    if (!mongoose.Types.ObjectId.isValid(request.params[idToCheck]))
      return response.status(400).json({ msg: 'Invalid ID' })
    next()
  }
}
*/

module.exports = checkObjectId
