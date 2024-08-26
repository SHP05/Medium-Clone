const User = require('../model/usermodel');
const posts = require('../model/postmodel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const GetUserData = async (req, res) => {
  const id = req.params.id;
  await User.findById(id)
    .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch((err) => res.json(err));
};

const UpdateUser = async (req, res, next) => {
  const id = req.params.id;
  await User.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      desc: req.body.desc,
    }
  )
    .then((result) =>
      res
        .status(200)
        .json({ message: 'User Data Updated Successfully !', data: result })
    )
    .catch((err) => res.status(404).json(err));
};

// Save posts
const savePost = async (req, res, next) => {
  let uid = req.body.id;
  let PostId = req.body.pid;
  const user = await User.findById({ _id: uid });
  if (user.savePost.includes(PostId)) {
    await User.findByIdAndUpdate(
      { _id: uid },
      { $pull: { savePost: PostId } },
      { new: true } // return the modified array
    )
      .then((result) => {
        res.status(200).json({ message: 'Post UnSaved', data: result });
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    await User.findByIdAndUpdate(
      { _id: uid },
      { $push: { savePost: PostId } },
      { new: true } // return the modified array
    )
      .then((result) => {
        res.status(200).json({ message: 'Post Saved', data: result });
      })
      .catch((err) => {
        res.json(err);
      });
  }
};

const unSavePost = async (req, res, next) => {
  let uid = req.body.id;
  let PostId = req.body.pid;
  const user = await User.findById({ _id: uid });
  if (user) {
    await User.findByIdAndUpdate(
      { _id: uid },
      {
        $pull: { savePost: PostId }, // Delete the number if it exists
        // $push : {savePost : PostId}
        // {$addToSet: { savePost: PostId }}, // Add Id if Not exist
      },
      { new: true, upsert: true } // return the modified array
    )
      .then((result) => {
        res.status(200).json({ message: 'Post Removed', data: result });
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    res.json({ message: "User Doesn't Exist" });
  }
};

//get Saved post
const getSavedPost = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById({ _id: id });
  try {
    const userPosts = user.savePost;
    const Data = {
      _id: { $in: userPosts },
    };

    const result = await posts.find(Data);
    res.status(200).json({ result, message: 'Saved Posts Recieved' });
  } catch (err) {
    res.json(err);
    console.log(err);
  }
};

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

async function updateUSerImg(req, res) {
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

module.exports = {
  GetUserData,
  UpdateUser,
  updateUSerImg,
  savePost,
  unSavePost,
  getSavedPost,
};
