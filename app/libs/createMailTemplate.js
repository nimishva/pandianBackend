const mongoose        = require('mongoose');
const userModal       = mongoose.model('Users');
const mailer          = require('../libs/sendMailLib');   
const moment          = require('moment');


let mailTemplate = (data)=>{

    data.attendees.forEach(att => {
    userModal.findOne({username:att.name},(err,result)=>{
result = result.toObject();
        let mailData = {

            subject  : `${data.type}`,
            message  : `<h1>Hello</h1>
                       <h2><b>You calendar is updated</b><h2>
    
                       <p><b>Title :</b> ${data.title}</br>
                       <b>Start Date :</b> ${ moment(data.start).format('MMMM Do YYYY, h:mm:ss a') }</br>
                       <b>End Date :</b> ${moment(data.end).format('MMMM Do YYYY, h:mm:ss a')}</br>
                       <b>Location :</b> ${data.location}</br>
                       <b>Description :</b> ${data.description}</br>
                       <b>Created by :</b> ${data.createdBy}
                       </p>
    
                       <p>Regards<br>
                        <b>Team Resfeber</b>
                       </p>`,
            rcvr : result.email,  
            
           } //Mail Data Object
        mailer.sendMail(mailData);
    })
   
      //  attendees.push(email);
    });    
}

module.exports = { 
    createMail : mailTemplate
 }