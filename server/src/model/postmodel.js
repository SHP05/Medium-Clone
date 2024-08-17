const mongoose = require('mongoose')
const { Schema } = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String },
    shortDesc: { type: String, required: true },
    likes: {
      type: [String], //here define PostId as array of postIds
      default: [],
    },
    image: { type: String },
    catagory: { type: String },
    postDate: { type: Date, default: Date.now },
    userId: { type: String },
    userName: { type: String },
    userImage: { type: String },
  },
  { timestamp: true }
);

module.exports = mongoose.model('Post', postSchema);
