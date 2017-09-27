const assert = require('assert')

class NegatuveError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NegativeError'
  }
}

function add(x, y) {
  if( x < 0 || y < 0) {
    throw new  NegatuveError('음수는 허용하지 않는다.')
  }
  return x + y
}

assert.equal(add(1,2), 3)
assert.throws(() => {
  add(-1, 2)
}, NegatuveError)

assert.throws(() => {
  add(1, -2)
}, NegatuveError)

assert.throws(() => {
  add(-1, -2)
}, NegatuveError)
