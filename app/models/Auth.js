const mongoose    = require('mongoose');
const timeLib     = require('../libs/timeLib');
const Schema  = mongoose.Schema;

let authModel = new Schema(
    {
        userId      : String,
    },
    {
        authToken   : String,

    },
    {
        secretKey   : String,
    },  
    {
        createdDate : Date,
        default     : timeLib.now()
    }
 );

 module.exports = mongoose.model('Auth',authModel);   

