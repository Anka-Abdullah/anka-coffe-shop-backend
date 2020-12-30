const { actionQuery } = require('../helper/helper')

module.exports = {
  getDetailHistory: (id) => {
    return actionQuery(
      'select * from detail_history join product on detail_history.productId = product.productId where HistoryUserId = ?',
      id
    )
  },
  deleteDetailHistory: (id) => {
    return actionQuery(
      'delete from detail_history where detailHistoryId  = ?',
      id
    )
  },
  postDetailHistory: (data) => {
    return actionQuery('insert into detail_history set ?', data)
  }
}
