const mongoose = require('mongoose');

async function main(){

    await mongoose.connect('mongodb+srv://souravsahafiemmca22:vault123@cluster0.r43uyok.mongodb.net/vault')
    //await mongoose.connect(`${process.env.MONGO_URL}`)

}

main().then(
    () => {
        console.log("Successfully DB Connected");
    }
).catch(
    (err) => {
        console.log(err);
    }
)


module.exports = mongoose;