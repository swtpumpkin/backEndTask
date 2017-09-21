const knex = require('./knex')

module.exports = {
  getCompleteImageEntries() {
    return knex('image_entry')
      .whereNotNull('thumbnail_url')
      // 최신이 처음으로 오도록한다.
      .orderBy('id', 'desc')
  },
  createImageEntry({original_url, thumbnail_url, title, description}) {
    return knex('image_entry')
      .insert({
        original_url,
        thumbnail_url,
        title,
        description
      })
  },
  getImageEntryById(id) {
    // worker에서 사용
    return knex('image_entry')
      .where({id})
      .first()
  },
  updateThumbnailUrlByid(id, thumbnail_url) {
    return knex('image_entry')
      .where({id})
      .update({thumbnail_url})
  }
}
