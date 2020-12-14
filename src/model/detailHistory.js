const connection = require('../config/mysql')
const { actionQuery } = require('../helper/helper')
const sql =
  'select * from detail_history join history on history.historyId = detail_history.historyId'

module.exports = {
  getDetailHistory: (limit, offset, sort, search) => {
    const pagination = `LIMIT ${limit} OFFSET ${offset}`
    const sorting = sort != null ? `order by ${sort} asc` : ''
    const searching =
      search != null
        ? `where userName like '%${search}%' or paymentMethod like '%${search}%'`
        : ''
    return actionQuery(`${sql} ${sorting} ${searching} ${pagination}`)
  },
  getDetailHistoryById: (id) => {
    return actionQuery(`${sql} WHERE history.historyId = ?`, id)
  },
  deleteDetailHistory: (id) => {
    return actionQuery(
      'delete from detail_history where detailHistoryId  = ?',
      id
    )
  },
  postDetailHistory: (data) => {
    return actionQuery('insert into detail_history set ?', data)
  },
  dataCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select count(*) as total from detail_history',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  }
}
