const { actionQuery } = require('../helper/helper')

module.exports = {
  getHistory: (HistoryId) => {
    const id = HistoryId != null ? `where Historyd = ${HistoryId}` : ''
    return actionQuery(
      `SELECT * FROM history INNER JOIN detail_history ON history.historyId = detail_history.historyId INNER JOIN product ON detail_history.productId = product.productId ${id}`
    )
  },
  getHistoryB: (userId) => {
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
  getHistoryChart: (userId, setTime) => {
    const setUser = userId != null ? `userId = ${userId} and ` : ''
    return actionQuery(
      `SELECT SUM(subTotal) as Total,, historyCreatedAt FROM history WHERE ${setUser} ${setTime}(historyCreatedAt) = ${setTime}(NOW()) GROUP BY DATE(historyCreatedAt)`
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
