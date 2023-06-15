const morgan = require('morgan')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

const morganLogger = morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    tokens.body(req, res)
  ].join(' ')
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
    return response.status(401).json({ error: 'token missing' })
  }
  //Siirtyy userExtractor-middlewareen, joka identifioi käyttäjän tokenin perusteella
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedUserFromToken = jwt.verify(request.token, process.env.SECRET)
  if (decodedUserFromToken) {
    request.user = await User.findById(decodedUserFromToken.id)
  } else {
    request.user = null
  }
  //Siirtyy ErrorHandler-middlewareen, joka palauttaa oikean virheen
  next()
}

module.exports = {
  morganLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
