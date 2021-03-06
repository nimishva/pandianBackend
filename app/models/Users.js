const mongoose = require('mongoose'); // Includig Mongoose Package
const timeLib  = require('../libs/timeLib');

Schema = mongoose.Schema;

let userSchema = new Schema ( {

        empid : {

             type : Number
             
        },

        userId  : {

             type        : String,
             default     : "",
             index       : true,
             unique      : true

        },

        username : {

             type        : String,
             default     : "",
    
        },
        userType : {

             type        : String,
             default     : ""
        },
        password  : {

             type        : String,
             default     : "",

        },

        firstName : {

             type        : String,
             default     : "",

        },

        fatherName   : {

             type        : String,
             default     : "",

        },
        
          email    : {

             type        : String,
             default     : "",

        },

         mobile   : {

             type        : Number,
             default     : 0,

        },

        createdOn :{

            type:Date,
            default:timeLib.now()

          },

          additionalData :{
               dob            : Date,
               adharCard      : Number,
               accountNo      : Number,
               ifsc           : String
          },

          reference : {
               type : String
          },
          entrySide : {
               type : String
          },
          approved : {
               type: Boolean,
               default : false
          }

});


mongoose.model('Users',userSchema);

