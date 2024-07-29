const express = require('express');
const { registerUser, loginUser, logoutUser, updateAccountDetails, changePassword } = require('../controllers/userController.js');
const  verifytJWT  = require('../middleware/auth.js');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifytJWT, logoutUser);
router.patch('/update-profile', verifytJWT, updateAccountDetails);
router.post('/change-password', verifytJWT, changePassword);





module.exports = router