const redis = require('redis')
const client = redis.createClient()
const { response } = require('../helper/response')

module.exports = {
  getProductByIdRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getProductById:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log('success by REDIS')
        return response(
          res,
          200,
          `success get product id : ${id}`,
          JSON.parse(result)
        )
      } else {
        console.log('Redis gagal')
        next()
      }
    })
  },
  getProductRedis: (req, res, next) => {
    client.get(`getProduct: ${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada di redis')
        const newResult = JSON.parse(result)
        console.log('success by REDIS')
        return response(
          res,
          200,
          'success get product',
          newResult.result,
          newResult.pageInfo
        )
      } else {
        console.log('Redis gagal')
        next()
      }
    })
  },
  getPromoRedis: (req, res, next) => {
    client.get('getPromo', (error, result) => {
      if (!error && result != null) {
        console.log('success by REDIS')
        return response(res, 200, 'success get promo', JSON.parse(result))
      } else {
        console.log('Redis gagal')
        next()
      }
    })
  },
  clearDataRedis: (req, res, next) => {
    client.keys('getProduct*', (_error, result) => {
      console.log(result)
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
      console.log(result)
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  }
}
