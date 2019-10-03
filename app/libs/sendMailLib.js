const nodeMailer = require('nodemailer');

let sendMail = (mailData) => {

let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'resfeber.ms.app@gmail.com', // generated ethereal user
        pass: 'Firstproject@2019' // generated ethereal password
    },
    tls:{
        rejectUnauthorized : false
    }
});

// send mail with defined transport object
let info = transporter.sendMail({
    from: 'resfeber.ms.app@gmail.com', // sender address
    to: mailData.rcvr, // list of receivers
    subject: mailData.subject, // Subject line
    html: mailData.message // html body
});

console.log('Message sent: %s', info.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// Preview only available when sending through an Ethereal account
console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(info));
// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

return true;
} //sendMail ends

 module.exports = {
     sendMail
 }