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
        console.log('anying gagal')
        next()
      }
    })
  },
  getProductRedis: (req, res, next) => {
    client.get(`getProduct: ${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada di redis')
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
  }
}
