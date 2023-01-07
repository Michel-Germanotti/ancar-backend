const express = require('express');
const orderController = require('../controllers/order');

const router = express();

router.route('/order')
    .post(orderController.addOrder)
    .get(orderController.getOrderById)
    .delete(orderController.deleteOrder)

router.route('/orders')
    .get(orderController.getOrders)

router.route('/myorders')
    .get(orderController.getOrdersByMail)

module.exports = router;