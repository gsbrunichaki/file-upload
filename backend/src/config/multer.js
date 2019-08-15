const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const UPLOAD_FOLDER = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');
const MEGABYTE = 1024 * 1024;

module.exports = {
  dest: UPLOAD_FOLDER,
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, UPLOAD_FOLDER);
    },
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (error, hash) => {
        error && callback(error);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        callback(null, fileName);
      })
    },
  }),
  limits: {
    fileSize: 2 * MEGABYTE,
  },
  fileFilter: (req, file, callback) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    allowedMimes.includes(file.mimetype) ? callback(null, true) : callback(new Error('Invalid file type.'));
  },
};