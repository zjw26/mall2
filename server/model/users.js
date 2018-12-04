const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var produtSchema = new Schema({
    "userId" : String,
    "userName" : String,
    "userPwd" : String,
    "orderList" : Array,
    "addressList" : [
        {
            "addressId" :String ,
            "userName" : String,
            "streetName" :String ,
            "postCode" : String,
            "tel" : String,
            "isDefault" : Boolean
        }
    ],
    "cartList" : [
        {
            "productImage" : String,
            "salePrice" : String,
            "productName" : String,
            "productId" : String,
            "productNum" : String,
            "checked" : String
        }
    ]
})

module.exports = mongoose.model('User',produtSchema,'users');