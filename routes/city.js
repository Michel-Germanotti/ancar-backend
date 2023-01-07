const express = require('express');
const cityController = require('../controllers/city');

const router = express();

router.route('/city')
    .get(cityController.getCity)

module.exports = router;