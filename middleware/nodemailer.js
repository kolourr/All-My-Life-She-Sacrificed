require('dotenv').config({path: './config/.env'})
const aws = require('@aws-sdk/client-ses')
const nodemailer = require("nodemailer");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");

const ses = new aws.SES({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ca-central-1',
  defaultProvider
})

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

  // setup contact us email
let mailOptions = (userName, userMessage) => {
  let params = {
    from: `${process.env.APP_ADMIN} ${process.env.APP_EMAIL}`, 
    to: process.env.APP_EMAIL,  
    subject: `New Message From ${userName} about ${process.env.APP_NAME}`,  
    html: userMessage, 
  } 

   transporter.sendMail(params, (error, info) => {
    if (error) {
        return console.log(error)
    }
    else {
      console.log('Email Message Sent!')
    }

})

}
 


module.exports = mailOptions



