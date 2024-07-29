const asyncErrorHandler = require('../utils/asyncErrorHandler.js')
const ApiError = require('../utils/ApiError.js')
const UserModel = require('../models/userModel.js')
const jwt = require('jsonwebtoken')


const verifytJWT = asyncErrorHandler( async (req, res, next) => {

    try {
        //console.log('Cookies:', req.cookies);
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        //console.log("token:",token);
    
        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await UserModel.findById(decodedToken?._id).select("-password")
    
        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user  = user
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }

} )

module.exports = verifytJWT