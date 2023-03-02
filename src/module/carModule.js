const mongoose = require('mongoose')

const cars = mongoose.Schema({
    name:{
        type:String
    },
    model:{
        type:Number
    },
    MaxPaylodeLimt:{
        type:Number
    },
    minPaylodeLimt:{
        type:Number
    },
    instock:{
        type:Number,
        default: 0
    }
})

module.exports = mongoose.model("cars", cars)