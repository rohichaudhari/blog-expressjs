const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:String,
    lastName:{
        type:String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('users',userSchema);