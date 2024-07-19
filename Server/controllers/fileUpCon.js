const File = require('../models/fileUploadModel');

class FileUpCon
{
    static fileStore(req,res)
    {
        const url = req.protocol + '://' + req.get('host')
        const f = new File({
            fname : url + '/uploads/' + req.file.filename
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
                message: "File retrieved successfully!",
                userfile: data
            });
        });
     }
}



module.exports = FileUpCon;