const {
  getProduct,
  getProductById,
  postProduct,
  patchProduct
  // dataCount
} = require('../model/product')

const { response } = require('../helper/response')

module.exports = {
  getProduct: async (req, res) => {
    try {
      const result = await getProduct()
      return response(res, 200, 'success get data', result)
    } catch (error) {
      return response(res, 400, 'Bad Request', error)
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
      return response(res, 400, 'Bad Request', error)
    }
  },
  postProduct: async (req, res) => {
    try {
      const {
        productName,
        categoryCode,
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
        categoryCode,
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
      const result = await postProduct(data)
      return response(res, 200, 'success post data', result)
    } catch (error) {
      return response(res, 400, 'Bad Request', error)
    }
  },
  patchProduct: async (req, res) => {
    try {
      const { id } = req.body
      const {
        productName,
        categoryCode,
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
        categoryCode,
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
      const result = await patchProduct(id, data)
      return response(res, 200, 'success post data', result)
    } catch (error) {
      return response(res, 400, 'Bad Request', error)
    }
  }
}
