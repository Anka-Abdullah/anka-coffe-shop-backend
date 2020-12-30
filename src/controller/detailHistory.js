const {
  getDetailHistory,
  deleteDetailHistory,
  postDetailHistory
} = require('../model/detailHistory')
const { response } = require('../helper/response')

module.exports = {
  getDetailHistory: async (req, res) => {
    const { id } = req.query
    try {
      const result = await getDetailHistory(id)
      return response(res, 200, 'success get data', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  postDetailHistory: async (req, res) => {
    try {
      const { HistoryUserId, productId, productQty, size, delivery } = req.body
      const data = {
        HistoryUserId,
        productId,
        productQty,
        size,
        delivery
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
