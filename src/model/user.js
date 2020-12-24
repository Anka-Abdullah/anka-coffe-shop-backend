const { actionQuery } = require('../helper/helper')

module.exports = {
  patchUser: (id, data) => {
    return actionQuery('update product set ? where productId = ?', [data, id])
  },
  cekEmail: (userEmail) => {
    return actionQuery('select * from user where userEmail = ?', userEmail)
  },
  register: (data) => {
    return actionQuery('insert into user set ?', data)
  }
}
