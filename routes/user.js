const express = require('express');
// const mongoose = require('mongoose');
const User = require('../models/User');
const router = express();

router.get('/users', async (req,res) =>  {
    try {
        const user = await User.find()
        // const product = await Product.find();
        res.status(200).json(user)     
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

module.exports = router;