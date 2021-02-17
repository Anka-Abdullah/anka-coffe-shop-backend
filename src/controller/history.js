const {
  getHistory,
  getProduct,
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
      for (let i = 0; i < result.length; i++) {
        result[i].products = await getProduct(result[i].historyId)
      }
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
      const { userId, time } = req.query
      const result = await getHistoryChart(userId, time)
      return response(res, 200, 'success get data', result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  },
  getHistoryId: async (req, res) => {
    try {
      const post = {
        userId: 0
      }
      await postHistory(post)
      const id = await getId()
      const key = id[0].historyId
      return response(res, 200, 'success get ID', key)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  postHistory: async (req, res) => {
    try {
      let { id } = req.params
      parseInt(id)
      const {
        userId,
        discount,
        tax,
        subTotal,
        total,
        paymentMethod,
        deliveryMethod
      } = req.body
      const data = {
        userId,
        discount,
        tax,
        subTotal,
        total,
        paymentMethod,
        deliveryMethod
      }
      const result = await patchHistory(id, data)
      return response(res, 200, 'success patch data', result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  },
  postInvoice: async (req, res) => {
    try {
      const { historyId, productId, productQty, size } = req.body
      const data = { historyId, productId, productQty, size }
      const result = await postInvoice(data)
      return response(res, 200, 'success post data', result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  }
}
