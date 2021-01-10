const {
  getHistory,
  getId,
  getHistoryDashboard,
  getHistoryChart,
  postHistory,
  postInvoice,
  patchHistory
} = require('../model/history')
const { response } = require('../helper/response')

module.exports = {
  getHistory: async (req, res) => {
    try {
      const { userId } = req.query
      const result = await getHistory(userId)
      return response(res, 200, 'success get data', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  getHistoryDashboard: async (req, res) => {
    try {
      const { userId, time } = req.query
      const result = await getHistoryDashboard(userId, time)
      return response(res, 200, 'success get data', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  getHistoryChart: async (req, res) => {
    try {
      const { userId, setTime } = req.query
      const result = await getHistoryChart(userId, setTime)
      return response(res, 200, 'success get data', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  postHistory: async (req, res) => {
    try {
      const id = await getId()
      const { userId, discount, subTotal, paymentMethod } = req.body
      const data = {
        userId,
        discount,
        subTotal,
        paymentMethod
      }
      const result = await patchHistory(id, data)
      return response(res, 200, 'success post data', result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  },
  postInvoice: async (req, res) => {
    try {
      const post = {
        userId: 0
      }
      await postHistory(post)
      const id = await getId()
      const key = id[0].historyId
      const { productId, productQty, size } = req.body
      const data = { historyId: key, productId, productQty, size }
      const result = await postInvoice(data)
      return response(res, 200, 'success post data', result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  }
}
