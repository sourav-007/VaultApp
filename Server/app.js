const express = require('express');
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser");
const app = express();
dotenv.config({
    path: '../.env'
})
 
// configuration
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/uploads', express.static('uploads'))
app.use(cookieParser())
const cors = require('cors')
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))



// Routes Register
const uploadRoute = require('./routes/fileroutes.js');
const userRouter = require('./routes/userRouter.js');







app.get('/', (req, res) => {
    res.send("This is home page");
});

app.use('/home',uploadRoute);

app.use('/vault/users',userRouter)











app.listen( process.env.PORT, () => {
    console.log(`Server is running at port : ${process.env.PORT}`);
});