const date = require('date-and-time')
const mongoose = require('mongoose')
const users = mongoose.Schema({
    
    firstName:{
        type:String,
        required: [true, "your first name is required"],
        trim:true
    },
    lastName:{
        type:String,
        required:[true, "your last name is required"],
        trim:true
    },
    Sex:{
        type:String,
        required:[true, "sex is required"],
        trim:true
    },
    DOB:{
        type: Date
    },
    City:{
        type:String,
        default:'Addis Ababa',
        trim:true
    },
    Kabala:{
        type:String,
        trim:true
    },
    HomeNumber:{
        type:String,
        trim:true,
        default: "new"
    },
    Education:{
        type:String,
        trime:true
    },
    phoneNumber1:{
        type:String,
        trime:true
    },
    phoneNumber2:{
        type:String,
        trime:true
    },
    SubCity:{
        type:String,
        trim:true
    },
    Email:{
        type:String,
        required:[true, "email is required"],
        trim:true
    },
    PassWorde:{
        type:String,
        required:[true, "password is required"],
        trim:true
    },
    ImgUrl:{
        type:String,
        default: null
    },
    Imgpublicid:{
        type:String,
        default:null
    },
    Status:{
        type:String,
        default: "user"
    },
})

module.exports = mongoose.model('users', users)