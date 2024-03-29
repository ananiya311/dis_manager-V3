const mongoose = require ('mongoose')

const products = mongoose.Schema({
    productName:{
        type:String,
        required: [true, "product name is required"],
        trime:true,
    },
    productPrice:{
        type:Number,
        required:[true, "the price of the product in dozens is required"],
        trime:true
    },
    productionDate:{
        type:Date,
        required:[true, "production date is required"]
    },
    expirationDate:{
        type:Date,
        required:[true, "the expertion date is required"]
    },
    productCatagory:{
        type:String,
        required:[true, "teh priduct catagory is required"],
        trime:true
    },
    weight:{
        type:Number,
        required:[true, "the weight of the product is required"],
        trime:true
    },
    invantory:{
        type:Number,
        required:true
    },
    test:{
        type:Array
    }
})

module.exports = mongoose.model('products', products)