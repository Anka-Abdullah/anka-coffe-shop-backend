const {
  getHistory,
  getHistoryDetail,
  postHistory
} = require('../model/history')
const { response } = require('../helper/response')

module.exports = {
  getHistory: async (req, res) => {
    try {
      const { userId, time } = req.query
      const result = await getHistory(userId, time)
      return response(res, 200, 'success get data', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  getHistoryDetail: async (req, res) => {
    try {
      const { userId, setTime } = req.query
      const result = await getHistoryDetail(userId, setTime)
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
