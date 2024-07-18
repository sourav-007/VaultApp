const File = require('../models/fileUploadModel');

class FileUpCon
{
    static fileStore(req,res)
    {
        const f = new File({
            fname : req.file.filename
        });
        f.save().then(result => {
            res.status(200).json({
                message: "File upload successfully!",
                fileUploaded: {
                    fname: result.fname
                }
            })
        }).catch(err => {
            console.log(err);
                res.status(500).json({
                    error: err
                });
        })
    }

    static displayFile(req,res)
     {
        File.find().then(data => {
            res.status(200).json({
                message: "User list retrieved successfully!",
                userfile: data
            });
        });
     }
}



module.exports = FileUpCon;