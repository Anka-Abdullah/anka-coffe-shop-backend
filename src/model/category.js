const connection = require('../config/mysql')
const { actionQuery } = require('../helper/helper')

module.exports = {
  getCategory: (limit, offset, sort, search) => {
    const pagination = `LIMIT ${limit} OFFSET ${offset}`
    const sorting = sort != null ? `order by ${sort} asc` : ''
    const searching =
      search != null ? `where categoryName like '%${search}%'` : ''
    return actionQuery(
      `select * from category ${sorting} ${searching} ${pagination}`
    )
  },
  dataCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select count(*) as total from category',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  }
}
