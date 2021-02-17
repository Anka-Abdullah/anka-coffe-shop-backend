const { actionQuery } = require('../helper/helper')

module.exports = {
  getProduct: (historyId) => {
    return actionQuery(
      'SELECT * FROM detail_history join product on  detail_history.productId = product.productId where historyId = ?',
      historyId
    )
  },
  getHistory: (userId) => {
    const id = userId != null ? `where userId = ${userId}` : ''
    return actionQuery(`SELECT * FROM history ${id}`)
  },
  getId: () => {
    return actionQuery(
      'SELECT historyId FROM history ORDER BY historyId DESC LIMIT 1'
    )
  },
  getHistoryDashboard: (userId, time) => {
    const setUser = userId != null ? `userId = ${userId} and ` : ''
    return actionQuery(
      `SELECT SUM(subTotal) as Total, historyCreatedAt FROM history WHERE ${setUser} (${time}(historyCreatedAt) = ${time}(NOW()))`
    )
  },
  getHistoryChart: (userId, time) => {
    let setTime = ''
    if (time === 'DAY') {
      setTime = 'YEARWEEK'
    }
    if (time === 'MONTH') {
      setTime = 'YEAR'
    }
    return actionQuery(
      `SELECT SUM(subTotal) as Total, historyCreatedAt FROM history WHERE userId = ${userId} and ${setTime}(historyCreatedAt) = ${setTime}(NOW()) GROUP BY ${time}(historyCreatedAt)`
    )
  },
  postHistory: (data) => {
    return actionQuery('insert into history set ?', data)
  },
  postInvoice: (data) => {
    return actionQuery('insert into detail_history set ?', data)
  },
  patchHistory: (id, data) => {
    return actionQuery('update history set ? where historyId = ?', [data, id])
  }
}
