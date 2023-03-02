const experss = require('express')
const app = experss()
const session = require('express-session')
const mongose = require('connect-mongodb-session')(session)
const parser = require('cookie-parser')
const notfound = require('./src/middelwhar/notfound')
require('dotenv').config()
const routers = require('./src/router/router')


app.use(parser())
app.use(experss.urlencoded({extended:true}))
app.use(experss.json());

//seting the view engine
app.set('views', './src/views')
app.set('view engine', 'ejs')

//set static file 
app.use(experss.static('pubilc'))
app.use('/css', experss.static(__dirname + 'pubilc/css'))
app.use('/js', experss.static(__dirname + 'pubilc/js'))


// home route
app.use('/', routers)
app.use(notfound)

// import connaction
const dbconact = require('./src/db/conaction')


const port = 1000
const start = async()=>{
    await dbconact(process.env.DB)
    app.listen(port, console.log("the port is runing on ", port))
}

start()