const {
  getDetailHistory,
  getDetailHistoryById,
  deleteDetailHistory,
  postDetailHistory
  // dataCount
} = require('../model/detailHistory')
const qs = require('querystring')
const { response } = require('../helper/response')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getDetailHistory: async (req, res) => {
    try {
      const result = await getDetailHistory()
      client.setex(`getDetailHistory`, 3600, JSON.stringify(result))
      return response(res, 200, 'success get data', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  getDetailHistoryById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getDetailHistoryById(id)
      if (result.length > 0) {
        return response(res, 200, 'success get data', result)
      } else {
        return response(res, 400, `id : ${id} not found`)
      }
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  postDetailHistory: async (req, res) => {
    try {
      const { productId, productQty, historyId } = req.body
      const data = {
        productId,
        productQty,
        historyId
      }

      const result = await postDetailHistory(data)
      return response(res, 200, 'success post data', result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  },
  deleteDetailHistory: async (req, res) => {
    try {
      const { id } = req.params
      const result = await deleteDetailHistory(id)
      return response(res, 200, `data id : ${id} deleted`, result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  }
}
