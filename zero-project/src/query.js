const knex = require('./knex')
const bcrypt = require('bcrypt')

module.exports = {
  /**
   *
   * @param {String} username - 사용자 이름
   * @param {String} password - 해시 적용 전 암호
   */
  createUser(username, password) {
    const hashed_password = bcrypt.hashSync(password, 10)
    return knex('user')
      .insert({
        username,
        hashed_password
      })
  },
  /**
   *
   * @param {String} username - 사용자 이름
   * @param {String} password - 해시 적용 후 암호
   */
  compareUser(username, password){
    return knex('user')
      .where({username})
      .first()
      .then(user => {
        if(user) {
          const matched = bcrypt.compareSync(password, user.hashed_password)
          if(matched){
            return user
          }
        }
        throw new Error('일치하는 사용자가 없습니다.')
      })
  },
  getUserById(id){
    return knex('user')
      .where({id})
      .first()
  },
  getTodosByUserId(user_id) {
    return knex('todo')
      .where({user_id})
  },
  createTodo(user_id, title){
    return knex('todo')
      .insert({
        user_id,
        title
      })
  },
  getTodosById(id) {
    return knex('todo')
      .where({id})
      .first()
  },
  updateTodoById(id, {title, complete}){
    return knex('todo')
      .where({id})
      .update({title, complete})
  },
  deleteToById(id){
    return knex('todo')
      .where({id})
      .del()
  }
}
