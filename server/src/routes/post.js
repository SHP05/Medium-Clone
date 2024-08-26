const express = require('express');
const router = express.Router();
const {
  createPost,
  getUserPost,
  DeletePost,
  UpdatePost,
  getPost,
  getAllPost,
  AddLikes,
  SearchPost,
  UploadPostCoverImage,
} = require('../controllers/post');
const { authenticateToken } = require('../middleware/auth');

router.post('/createpost/:id', createPost);
router.put('/updatepost', UpdatePost);
router.delete('/deletepost/:id', DeletePost);
router.get('/getuserpost/:id', authenticateToken, getUserPost);
router.get('/getpost/:id', getPost);
router.get('/getallpost', getAllPost);
router.put('/addlikes/', AddLikes);
router.get('/search/', SearchPost);
router.put('/uploadcoverimg/:pid', UploadPostCoverImage);

module.exports = router;
