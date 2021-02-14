const redis = require('redis')
const client = redis.createClient()
const { response } = require('../helper/response')

module.exports = {
  getProductByIdRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getProductById:${id}`, (error, result) => {
      if (!error && result != null) {
        return response(
          res,
          200,
          `success get product id : ${id}`,
          JSON.parse(result)
        )
      } else {
        next()
      }
    })
  },
  getProductRedis: (req, res, next) => {
    client.get(`getProduct: ${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result != null) {
        const newResult = JSON.parse(result)
        return response(
          res,
          200,
          'success get product',
          newResult.result,
          newResult.pageInfo
        )
      } else {
        next()
      }
    })
  },
  getPromoRedis: (req, res, next) => {
    client.get('getPromo', (error, result) => {
      if (!error && result != null) {
        return response(res, 200, 'success get promo', JSON.parse(result))
      } else {
        next()
      }
    })
  },
  clearDataRedis: (req, res, next) => {
    client.keys('getProduct*', (_error, result) => {
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  },
  clearPromoRedis: (req, res, next) => {
    client.keys('getPromo*', (_error, result) => {
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  }
}
