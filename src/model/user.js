const { actionQuery } = require('../helper/helper')

module.exports = {
  login: () => {},
  cekEmail: (userEmail) => {
    return actionQuery('select * from user where userEmail = ?', userEmail)
  },
  register: (data) => {
    return actionQuery('insert into user set ?', data)
  }
}
