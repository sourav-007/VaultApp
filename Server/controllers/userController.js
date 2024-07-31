const asyncErrorHandler = require('../utils/asyncErrorHandler.js')
const ApiError = require('../utils/ApiError.js')
const ApiResponse = require('../utils/ApiResponse.js')
const UserModel = require('../models/userModel.js')


const generateToken = async (userId) => {

    try {
        const user = await UserModel.findById(userId)
        const accessToken = user.generateAccessToken()
        //console.log("userId:", userId)
        console.log("AT : ", accessToken);

        return {accessToken}
    
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating access token")
    }
}

const registerUser = asyncErrorHandler( async (req,res) => {


    // res.status(200).json({
    //     message:"all okkk "
    // })

    const { username, email, fullName, password } = req.body;
    console.log("email :", email);

    console.log('Request body:', req.body);

    if ([username, email, fullName, password].some((field) => field?.trim() === "")) {
        
        throw new ApiError(400, "All fields are required")
    }

    const existedUser =  await UserModel.findOne({
        $or : [{ username },{ email }]
    })
    console.log("Existed User :", existedUser);

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const user = await UserModel.create({
        fullName,
        email, 
        password,
        username
    })
    

    const createdUser = await UserModel.findById(user._id).select("-password")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    ),

    console.log("registered");

})


const loginUser = asyncErrorHandler( async (req, res) => {

    const {email , password} = req.body;

    if(!email){
        throw new ApiError(400, "Email is required")
    }

    const user = await UserModel.findOne({email})

    if(!user){
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordVaild = await user.isPasswordCorrect(password)

    if(!isPasswordVaild){
        throw new ApiError(404, "Invalid Password")
    }
    
    const {accessToken} = await generateToken(user._id)
    console.log("AT after :", accessToken)

    const options = {httpOnly:true, secure:true}

    return res.status(200).cookie("accessToken", accessToken, options).json(
        new ApiResponse(200,
            {
                user: user , accessToken
            },
            "User logged In  successfully !!!"
            
        )
    ),

    console.log("login");


} )


const logoutUser = asyncErrorHandler( async (req, res) => {
    
    const options = {httpOnly:true, secure:true}

    return res.status(200)
    .clearCookie("accessToken",options)
    .json(new ApiResponse(200, {}, "User logged Out Successfully")), 
    
    console.log("logout");


} )


const changePassword = asyncErrorHandler( async (req,res) => {

    const { oldPassword , newPassword } = req.body

    const user = await UserModel.findById(req.user?._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully")),

    console.log("password changed");

} )

const updateAccountDetails = asyncErrorHandler(async(req, res) => {
    const {fullName, email} = req.body

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await UserModel.findByIdAndUpdate(
        req.user?._id,
        {
            $set: { fullName , email }
        },
        {new: true}
        
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully")),

    console.log("profile details updated");
});




module.exports = { registerUser, loginUser, logoutUser, changePassword, updateAccountDetails }