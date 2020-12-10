const connection = require('../config/mysql')

module.exports = {
  getProduct: (limit, offset, sort, search) => {
    return new Promise((resolve, reject) => {
      connection.query('select * from product', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select * from product where id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  postProduct: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('insert into product set ?', data, (error, result) => {
        if (!error) {
          const newResult = {
            product_id: result.insertId,
            ...data
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  patchProduct: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update product set ? where product_id = ?',
        [data, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              product_id: result.insertId,
              ...data
            }
            resolve(newResult)
          } else {
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
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
