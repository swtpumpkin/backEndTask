
exports.up = function(knex, Promise) {
  return knex.schema.createTable('room', t => {
    t.increments() // unasigned integer, primary key, auto increments
    t.string('title').notNullable().unique()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('room')
};
