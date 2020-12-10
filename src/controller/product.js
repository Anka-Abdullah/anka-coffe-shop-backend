const {
  getProduct,
  getProductById,
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
      let { page, limit, sort, search } = req.query
      // search != null ? (page = 1) : (page = parseInt(page))
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await dataCount()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const result = await getProduct(limit, offset, sort, search)
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
  },
  getProductById: async (req, res) => {
    try {
      const { id } = req.body
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
        productStatus,
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
        productStatus,
        productSizeR250,
        productSizeL300,
        productSizeXL500,
        productDelivery,
        productDinein,
        productTakeAway,
        productImage,
        productDescription
      }

      if (
        productName == null ||
        categoryId == null ||
        productPrice == null ||
        productStock == null ||
        deliveryStartHour == null ||
        deliveryEndHour == null ||
        productStatus == null ||
        productSizeR250 == null ||
        productSizeL300 == null ||
        productSizeXL500 == null ||
        productDelivery == null ||
        productDinein == null ||
        productTakeAway == null ||
        productImage == null ||
        productDescription == null
      ) {
        return response(res, 400, 'no empty columns')
      } else {
        const result = await postProduct(data)
        return response(res, 200, 'success post data', result)
      }
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
        productStatus,
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
        productStatus,
        productSizeR250,
        productSizeL300,
        productSizeXL500,
        productDelivery,
        productDinein,
        productTakeAway,
        productImage,
        productDescription
      }
      if (data.productName === '') {
        delete data.productName
      }
      if (data.categoryId === '') {
        delete data.categoryId
      }
      if (data.productPrice === '') {
        delete data.productPrice
      }
      if (data.productStock === '') {
        delete data.productStock
      }
      if (data.deliveryStartHour === '') {
        delete data.deliveryStartHour
      }
      if (data.deliveryEndHour === '') {
        delete data.deliveryEndHour
      }
      if (data.productStatus === '') {
        delete data.productStatus
      }
      if (data.productSizeR250 === '') {
        delete data.productSizeR250
      }
      if (data.productSizeL300 === '') {
        delete data.productSizeL300
      }
      if (data.productSizeXL500 === '') {
        delete data.productSizeXL500
      }
      if (data.productDelivery === '') {
        delete data.productDelivery
      }
      if (data.productDinein === '') {
        delete data.productDinein
      }
      if (data.productTakeAway === '') {
        delete data.productTakeAway
      }
      if (data.productImage === '') {
        delete data.productImage
      }
      if (data.productDescription === '') {
        delete data.productDescription
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
      const result = await deleteProduct(id)
      return response(res, 200, `data id : ${id} deleted`, result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  }
}
