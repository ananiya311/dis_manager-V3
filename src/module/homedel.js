const mongoos = require('mongoose')

const delivary = mongoos.Schema({
    productName:{
        type:String
    },
    Drivarid:{
        type:String
    },
    ProductList:{
        type:Array
    },
})

module.exports = mongoos.model("Home Delivar List", delivary)
