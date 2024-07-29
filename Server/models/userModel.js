const mongoose = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true
        },
        email : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true
        },
        fullName : {
            type : String,
            required : true,
            trim : true
        },
        password : {
            type : String,
            required : true
        },
        // refreshToken: {
        //     type: String
        // }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken =  function(){
    return jwt.sign(
        {
            _id : this._id,
            username : this.username,
            email : this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}





const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel