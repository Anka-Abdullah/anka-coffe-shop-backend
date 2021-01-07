const { actionQuery } = require('../helper/helper')

module.exports = {
  getUserById: (id) => {
    return actionQuery('select * from user where userId = ?', id)
  },
  deleteUser: (id) => {
    return actionQuery('delete from user where userId = ?', id)
  },
  activateUser: (userEmail) => {
    return actionQuery(
      'update user set userStatus = 1 where userEmail = ?',
      userEmail
    )
  },
  patchUser: (id, data) => {
    return actionQuery('update user set ? where userId = ?', [data, id])
  },
  cekEmail: (userEmail) => {
    return actionQuery('select * from user where userEmail = ?', userEmail)
  },
  register: (data) => {
    return actionQuery('insert into user set ?', data)
  }
}
