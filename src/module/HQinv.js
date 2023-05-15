const mongodb = require('mongoose')

const HQinv = mongodb.Schema({
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
    },
    proDate:{
        type:Date
    },
    expDAte:{
        type:Date
    }
    ,inStock:{
        type:String
    }
})

module.exports = mongodb.model('HQInv', HQinv)
