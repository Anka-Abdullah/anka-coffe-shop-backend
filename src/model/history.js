const connection = require('../config/mysql')
const { actionQuery } = require('../helper/helper')
const sql = 'select * from history'

module.exports = {
  getHistory: (limit, offset, sort, search) => {
    const pagination = `LIMIT ${limit} OFFSET ${offset}`
    const sorting = sort != null ? `order by ${sort} asc` : ''
    const searching =
      search != null
        ? `where userName like '%${search}%' or paymentMethod like '%${search}%'`
        : ''
    return actionQuery(`${sql} ${sorting} ${searching} ${pagination}`)
  },
  getHistoryById: (id) => {
    return actionQuery(`${sql} WHERE userId = ?`, id)
  },
  deleteHistory: (id) => {
    return actionQuery('delete from history where historyId = ?', id)
  },
  postHistory: (data) => {
    return actionQuery('insert into history set ?', data)
  },
  dataCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select count(*) as total from history',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  }
}
