const {
  getPromo,
  getPromoById,
  getPromoByCode,
  deletePromo,
  postPromo,
  patchPromo
} = require('../model/promo')
const fs = require('fs')
const { response } = require('../helper/response')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getPromo: async (res) => {
    try {
      const result = await getPromo()
      client.setex(`getPromo`, 3600, JSON.stringify(result))
      return response(res, 200, 'success get data', result)
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
        image: req.file === undefined ? '' : req.file.filename
      }
      const check = await getPromoByCode(promoCode)
      if (check.length > 0) {
        response(res, 400, 'code already available')
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
        promoDescription
      } = req.body
      const data = {
        promoName,
        promoPercent,
        promoMinPurchase,
        promoMaxLimit,
        promoCode,
        promoDescription,
        image: req.file === undefined ? '' : req.file.filename
      }
      const unimage = await getPromoById(id)
      const photo = unimage[0].image
      if (photo !== '' && req.file !== undefined) {
        fs.unlink(`./uploads/${photo}`, function (err) {
          if (err) throw err
        })
      }
      const check = await getPromoByCode(promoCode)
      if (check.length > 1) {
        response(res, 400, 'code already available')
      } else {
        const result = await patchPromo(id, data)
        return response(res, 200, 'success patch data', result)
      }
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  },
  deletePromo: async (req, res) => {
    try {
      const { id } = req.params
      const unimage = await getPromoById(id)
      const photo = unimage[0].image
      if (photo !== '') {
        fs.unlink(`./uploads/${photo}`, function (err) {
          if (err) throw err
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
