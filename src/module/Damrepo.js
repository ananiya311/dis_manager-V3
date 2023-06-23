const mongoose = require('mongoose')

const Derpo = mongoose.Schema({
    productName:{
        type:String
    },
    id:{
        type:String
    },
    expDate:{
        type:Date
    },
    proDate:{
        type:Date
    },
    NumerOfCece:{
        type:Number
    }
})
module.exports = mongoose.model("Damrepo", Derpo)