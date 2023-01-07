const express = require('express');
const productController = require('../controllers/product')

const router = express();

router.route('/product')
    .get(productController.getProduct)
    .post(productController.addProduct)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)

router.route('/products')
    .get(productController.getProducts)

module.exports = router;