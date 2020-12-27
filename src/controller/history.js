const { getHistory, postHistory } = require('../model/history')
const { response } = require('../helper/response')
const redis = require('redis')
const client = redis.createClient()
const a = new Date().getDate()
const b = new Date().getMonth()
const c = new Date().getFullYear()
const setToday = a * 1000000 + b * 10000 + c

module.exports = {
  getHistory: async (req, res) => {
    try {
      let { userId, firstDate, lastDate } = req.query
      const result = await getHistory(userId, firstDate, lastDate)
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
  postHistory: async (req, res) => {
    try {
      const { userId, discount, subTotal, paymentMethod } = req.body
      const data = {
        userId,
        discount,
        subTotal,
        paymentMethod,
        historyCreatedAt: setToday
      }
      const result = await postHistory(data)
      return response(res, 200, 'success post data', result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  }
}
