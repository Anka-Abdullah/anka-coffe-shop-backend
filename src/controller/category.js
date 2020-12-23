const { getCategory, dataCount } = require('../model/category')
const qs = require('querystring')
const { response } = require('../helper/response')

module.exports = {
  getCategory: async (req, res) => {
    try {
      let { page, limit, sort, search } = req.query
      page = parseInt(page) || 1
      limit = parseInt(limit) || 999
      const totalData = await dataCount()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const result = await getCategory(limit, offset, sort, search)
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
          `http://localhost:${process.env.PORT}/product?${nextLink}`,
        prevLink:
          prevLink && `http://localhost:${process.env.PORT}/product?${prevLink}`
      }

      return response(res, 200, 'success get data', result, pageInfo)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  }
}
