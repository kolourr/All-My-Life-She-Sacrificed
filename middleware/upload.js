const aws = require('@aws-sdk/client-s3')
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

const fileFilter = (req, file, cb) => {
  let ext = path.extname(file.originalname);
  if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
    cb(new Error("File type is not supported"), false);
    return;
  }
  cb(null, true);
}
      
      
const storage2 = multerS3({
    fileFilter,
    s3: s3,
    bucket: 'ilovguitars-amlss-mom' ,
    metadata: (req, file, cb) => {
      cb(null, {fileName: file.fieldname})
    },
    key: (req, file, cb) => {
 
      cb(null, Date.now().toString() + '-' + file.originalname)
    },

})
 
const upload = multer({ storage:storage2 })



module.exports = upload



