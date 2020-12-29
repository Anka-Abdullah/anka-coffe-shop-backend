const { actionQuery } = require('../helper/helper')

module.exports = {
  getHistory: (userId, time) => {
    const setUser = userId != null ? `userId = ${userId} and ` : ''
    return actionQuery(
      `SELECT SUM(subTotal), historyCreatedAt FROM history WHERE ${setUser} (${time}(historyCreatedAt) = ${time}(NOW()))`
    )
  },
  getHistoryDetail: (userId, setTime) => {
    const setUser = userId != null ? `userId = ${userId} and ` : ''
    return actionQuery(
      `SELECT SUM(subTotal), historyCreatedAt FROM history WHERE ${setUser} ${setTime}(historyCreatedAt) = ${setTime}(NOW()) GROUP BY DATE(historyCreatedAt)`
    )
  },
  postHistory: (data) => {
    return actionQuery('insert into history set ?', data)
  }
}

// SELECT SUM(`subTotal`), `historyCreatedAt` FROM `history` WHERE MONTH(`historyCreatedAt`) = MONTH(NOW()) GROUP BY DATE(`historyCreatedAt`)
// SELECT SUM(subTotal), historyCreatedAt FROM history WHERE YEARWEEK(historyCreatedAt) = YEARWEEK(NOW()) GROUP BY DATE(historyCreatedAt)
// SELECT SUM(`subTotal`), `historyCreatedAt` FROM `history` GROUP BY YEAR(`historyCreatedAt`)
// SELECT SUM(`subTotal`), `historyCreatedAt` FROM `history` WHERE day(`historyCreatedAt`) = day(NOW())
