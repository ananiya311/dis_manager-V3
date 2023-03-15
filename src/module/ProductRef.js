const mongoose = require('mongoose')

const ProductRef = mongoose.Schema({
    ProductName:{
        type:String,
        trim:true
    },
    picPerCase:{
        type:Number
    },
    pricePerCase:{
        type:Number
    },
    pricePerpices:{
        type:Number
    }
})

module.exports = mongoose.model("ProductRef", ProductRef)