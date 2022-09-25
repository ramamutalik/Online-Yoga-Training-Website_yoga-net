const mongoose = require('mongoose')

const testomonialSchema = new mongoose.Schema({
    name:{
        type:String,
        required:'This is required'
    },
    image:{
        type:String,
        required:'This is required'
    },
    text:{
        type:String,
        required:'This is required'
    },
    address:{
        type:String,
        required:'This is required'
    }
});

module.exports = mongoose.model('Testomonials',testomonialSchema);