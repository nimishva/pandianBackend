const express           = require('express');//Including Express
const app               = express();  //Initialising App
const mongoose          = require('mongoose') // Including Mongoose 
const appConfig         = require('./config/appConfig'); //Including configuration file
const cookieParser      = require('cookie-parser'); //Including cookie-parser
const bodyParser        = require('body-parser'); //Including body-parser
const fs                = require('fs'); //Including FS -> File and Directory access operations
const http              = require('http'); // Including http 
const logger            = require('./app/libs/logger');    

//Declaring Path for Routes ,Models etc..
const routePath         = './app/routes/';
const modelPath         = './app/models';


//Application Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.options("/*", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

//Boostrapping all models 
fs.readdirSync(modelPath).forEach(function(file){
    if(~file.indexOf('.js')) require(modelPath+'/'+file);
});//End of Bootstrapping models

// Bootstrapping all routes
fs.readdirSync(routePath).forEach(function(file){
    if(~file.indexOf('.js')){
        let route  = require(routePath+'/'+file);
        route.setRouter(app);
     }
});//End of Bootstrapping routes

//Creating Http Server
const server = http.createServer(app);
server.listen(appConfig.port);
server.on('error',onError);
server.on('listening',onListening);


const socketLib     = require('./app/libs/socketLib');
const socketServer  = socketLib.setServer(server);


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
      logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
      throw error;
    }
  
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10);
        process.exit(1);
        break;
      default:
        logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10);
        throw error;
    }
  }
  
  /**
   * Event listener for HTTP server "listening" event.
   */
  
  function onListening() {
    
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    ('Listening on ' + bind);
    logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10);
    let db = mongoose.connect(appConfig.db.uri,{ useNewUrlParser: true ,'useCreateIndex': true,useUnifiedTopology: true});
  }

module.exports = app;