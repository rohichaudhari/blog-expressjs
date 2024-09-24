const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    title:{
        type:String,
    },
    description: {
        type: String,
    },
    createAt:{
        type:Date,
        default:Date.now
    }
},
{
   versionKey:false
})

module.exports = mongoose.model('profiles',profileSchema);