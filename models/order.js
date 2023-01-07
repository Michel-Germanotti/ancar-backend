const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schéma Mongodb pour la collection d'utilisateurs
const orderSchema = new Schema({
    name:String,
    email:String,
    address:String,
    items:[
        {
            title:String,
            price:Number,
            stock:Number,
            brand:String,
            category:String,
            description:String,
            soldBy:String,
            url:String,
            feature:String
        }
    ]
})

module.exports = mongoose.model('order', orderSchema)