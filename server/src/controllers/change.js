const User = require('../model/usermodel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '../../Images/avatar');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dataPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

const uploadmiddleware = upload.single('file');

async function updateUSer(req, res) {
  try {
    await new Promise((resolve, reject) => {
      uploadmiddleware(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          reject({ status: 400, message: err });
        } else if (err) {
          reject({ status: 500, message: 'File Upload Fail !!' });
        } else {
          resolve();
        }
      });
    });

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imgName = req.file.filename;
    const id = req.params.id;

    const user = await User.findById({ _id: id });
    if (user) {
      const result = await User.findByIdAndUpdate(
        { _id: id },
        { img: imgName },
        { new: true }
      );
      return res.json({ message: 'Profile image Uploaded', data: result });
    } else {
      return res.status(404).json({ message: 'User Not Found' });
    }
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({ message: err.message });
    }
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: err });
  }
}
module.exports = { updateUSer };
