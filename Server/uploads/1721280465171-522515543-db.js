// const mongoose = require('mongoose');

// const connect_db = async () => {
//     try {
//         await mongoose.connect('mongodb+srv://souravsahafiemmca22:vault123@cluster0.r43uyok.mongodb.net/vault');
//         console.log("DB running");
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//     }
// };

// module.exports = connect_db;

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