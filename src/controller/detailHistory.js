const {
  getDetailHistory,
  getDetailHistoryById,
  deleteDetailHistory,
  postDetailHistory,
  dataCount
} = require('../model/detailHistory')
const qs = require('querystring')
const { response } = require('../helper/response')

module.exports = {
  getDetailHistory: async (req, res) => {
    try {
      let { page, limit, sort, search } = req.query
      page = parseInt(page) || 1
      limit = parseInt(limit) || 999
      const totalData = await dataCount()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const result = await getDetailHistory(limit, offset, sort, search)
      const prevLink =
        page > 1 ? qs.stringify({ ...req.query, ...{ page: page - 1 } }) : null
      const nextLink =
        page < totalPage
          ? qs.stringify({ ...req.query, ...{ page: page + 1 } })
          : null
      console.log(req.query)
      console.log(qs.stringify(req.query))
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
        nextLink:
          nextLink &&
          `http://localhost:${process.env.PORT}/Detailhistory?${nextLink}`,
        prevLink:
          prevLink &&
          `http://localhost:${process.env.PORT}/Detailhistory?${prevLink}`
      }

      return response(res, 200, 'success get data', result, pageInfo)
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
