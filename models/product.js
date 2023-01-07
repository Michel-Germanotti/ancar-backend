const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = mongoose.model('Product', new Schema({
    title:String,
    price:Number,
    stock:Number,
    url:String,
    brand:String,
    category:String,
    feature:String,
    description:String,
    soldBy:String
}));

module.exports = Product;