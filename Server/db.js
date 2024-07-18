const mongoose = require('mongoose');

async function main(){

    await mongoose.connect('mongodb+srv://souravsahafiemmca22:vault123@cluster0.r43uyok.mongodb.net/vault')

}

main().then(
    () => {
        console.log("Successfully Connected");
    }
).catch(
    (err) => {
        console.log(err);
    }
)


module.exports = mongoose;