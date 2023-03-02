
const mongodb = require('mongoose')


const driver = mongodb.Schema({
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
        trim:true
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
        trim:true
    },
    PassWorde:{
        type:String,
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
    paylode:{
        type:Array
    },
    carAs:{
        type:String
    },
    userRecord:{
        delivries:{
            type:Number
        },
        delivriStatas:{
            type:Array
        }
    },
    Status:{
        type:String,
        default:"Driver"
    }
    
})

module.exports = mongodb.model("driver", driver) 