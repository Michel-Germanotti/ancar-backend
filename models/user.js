const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = mongoose.model('User', new Schema({
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
}));

module.exports = User;