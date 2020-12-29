const {
  getHistory,
  getHistoryDetail,
  postHistory
} = require('../model/history')
const { response } = require('../helper/response')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getHistory: async (req, res) => {
    try {
      const { userId, time } = req.query
      const result = await getHistory(userId, time)
      client.setex(
        `getHistory: ${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify(result)
      )
      return response(res, 200, 'success get data', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  getHistoryDetail: async (req, res) => {
    try {
      const { userId, time } = req.query
      const result = await getHistoryDetail(userId, time)
      client.setex(
        `getHistoryDetail: ${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify(result)
      )
      return response(res, 200, 'success get data', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  postHistory: async (req, res) => {
    try {
      const { userId, discount, subTotal, paymentMethod } = req.body
      const data = {
        userId,
        discount,
        subTotal,
        paymentMethod
      }
      const result = await postHistory(data)
      return response(res, 200, 'success post data', result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  }
}
