const express           = require('express'); //Including Express
const router            = express.Router();
const appConfig         = require('../../config/appConfig'); //Including appConfig file
const userController    = require('../controllers/usersCon'); //Including Controller file
const nodeMailer        = require('../libs/sendMailLib');

let setRouter = (app) =>{

   let baseUrl = `${appConfig.apiVersion}/users`; //Declaring baseUrl 


    //Routes 
    //Signup route
    app.post(`${baseUrl}/signUp`,userController.signUpFn);

    /**
	 * @api {get} /api/v1/users/signup New User Signup
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "User Created",
	    "status": 200,
	    "data": [
                              {
						            userId: "string",
					            	username: "string",
						            firstName: "string",
						            lastName: "string",
						            email: string,
						            mobile: number,
						            createdOn: "date"
					             }
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "user creation error",
	    "status": 500,
	    "data": null
	   }
	 */



    //Signin  route
    app.post(`${baseUrl}/signIn`,userController.signInFn);
    /**
	 * @api {get} /api/v1/users/signin sigin
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Login successfull",
	    "status": 200,
        "data": [      
                    token:"authorization token",
                    userData :   
                                {
						            userId: "string",
					            	username: "string",
						            firstName: "string",
						            lastName: "string",
						            email: string,
						            mobile: number,
						            createdOn: "date"
					             }
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Login failed",
	    "status": 500,
	    "data": null
	   }
	 */


    //Forgot password
    app.post(`${baseUrl}/forgotPassword`,userController.resetPassword);
    
    /**
	 * @api {get} /api/v1/users/forgotPassword Forgotpassword
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
    * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Mail has been sent",
	    "status": 200,
        "data": [      
                    authToken :"authorization token",
                    userData :   
                                {
						            userId: "string",
					            	username: "string",
						            firstName: "string",
						            lastName: "string",
						            email: string,
						            mobile: number,
						            createdOn: "date"
					             }
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Data Fetching error,Please try again",
	    "status": 500,
	    "data": null
	   }
	 */


    //Forgot password
    app.post(`${baseUrl}/resetpassword`,userController.UpdateNewPassword);

     /**
	 * @api {get} /api/v1/users/resetpassword Reset Password
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "New password updated",
	    "status": 200,
	    "data": [
                  {
						            userId: "string",
					            	username: "string",
						            firstName: "string",
						            lastName: "string",
						            email: string,
						            mobile: number,
						            createdOn: "date"
				 }
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Password updation error,Please try again",
	    "status": 500,
	    "data": null
	   }
	 */



    //get all data route
    app.get(`${baseUrl}/getAll`,userController.getAllData);

    /**
	 * @api {get} /api/v1/users/getAll Get all Users
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Data Found",
	    "status": 200,
	    "data": [
					{
						userId: "string",
						username: "string",
						firstName: "string",
						lastName: "string",
						email: string,
						mobile: number,
						createdOn: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Data fetching error",
	    "status": 500,
	    "data": null
	   }
	 */



    //get userid  by name
    app.post(`${baseUrl}/getUserIdByName`,userController.getUserId);

     //get userList
    app.get(`${baseUrl}/getUsersList`,userController.getUsersList);

};


module.exports = {
    setRouter : setRouter
}