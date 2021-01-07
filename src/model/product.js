const connection = require('../config/mysql')
const { actionQuery } = require('../helper/helper')
const sql =
  'from product join category on product.categoryId = category.categoryId'
module.exports = {
  getProduct: (limit, offset, sort, search, asc) => {
    const sorting = sort != null ? `order by ${sort} ${asc}` : ''
    const searching =
      search != null
        ? `where productName like '%${search}%' or category.categoryName like '%${search}%'`
        : ''
    const pagination = `LIMIT ${limit} OFFSET ${offset}`
    return actionQuery(`select * ${sql} ${sorting} ${searching} ${pagination}`)
  },
  getProductById: (id) => {
    return actionQuery(`select * ${sql} WHERE productId = ?`, id)
  },
  deleteProduct: (id) => {
    return actionQuery('delete from product where productId = ?', id)
  },
  postProduct: (data) => {
    return actionQuery('insert into product set ?', data)
  },
  patchProduct: (id, data) => {
    return actionQuery('update product set ? where productId = ?', [data, id])
  },
  dataCount: (sort, search, asc) => {
    return new Promise((resolve, reject) => {
      const sorting = sort != null ? `order by ${sort} ${asc}` : ''
      const searching =
        search != null
          ? `where productName like '%${search}%' or category.categoryName like '%${search}%'`
          : ''
      connection.query(
        `select count(*) as total ${sql} ${sorting} ${searching}`,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  }
}
