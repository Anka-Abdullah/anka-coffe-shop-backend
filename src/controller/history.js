const {
  getHistory,
  getHistoryById,
  deleteHistory,
  postHistory,
  dataCount
} = require('../model/history')
const qs = require('querystring')
const { response } = require('../helper/response')

module.exports = {
  getHistory: async (req, res) => {
    try {
      let { page, limit, sort, search } = req.query
      // search != null ? (page = 1) : (page = parseInt(page))
      page = parseInt(page) || 1
      limit = parseInt(limit) || 3
      const totalData = await dataCount()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const result = await getHistory(limit, offset, sort, search)
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
          `http://localhost:${process.env.PORT}/history?${nextLink}`,
        prevLink:
          prevLink && `http://localhost:${process.env.PORT}/history?${prevLink}`
      }

      return response(res, 200, 'success get data', result, pageInfo)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  getHistoryById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getHistoryById(id)
      if (result.length > 0) {
        return response(res, 200, 'success get data', result)
      } else {
        return response(res, 400, `id : ${id} not found`)
      }
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  postHistory: async (req, res) => {
    try {
      const { userId, paymentMethod, subTotal, historyStatus } = req.body
      const data = {
        userId,
        paymentMethod,
        subTotal,
        historyStatus
      }

      if (
        userId === '' ||
        paymentMethod === '' ||
        subTotal === '' ||
        historyStatus === ''
      ) {
        return response(res, 400, 'no empty columns')
      } else {
        const result = await postHistory(data)
        return response(res, 200, 'success post data', result)
      }
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  },
  deleteHistory: async (req, res) => {
    try {
      const { id } = req.params
      const result = await deleteHistory(id)
      return response(res, 200, `data id : ${id} deleted`, result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  }
}
