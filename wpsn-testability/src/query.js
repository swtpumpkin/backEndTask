const knex = require('./knex')

module.exports = {
  createSubscrption(email) {
    return knex('subscription')
      .insert({email})
  },
  getSubscriptionById(id) {
    return knex('subscription')
      .where({id})
      .first()
  }
}
