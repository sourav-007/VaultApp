const express = require('express');
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose')
const GridFSBucket = require('mongodb').GridFSBucket;
const methodOverride = require('method-override');
const cors = require('cors')



const app = express();
dotenv.config({
    path: '../.env'
})
 
// configuration
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));
app.use(cookieParser())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))



// Mongo URI
const mongoURI = process.env.MONGO_URL;

// Create mongo connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const conn = mongoose.connection;

conn.on('connected', () => {
    console.log('Mongoose connected to the database');
});

conn.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

conn.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Init GridFSBucket
let gfs;
conn.once('open', () => {
    gfs = new GridFSBucket(conn.db, { bucketName: 'uploads' });

    // Import controller here and pass `gfs`
    const fileController = require('./controllers/fileController');
    fileController.setGfs(gfs);
});


// Routes Register
const userRouter = require('./routes/userRouter.js');
const fileRouter = require('./routes/fileRouter.js')


app.get('/', (req, res) => {
    res.send("This is home page");
});

app.use('/vault/users',userRouter)
app.use('/vault/files', fileRouter)




app.listen( process.env.PORT, () => {
    console.log(`Server is running at port : ${process.env.PORT}`);
});