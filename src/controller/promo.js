const {
  getPromo,
  getPromoById,
  deletePromo,
  postPromo,
  patchPromo,
  dataCount
} = require('../model/promo')
// const fs = require('fs')
const qs = require('querystring')
const { response } = require('../helper/response')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getPromo: async (req, res) => {
    try {
      let { page, limit, sort, search } = req.query
      page = parseInt(page) || 1
      limit = parseInt(limit) || 999
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
      const newData = {
        result,
        pageInfo
      }
      client.setex(
        `getPromo: ${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify(newData)
      )
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
        promoDescription
      } = req.body
      const data = {
        promoName,
        promoPercent,
        promoMinPurchase,
        promoMaxLimit,
        promoCode,
        promoUpdatedAt: new Date().toUTCString(),
        promoDescription,
        promoImage: req.file === undefined ? '' : req.file.filename
      }
      const result = await postPromo(data)
      return response(res, 200, 'success post data', result)
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
        promoDescription
      } = req.body
      const data = {
        promoName,
        promoPercent,
        promoMinPurchase,
        promoMaxLimit,
        promoCode,
        promoDescription,
        promoImage: req.file === undefined ? '' : req.file.filename
      }
      const unimage = await getPromoById(id)
      const photo = unimage[0].promoImage
      console.log(photo)
      if (photo !== '') {
        fs.unlink(`./uploads/${photo}`, function (err) {
          if (err) throw err
          console.log('File deleted!')
        })
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
      const unimage = await getPromoById(id)
      const photo = unimage[0].promoImage
      console.log(photo)
      if (photo !== '') {
        fs.unlink(`./uploads/${photo}`, function (err) {
          if (err) throw err
          console.log('File deleted!')
        })
        const result = await deletePromo(id)
        return response(res, 200, `data id : ${id} deleted`, result)
      }
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  }
}
