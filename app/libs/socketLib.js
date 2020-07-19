const socketio        = require('socket.io');
const mongoose        = require('mongoose');
const eventModel      = mongoose.model('Events');
const eventScheduler  = require('scheduled-event-emitter');
const emitter = new eventScheduler();

const mailTemplate    = require('../libs/createMailTemplate'); 

const moment          = require('moment');

const tokenLib = require('./tokenLib');
const apiResponse = require('./responseGenLib');
const logger   = require('./logger');
const checkLib = require('./checkLib');    
const events   = require('events');
const shortId  = require('shortid'); 
const myEvents = new events.EventEmitter();

let setServer = (server)=>{  
  let newEventData;
  let io        = socketio.listen(server);
  let myIo      = io.of('');

   myIo.on('connection',socket=>{

    socket.rooms = "resfeber"
    // console.log('socket Initialised');
    socket.emit('verifyUser','');

    socket.on('setUser',authToken => {
        // console.log('SetUser Called')
        tokenLib.verifyWithoutSecret(authToken,(err,tokenData)=>{
            if(err){
              socket.emit('token-error',{status:403,message:'Token not valid/expired'});
            }else{
              let currentUser = tokenData.data;
              //console.log(currentUser);
              socket.username   = currentUser.username;
            }
        })

    }) //Verifying token and Setting user online

    socket.on('new-event',(eventData)=>{
      eventData.eventId = shortId.generate();
      let newEvent = new eventModel(eventData);
      newEvent.save((err,result)=>{
        if(err){
          console.log(err);
        }else if(checkLib.isEmpty(result)){
          console.log('Event not saved');
        }else{

          console.log(result);
      let response = apiResponse.generate(false,'New Event Created',200,eventData);

      

       for(let a of eventData.attendees){
        myIo.emit(a.name,response);
      
        }

        emitReminder(eventData.eventId);
        eventData.type = 'New Meeting added to your Calendar';
        mailTemplate.createMail(eventData);

        }

    }) //Emitting notification to all attendees
    });


    socket.on('update-event',(eventData)=>{
      let options = eventData;
      let attendees_name = [];
       eventModel.updateOne({eventId:eventData.eventId},options,{multi:true})
        .exec((err,result)=>{
        if(err){
          console.log(err);
        }else if(checkLib.isEmpty(result)){
          console.log('Event not saved');
        }else{
          let response = apiResponse.generate(false,'Event Data Updated',200,eventData);
    
          for(let a of eventData.attendees){
              
              myIo.emit(a.name,response);
              attendees_name.push(a.name);
           }
          
             emitReminder(eventData.eventId);  

              eventData.type = 'Meeting Details Updated';
              mailTemplate.createMail(eventData);
       } //If else statement

    }); //Emitting notification to all attendees
    }); //Updating event

    socket.on('delete-event',(eventData)=>{
      // console.log(eventData);
       eventModel.remove({eventId:eventData.eventId})
        .exec((err,result)=>{
        if(err){
          console.log(err);
        }else if(checkLib.isEmpty(result)){
          console.log('Event not deleted');
        }else{
          
          let response = apiResponse.generate(false,'Event Deleted',200,eventData);
          for(let a of eventData.attendees){
          myIo.emit(a.name,response);
        }
          emitReminder(eventData.eventId);
        } //If else statement

    }); //Emitting notification to all attendees
    }); //Updating event



    // socket.room = 'resefeber';
    // socket.

   
   }); //Main Socket Connecton 
   
   let emitReminder = (eventId) =>{
    emitter.clearSchedule();
   let allEvents;
    eventModel.find({eventId:eventId})
    .exec((err,result)=>{
      if(err){
        console.log(err);
      }
     else if(checkLib.isEmpty(result)){
      console.log("No Events found");
     }else{

        result.forEach((events)=>{
          let eventData = {

            type      :'reminder',
            eventId   : events.eventId,
            start     : events.start,
            attendees : events.attendees,
            title     : events.title

          }
     
    let startDt = new Date(events.start - 60000) ;    
    emitterId = emitter.scheduleEmit('triggerReminder',startDt,eventData);

    });
    }  
   });
   
   emitter.on('triggerReminder',(payload)=>{
    for(let a of payload.attendees){
     myIo.emit(a.name,payload);
   }
  });

  } //Timer events 
    

} //End of setServer


 module.exports = {
   setServer : setServer
  }