
exports.up = function(knex, Promise) {
  return knex.schema.createTable('image_entry', t => {
    t.increments()
    t.string('original_url').notNullable()
    t.string('title')
    t.text('description')
    t.string('thumbnail_url')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('image_entry')
};
