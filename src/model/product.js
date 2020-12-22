const connection = require('../config/mysql')
const { actionQuery } = require('../helper/helper')
const sql =
  'select * from product join category on product.categoryId = category.categoryId'
module.exports = {
  getProduct: (limit, offset, sort, search, asc) => {
    const pagination = `LIMIT ${limit} OFFSET ${offset}`
    const sorting = sort != null ? `order by ${sort} ${asc}` : ''
    const searching =
      search != null
        ? `where productName like '%${search}%' or category.categoryName like '%${search}%'`
        : ''
    return actionQuery(`${sql} ${sorting} ${searching} ${pagination}`)
  },
  getProductById: (id) => {
    return actionQuery(`${sql} WHERE productId = ?`, id)
  },
  getProductByName: (productName) => {
    return actionQuery(`${sql} WHERE productName = ?`, productName)
  },
  deleteProduct: (id) => {
    return actionQuery('delete from product where productId = ?', id)
  },
  postProduct: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO product SET ?', data, (error, result) => {
        if (!error) {
          const newResult = {
            productId: result.insertId,
            ...data
          }
          resolve(newResult)
        } else {
          console.log(error)
          reject(new Error(error))
        }
      })
    })
  },
  patchProduct: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update product set ? where productId = ?',
        [data, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              productId: result.insertId,
              ...data
            }
            resolve(newResult)
          } else {
            console.log(error)
            reject(new Error(error))
          }
        }
      )
    })
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
