const mongoose        = require('mongoose');
const eventModel      = mongoose.model('Events');
const eventScheduler  = require('scheduled-event-emitter');
const emitter = new eventScheduler();






let triggerReminder = (eventData) =>{
    console.log("trigger called");
    
    
    let newDt = new Date(new Date().getTime() + 4000);
    console.log(newDt);
    emitter.on('triggerReminder',(payload)=>{
        console.log("sdfsd")
      });
    
    }

module.exports = {

    triggerReminder:triggerReminder
}