const aws = require('@aws-sdk/client-s3')
const fs = require('fs')
let { defaultProvider } = require("@aws-sdk/credential-provider-node");

const s3 = new aws.S3({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  defaultProvider

})

let s3Bucket = new aws.S3({  region: 'ca-central-1' })

const uploadbase64 = function(image,FileName) {  
  let buf = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""),'base64')
 
   let data = {
      Key: FileName,
      Body: buf,
      Bucket: process.env.BUCKET,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',

  };

  s3Bucket.putObject(data, function (err, result) {
    if (err) console.error(err);
    else {
      console.log(`Cropped Image Uploaded Successfully to AWS S3`)
    }
  }); 
        let returnUrl = `https://${data.Bucket}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${data.Key}` 
        return returnUrl  
};



module.exports = uploadbase64


