
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', t => {
    t.increments()
    t.string('provider').notNullable()
    t.string('provider_user_id').notNullable()
    t.string('access_token')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user')
};
