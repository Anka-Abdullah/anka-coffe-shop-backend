const { actionQuery } = require('../helper/helper')

module.exports = {
  getHistory: (userId, firstDate, lastDate) => {
    userId != null ? `userId = ${userId} and ` : ''
    return actionQuery(
      `select sum(subTotal) as income from history where ${userId} (historyCreatedAt between ${firstDate} and ${lastDate})`
    )
  },
  postHistory: (data) => {
    return actionQuery('insert into history set ?', data)
  }
}
