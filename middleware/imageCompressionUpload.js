require('dotenv').config({path: './config/.env'})
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const { defaultProvider } = require("@aws-sdk/credential-provider-node")
const path = require('path');
const sharp = require('sharp');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ca-central-1',
  defaultProvider
})

const imageCompressionUpload = async function(key, imgWidth, imgheight){
  const response = await s3.getObject({
    Bucket: 'ilovguitars-amlss-mom',
    Key: key,
    }).promise() 

    const compressedImagePromise = sharp(response.Body)
    .toFormat('jpeg')
    .jpeg({
        force: true,
    })
    .resize({ width: imgWidth, height: imgheight, fit: 'contain', withoutEnlargement: true })
    .toBuffer()

    const compressedImage = await Promise.all([compressedImagePromise])

    let data = {
      Key: Date.now().toString() + '-' + key,
      Body: compressedImage[0],
      Bucket: 'ilovguitars-amlss-mom',
      ContentType: "image",
  }
    await s3.putObject(data, function (err, result) {
      if (err) console.error(err)
    }); 

    return `https://${data.Bucket}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${data.Key}` 
}


module.exports = imageCompressionUpload



