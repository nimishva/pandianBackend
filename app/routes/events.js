const express           = require('express'); //Including Express
const router            = express.Router();
const appConfig         = require('../../config/appConfig'); //Including appConfig file
const eventController    = require('../controllers/eventsCon'); //Including Controller file

let setRouter = (app) =>{

   let baseUrl = `${appConfig.apiVersion}/events`; //Declaring baseUrl 


    app.post(`${baseUrl}/newEvent`,eventController.createNewEvent);

    /**
	 * @api {post} /api/v1/events/newEvent Create New Event
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "New event Created",
	    "status": 200,
	    "data": [
					{
						eventId: "string",
						start: "date",
						end: "date",
						title: "string",
						attendees: array,
						location: string,
						description: "string",
						author: "string",
						createdBy: string
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To create new event",
	    "status": 500,
	    "data": null
	   }
	 */

     app.get(`${baseUrl}/getAllEvents`,eventController.getAllNewEvents);

        /**
	 * @api {get} /api/v1/events/getAllEvents Get All Event Data
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Event data found",
	    "status": 200,
	    "data": [
					{
						eventId: "string",
						start: "date",
						end: "date",
						title: "string",
						attendees: array,
						location: string,
						description: "string",
						author: "string",
						createdBy: string
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To fetch event data",
	    "status": 500,
	    "data": null
	   }
	 */


};


module.exports = {
    setRouter : setRouter
}