module.exports = {
  insertReq(req, res, next) {
    res.locals.req = req
    next()
  },
  flashError(err, req, res, next) {
    req.flash('error', err.message)
    res.redirect(req.originalUrl)
  }
}
