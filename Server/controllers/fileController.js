//controllers/filecontroller
const mongoose = require('mongoose');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');


let gfs;

exports.setGfs = (gridFSBucket) => {
  gfs = gridFSBucket;
};

exports.getFiles = (req, res) => {
  console.log("get files executed");

  if (!gfs) {
    throw new ApiError(500, "Error : GridFSBucket not initialized")
  }
  gfs.find().toArray((err, files) => {
    if (err) {
      throw new ApiError(500, "err : Error retrieving files")
    }
    if (!files || files.length === 0) {
      throw new ApiError(404, "err : No files exist")
      // res.render('index', { files: false });
    } else {
      files.map(file => {
        file.isImage = file.contentType.startsWith('image/');
        file.isText = file.contentType.startsWith('text/');
        file.isPDF = file.contentType === 'application/pdf';
        file.isOther = !file.isImage && !file.isText && !file.isPDF;
      });
      // res.render('index', { files: files });
      return res
      .status(200)
      .json(
        new ApiResponse(200,{files},"Got files")
      )
    }
  });
};

exports.uploadFile = (req, res) => {
  console.log("upload executed");

  if (!req.file) {
    throw new ApiError(400,"Error : No file uploaded")
  }
  
  return res
  .status(200)
  .json(
    new ApiResponse(200, 
      {
        file : req.file
      },
      "file uploaded successfully")
  )

};

exports.getAllFiles = (req, res) => {
  console.log("get all files executed");

  if (!gfs) {
    throw new ApiError(500, "Error : GridFSBucket not initialized")
  }
  gfs.find().toArray((err, files) => {
    if (err) {
      throw new ApiError(500, "err : Error retrieving files")
    }
    if (!files || files.length === 0) {
      throw new ApiError(404, "err : No files exist")
    }
    
    return res
    .status(200)
    .json(
      new ApiResponse(200,{files},"Got all files")
    )

  });
};

exports.getFileByName = (req, res) => {
  console.log("get files by name executed");

  if (!gfs) {
    throw new ApiError(500, "Error : GridFSBucket not initialized")
  }
  gfs.find({ filename: req.params.filename }).toArray((err, file) => {
    if (err) {
      throw new ApiError(500, "err : Error retrieving files")
    }
    if (!file || file.length === 0) {
      throw new ApiError(404, "err : No files exist")
    }
    
    return res
    .status(200)
    .json(
      new ApiResponse(200,file[0],"Got file by name")
    )

  });
};

exports.downloadFile = (req, res) => {
  if (!gfs) {
    throw new ApiError(500, "Error : GridFSBucket not initialized")
  }
  gfs.find({ filename: req.params.filename }).toArray((err, file) => {
    if (err) {
      throw new ApiError(500, "err : Error retrieving files")
    }
    if (!file || file.length === 0) {
      throw new ApiError(404, "err : No files exist")
    }

    const readstream = gfs.openDownloadStreamByName(file[0].filename);
    readstream.on('error', (error) => {
      res.status(500).json({ err: 'Error reading file' });
    });
    readstream.pipe(res);
  });
};

exports.deleteFile = (req, res) => {
  console.log("delete files executed");

  if (!gfs) {
    throw new ApiError(500, "Error : GridFSBucket not initialized")
  }
  gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err) => {
    if (err) {
      throw new ApiError(500, "err : Error retrieving files")
    }

    return res
    .status(200)
    .json(
      new ApiResponse(200,{},"File deleted")
    )

  });
};
