const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schéma Mongodb pour la collection d'utilisateurs
const userSchema = new Schema({
    email:String,
    password:String,
    firstName:String,
    lastName:String,
    birthday:String,
    postalCode:Number,
    city:String,
    description: String,
    url:String,
    gender: String,
    role:{type:String,default:'visitor'},
    blocked:{type:Boolean,default:false}
})

module.exports = mongoose.model('user', userSchema)