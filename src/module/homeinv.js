const mongodb = require('mongoose')

const homeinv = mongodb.Schema({
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

module.exports = mongodb.model('Home-page-Inv', homeinv)
