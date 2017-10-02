function addSync(x, y) {
  return x + y
}

function addAsync(x, y) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x + y)
    }, 100)
  })
}

function multiAsync(x, y) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x * y)
    }, 100)
  })
}

function throwErrorIfNegative(x) {
  if (x < 0) {
    throw new Error('양수만 허용됩니다.')
  }
  return x
}

function multiSync(x , y) {
  return x * y
}

function divSync(x, y) {
  return x / y
}

module.exports = {
  addSync,
  addAsync,
  throwErrorIfNegative,
  multiSync,
  multiAsync,
  divSync
}
