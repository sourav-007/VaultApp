const express = require('express');
const upload = require('../middleware/fileUpload');
const router = express.Router();
const FC = require('../controllers/fileUpCon');

router.post('/fileupload', upload.single('fname'),FC.fileStore);

router.get('/showfile', FC.displayFile);


module.exports = router;