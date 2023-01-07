const express = require('express');
// const mongoose = require('mongoose');
const Product = require('../models/Product');
const router = express();

router.get('/products', async (req,res) =>  {
    try {
        const user = await Product.find()
        // const product = await Product.find();
        res.status(200).json(user)     
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

module.exports = router;