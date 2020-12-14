const connection = require('../config/mysql')
const { actionQuery } = require('../helper/helper')
const sql = 'select * from promo'

module.exports = {
  getPromo: (limit, offset, sort, search) => {
    const pagination = `LIMIT ${limit} OFFSET ${offset}`
    const sorting = sort != null ? `order by ${sort} asc` : ''
    const searching =
      search != null
        ? `where promoName like '%${search}%' or categoryName like '%${search}%'`
        : ''
    return actionQuery(`${sql} ${sorting} ${searching} ${pagination}`)
  },
  getPromoById: (id) => {
    return actionQuery(`${sql} WHERE promoId = ?`, id)
  },
  getPromoByName: (promoName) => {
    return actionQuery(`${sql} WHERE promoName = ?`, promoName)
  },
  getPromoByCode: (promoCode) => {
    return actionQuery(`${sql} WHERE promoCode = ?`, promoCode)
  },
  deletePromo: (id) => {
    return actionQuery('delete from promo where promoId = ?', id)
  },
  postPromo: (data) => {
    return actionQuery('insert into promo set ?', data)
  },
  patchPromo: (id, data) => {
    return actionQuery('update promo set ? where promoId = ?', [data, id])
  },
  dataCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select count(*) as total from promo',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  }
}
