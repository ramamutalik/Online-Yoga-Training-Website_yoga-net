const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:'This is required'
    },
    email:{
        type: String,
        required:'This is required',
        unique: true
    },
    password:{
        type:String,
        required:'This is required'
    },
    role:{
        type: String,
        default:  'customer'
    }
}, {timestamps: true});

module.exports = mongoose.model('User',userSchema);