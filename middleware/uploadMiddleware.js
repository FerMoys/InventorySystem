const multer = require('multer');

const multerS3 = require('multer-s3');

const { PutObjectCommand } = require('@aws-sdk/client-s3');

const s3 = require('../services/s3Service');

const storage = multer.memoryStorage();

const upload = multer({
  storage
});

module.exports = upload;