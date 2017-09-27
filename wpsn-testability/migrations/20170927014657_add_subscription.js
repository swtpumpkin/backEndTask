
exports.up = function(knex, Promise) {
  return knex.schema.createTable('subscription', t => {
    t.increments()
    t.string('email').notNullable().unique()
    t.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('subscription')
};
