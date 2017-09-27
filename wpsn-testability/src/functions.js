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

function throwErrorIfNegative(x) {
  if (x < 0) {
    throw new Error('양수만 허용됩니다.')
  }
  return x
}

module.exports = {
  addSync,
  addAsync,
  throwErrorIfNegative
}
