const mongoose = require('mongoose')

const calenderSchema = new mongoose.Schema({
    month:{
        type:String,
        required:'This is required'
    },
    year:{
        type:String,
        required:'This is required'
    },
    date:{
        type:String,
        required:'This is required'
    },
    day:{
        type:String,
        required:'This is required'
    },
    timing:{
        type:String,
        required:'This is required'
    }
});

module.exports = mongoose.model('Calender',calenderSchema);