const {
  getProduct,
  getProductById,
  deleteProduct,
  postProduct,
  patchProduct,
  dataCount
} = require('../model/product')
const fs = require('fs')
const qs = require('querystring')
const { response } = require('../helper/response')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getProduct: async (req, res) => {
    try {
      let { page, limit, sort, search, asc } = req.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await dataCount(sort, search, asc)
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const result = await getProduct(limit, offset, sort, search, asc)
      const prevLink =
        page > 1 ? qs.stringify({ ...req.query, ...{ page: page - 1 } }) : null
      const nextLink =
        page < totalPage
          ? qs.stringify({ ...req.query, ...{ page: page + 1 } })
          : null
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
      const newData = {
        result,
        pageInfo
      }
      client.setex(
        `getProduct: ${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify(newData)
      )
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
        client.setex(`getProductById:${id}`, 3600, JSON.stringify(result))
        return response(res, 200, `success get product id : ${id}`, result)
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
        productDescription
      } = req.body

      const data = {
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
        image: req.file === undefined ? '' : req.file.filename,
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
        productDescription
      } = req.body
      const data = {
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
        productDescription,
        image: req.file === undefined ? '' : req.file.filename
      }
      const unimage = await getProductById(id)
      const photo = unimage[0].image
      if (data.image === '') {
        delete data.image
      }
      if (photo !== '' && photo !== data.image) {
        fs.unlink(`./uploads/${photo}`, function (err) {
          if (err) throw err
        })
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
      const unimage = await getProductById(id)
      const photo = unimage[0].image
      if (photo !== '') {
        fs.unlink('./uploads/' + photo, function (err) {
          if (err) throw err
        })
      }
      const result = await deleteProduct(id)
      return response(res, 200, `data id : ${id} deleted`, result)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  }
}
