const { actionQuery } = require('../helper/helper')
const sql = 'select * from promo'

module.exports = {
  getPromo: () => {
    return actionQuery(`${sql}`)
  },
  getPromoById: (id) => {
    return actionQuery(`${sql} WHERE promoId = ?`, id)
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
  }
}
