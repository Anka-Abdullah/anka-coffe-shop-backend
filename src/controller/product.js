const {
  getProduct,
  getProductById,
  getProductByName,
  deleteProduct,
  postProduct,
  patchProduct,
  dataCount
} = require('../model/product')
const qs = require('querystring')
const { response } = require('../helper/response')

module.exports = {
  getProduct: async (req, res) => {
    try {
      let { page, limit, sort, search, asc } = req.query
      // search != null ? (page = 1) : (page = parseInt(page))
      page = parseInt(page) || 1
      limit = parseInt(limit) || 3
      const totalData = await dataCount()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const result = await getProduct(limit, offset, sort, search, asc)
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
          nextLink ||
          `http://localhost:${process.env.PORT}/product?${nextLink}`,
        prevLink:
          prevLink || `http://localhost:${process.env.PORT}/product?${prevLink}`
      }

      return response(res, 200, 'success get data', result, pageInfo)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  getProductById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getProductById(id)
      if (result.length > 0) {
        return response(res, 200, 'success get data', result)
      } else {
        return response(res, 400, `id : ${id} not found`)
      }
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  postProduct: async (req, res) => {
    try {
      const {
        productName,
        categoryId,
        productPrice,
        productStock,
        deliveryStartHour,
        deliveryEndHour,
        productDiscount,
        productSizeR250,
        productSizeL300,
        productSizeXL500,
        productDelivery,
        productDinein,
        productTakeAway,
        productImage,
        productDescription
      } = req.body
      const data = {
        productName,
        categoryId,
        productPrice,
        productStock,
        deliveryStartHour,
        deliveryEndHour,
        productUpdatedAt: new Date().toUTCString(),
        productDiscount,
        productSizeR250,
        productSizeL300,
        productSizeXL500,
        productDelivery,
        productDinein,
        productTakeAway,
        productImage,
        productDescription
      }
      const result = await postProduct(data)
      return response(res, 200, 'success post data', result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  },
  patchProduct: async (req, res) => {
    try {
      const { id } = req.params
      const {
        productName,
        categoryId,
        productPrice,
        productStock,
        deliveryStartHour,
        deliveryEndHour,
        productDiscount,
        productSizeR250,
        productSizeL300,
        productSizeXL500,
        productDelivery,
        productDinein,
        productTakeAway,
        productImage,
        productDescription
      } = req.body
      const data = {
        productName,
        categoryId,
        productPrice,
        productStock,
        deliveryStartHour,
        deliveryEndHour,
        productUpdatedAt: new Date().toUTCString(),
        productDiscount,
        productSizeR250,
        productSizeL300,
        productSizeXL500,
        productDelivery,
        productDinein,
        productTakeAway,
        productImage,
        productDescription
      }
      const result = await patchProduct(id, data)
      return response(res, 200, 'success patch data', result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params
      const check = await getProductById(id)
      if (check.length < 1) {
        return response(res, 400, `data id : ${id} does not exist`)
      } else {
        const result = await deleteProduct(id)
        return response(res, 200, `data id : ${id} deleted`, result)
      }
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  }
}
