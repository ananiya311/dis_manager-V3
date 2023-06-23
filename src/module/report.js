const moonges = require('mongoose')

const report = moonges.Schema({
    reportList:{
        type:Array
    }
})

module.exports = moonges.model("ReportList",report)