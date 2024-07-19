const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    const uniquefn = file.originalname.toLowerCase().split(' ').join('-');
    cb(null,Date.now()+'_'+uniquefn);
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize : 15 * 1024 * 1024,
  }
})


module.exports = upload;