const mongoose = require('mongoose')

const connect = (url)=>{
   try {
    mongoose.connect(url,{
        useCreateIndex:true,
        useFindAndModify:true,
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(res=>{
        console.log("connected successfuly");
    })
   } catch (error) {
    console.log("test");
   }
}

module.exports = connect