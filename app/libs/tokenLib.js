const jwt       = require('jsonwebtoken');
const shortId   = require('shortid');
const secretKey = "Be yourself everyone else is already taken"
let generate = (data,cb)=>{
    try {
    let claim = {

        jwtId   : shortId.generate(),
        iat     : Date.now(),
        exp     : Math.floor(Date.now() / 1000) + (60 * 60),
        iss     : 'resfeber',
        sub     : 'authToken',
        data    : data
    };

    let tokenData = {
        token       : jwt.sign(claim,secretKey),
        secretKey   : secretKey 
    };
    cb(null,tokenData);

}catch(err){
    cb(err,null);
} //Try Catch Ends 
} // Generate token

let verify = (token,cb) =>{
    jwt.verify(token, secretKey, function(err, decoded) {
        if(err){
            console.log(err);
            cb(err,null);
        }else{
           // console.log(decoded);
            cb(null,decoded);
        }
      });
}

let verifyWithoutSecret = (token,cb) =>{
    jwt.verify(token, secretKey, function(err, decoded) {
        if(err){
            console.log(err);
            cb(err,null);
        }else{
           // console.log(decoded);
            cb(null,decoded);
        }
      });
}

module.exports = {

    generate,
    verify,
    verifyWithoutSecret

}