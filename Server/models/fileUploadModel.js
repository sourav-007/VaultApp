const mongoose = require('../db');

const FileSchema = mongoose.Schema({
    fname : {
        type : String,
        //contentType : String
    }
})


const FileModel = mongoose.model('Files',FileSchema);

module.exports = FileModel