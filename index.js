const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,useUnifiedTopology: true});

// Schema
const User = require('./models/User');
const Product = require('./models/Product');

// Routes
const userRoute = require('./routes/User');
const productRoute = require('./routes/Product');


app.use(userRoute);
app.use(productRoute);


// app.use('/', async (req,res) => {
//     try {
//         const user = await User.find()
//         // const product = await Product.find();
//         res.status(200).json(user)     
//     } catch (error) {
//         res.status(400).json({message: error.message});
//     }
// });



app.listen(process.env.PORT, () =>{
    console.log(`Server started ont the port ${process.env.PORT}`);
});