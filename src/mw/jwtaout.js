require('dotenv').config()
const jwt = require('jsonwebtoken')

const varifay = (req, res, next)=>{
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, process.env.KEY)
        req.user = user;
        next()
    } catch (error) {
        rawListeners.clearCookie('token')
        res.redirect('/loginpage')
    }
}