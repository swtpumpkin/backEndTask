class InsufficientDataError extends Error {
  constructor(message) {
    super(message)
    this.name = 'InsufficientDataError'
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotFoundError'
  }
}

module.exports = {
  InsufficientDataError,
  ValidationError,
  NotFoundError
}
