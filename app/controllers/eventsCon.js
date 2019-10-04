const mongoose       = require('mongoose');//Including Express
const apiResponse    = require('../libs/responseGenLib'); // Response generation library
const checkLib       = require('../libs/checkLib'); // Data validation library
const shortId        = require('shortid'); //unique id generator
const passwordLib    = require('../libs/passwordLib') // Password handling library . hashpassword ,compare password etc..
const logger         = require('../libs/logger') //Logging library
const socketLib      = require('../libs/socketLib');   

const eventModel = mongoose.model('Events');

let createNewEvent = (req,res)=>{

    let newEvent = new eventModel({

            eventId     : shortId.generate(),
            start       : req.body.start,
            end         : req.body.end,
            title       : req.body.title,
            attendees   : req.body.attendees,
            location    : req.body.location,
            description : req.body.description,
            createdBy   : req.body.createdBy,
            allDay      : false,
            resizable   : { 
                            beforeStart : true,
                            afterEnd    : true
                          },
            draggable   : true


    });// New event Model ends

    newEvent.save((err,result)=>{
        if(err){
            // console.log(err);
            logger.error("Data base error","eventsCon:createNewEvent",10);
            let response = apiResponse.generate(true,'Event creation error,',500,null);
            res.send(response);
        }else {
            logger.info("Event Created","eventsCon:createNewEvent",1);
            let newEventObj = result.toObject();
            let response = apiResponse.generate(false,'Event created',200,newEventObj);
            // console.log(response);
            socketLib.newEventNotify(newEventObj);
            res.send(response);
        }


    })



} //Create new event method ends 


let getAllNewEvents = (req,res) =>{

    eventModel.find()
    .exec((err,result)=>{
        if(err){
            //console.log(err);
            logger.error("Fetch data error","eventsCon:getAllNewEvents",10);
            let response = apiResponse.generate(true,'Event fetching error,',500,null);
            res.send(response);
        }else{
            logger.info("Event Data Feteched","eventsCon:getAllNewEvents",1);
            let response = apiResponse.generate(false,'Events data found',200,result);
            //console.log(response);
            res.send(response);
        }
    })


} //Get All New Events ends here 



module.exports ={

    createNewEvent      :createNewEvent,
    getAllNewEvents     :getAllNewEvents

}