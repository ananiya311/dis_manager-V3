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
    PlatNumber:{
        type:String,
        default: 0
    },
    available:{
        type:Boolean,
        default: true
    }
})

module.exports = mongoose.model("HQcars", cars)