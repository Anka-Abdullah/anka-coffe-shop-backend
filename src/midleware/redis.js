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
  getUserRedis: (req, res, next) => {
    client.get(`getUser`, (error, result) => {
      if (!error && result != null) {
        console.log('success by REDIS')
        const newResult = JSON.parse(result)
        return response(res, 200, 'success get user', newResult.result)
      } else {
        console.log('Redis gagal')
        next()
      }
    })
  },
  getPromoRedis: (req, res, next) => {
    client.get(`getPromo: ${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result != null) {
        console.log('success by REDIS')
        const newResult = JSON.parse(result)
        return response(
          res,
          200,
          'success get promo',
          newResult.result,
          newResult.pageInfo
        )
      } else {
        console.log('Redis gagal')
        next()
      }
    })
  },
  getHistoryRedis: (req, res, next) => {
    client.get(`getHistory: ${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result != null) {
        console.log('success by REDIS')
        const newResult = JSON.parse(result)
        return response(
          res,
          200,
          'success get Histrory',
          newResult.result,
          newResult.pageInfo
        )
      } else {
        console.log('Redis gagal')
        next()
      }
    })
  },
  getDetailHistoryRedis: (req, res, next) => {
    client.get(`getDetailHistory`, (error, result) => {
      if (!error && result != null) {
        console.log('success by REDIS')
        const newResult = JSON.parse(result)
        return response(
          res,
          200,
          'success get Detail Histrory',
          newResult.result,
          newResult.pageInfo
        )
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
  clearUserRedis: (req, res, next) => {
    client.keys('getUser*', (_error, result) => {
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
  },
  clearHistoryRedis: (req, res, next) => {
    client.keys('getHistory*', (_error, result) => {
      console.log(result)
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  },
  clearDetailHistoryRedis: (req, res, next) => {
    client.keys('getDetailHistory*', (_error, result) => {
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
