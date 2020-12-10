const connection = require('../config/mysql')
const { actionQuery } = require('../helper/helper')
const sql =
  'select * from product join category on product.categoryId = category.categoryId'
module.exports = {
  getProduct: (limit, offset, sort, search) => {
    const pagination = `LIMIT ${limit} OFFSET ${offset}`
    const sorting = sort != null ? `order by ${sort} asc` : ''
    const searching =
      search != null
        ? `where productName like '%${search}%' or categoryName like '%${search}%'`
        : ''
    return actionQuery(`${sql} ${sorting} ${searching} ${pagination}`)
  },
  getProductById: (id) => {
    return actionQuery(`${sql} WHERE productId = ?`, id)
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
  dataCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select count(*) as total from product',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  }
}
