const mon = require('mongoose')

const request = mon.Schema({
    items:{
        type:Array
    }
})

module.exports = mon.model('request', request)