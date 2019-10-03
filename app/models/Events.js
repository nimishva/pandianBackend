const mongoose = require('mongoose'); // Includig Mongoose Package
const timeLib  = require('../libs/timeLib');

Schema = mongoose.Schema;

let eventsSchema = new Schema ( {

        eventId  : {

             type        : String,
             default     : "",
             index       : true,
             unique      : true

        },

        start : {

             type        : Date,
    
        },

        end  : {

             type        : Date,
             default     : "",

        },

        title : {

             type        : String,
             default     : "",

        },

          attendees   : [],
        
          location    : {

             type        : String,
             default     : "",

        },

         description   : {

             type        : String,
             default     : "",

        },

        createdBy :{

            type:String

          },
          allDay: {
              type    :Boolean,
              default :false
            },
          resizable: {},
          draggable: {

            type: Boolean,
            default : true

          } 

});


mongoose.model('Events',eventsSchema);

