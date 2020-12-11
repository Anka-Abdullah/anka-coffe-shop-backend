const {
  getPromo,
  getPromoById,
  deletePromo,
  postPromo,
  patchPromo,
  dataCount
} = require('../model/promo')
const qs = require('querystring')
const { response } = require('../helper/response')

module.exports = {
  getPromo: async (req, res) => {
    try {
      let { page, limit, sort, search } = req.query
      // search != null ? (page = 1) : (page = parseInt(page))
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await dataCount()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const result = await getPromo(limit, offset, sort, search)
      const prevLink =
        page > 1 ? qs.stringify({ ...req.query, ...{ page: page - 1 } }) : null
      const nextLink =
        page < totalPage
          ? qs.stringify({ ...req.query, ...{ page: page + 1 } })
          : null
      console.log(req.query)
      console.log(qs.stringify(req.query))
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
        nextLink:
          nextLink && `http://localhost:${process.env.PORT}/promo?${nextLink}`,
        prevLink:
          prevLink && `http://localhost:${process.env.PORT}/promo?${prevLink}`
      }

      return response(res, 200, 'success get data', result, pageInfo)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  getPromoById: async (req, res) => {
    try {
      const { id } = req.body
      const result = await getPromoById(id)
      if (result.length > 0) {
        return response(res, 200, 'success get data', result)
      } else {
        return response(res, 400, `id : ${id} not found`)
      }
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  postPromo: async (req, res) => {
    try {
      const {
        promoName,
        promoPercent,
        promoMinPurchase,
        promoMaxLimit,
        promoCode,
        expireStartDate,
        expireEndDate,
        promoDescription,
        promoImage
      } = req.body
      const data = {
        promoName,
        promoPercent,
        promoMinPurchase,
        promoMaxLimit,
        promoCode,
        promoUpdatedAt: new Date().toUTCString(),
        expireStartDate,
        expireEndDate,
        promoDescription,
        promoImage
      }

      if (
        promoName == null ||
        promoPercent == null ||
        promoMinPurchase == null ||
        promoMaxLimit == null ||
        promoCode == null ||
        expireStartDate == null ||
        expireEndDate == null ||
        promoDescription == null ||
        promoImage == null ||
        promoDescription == null
      ) {
        return response(res, 400, 'no empty columns')
      } else {
        const result = await postPromo(data)
        return response(res, 200, 'success post data', result)
      }
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  },
  patchPromo: async (req, res) => {
    try {
      const { id } = req.params
      const {
        promoName,
        promoPercent,
        promoMinPurchase,
        promoMaxLimit,
        promoCode,
        expireStartDate,
        expireEndDate,
        promoDescription,
        promoImage
      } = req.body
      const data = {
        promoName,
        promoPercent,
        promoMinPurchase,
        promoMaxLimit,
        promoCode,
        promoUpdatedAt: new Date().toUTCString(),
        expireStartDate,
        expireEndDate,
        promoDescription,
        promoImage
      }
      if (data.promoName === '') {
        delete data.promoName
      }
      if (data.promoPercent === '') {
        delete data.promoPercent
      }
      if (data.promoMinPurchase === '') {
        delete data.promoMinPurchase
      }
      if (data.promoMaxLimit === '') {
        delete data.promoMaxLimit
      }
      if (data.promoCode === '') {
        delete data.promoCode
      }
      if (data.expireStartDate === '') {
        delete data.expireStartDate
      }
      if (data.expireEndDate === '') {
        delete data.expireEndDate
      }
      if (data.promoDescription === '') {
        delete data.promoDescription
      }
      if (data.promoImage === '') {
        delete data.promoImage
      }

      const result = await patchPromo(id, data)
      return response(res, 200, 'success patch data', result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  },
  deletePromo: async (req, res) => {
    try {
      const { id } = req.params
      const result = await deletePromo(id)
      return response(res, 200, `data id : ${id} deleted`, result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  }
}
