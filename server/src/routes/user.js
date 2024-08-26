const {
  GetUserData,
  UpdateUser,
  updateUSerImg,
  savePost,
  unSavePost,
  getSavedPost,
} = require('../controllers/user');
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

router.get('/getuser/:id', authenticateToken, GetUserData);
router.put('/userupdate/:id', UpdateUser);
router.put('/savepost/:id', savePost);
router.put('/unsavepost/:id', unSavePost);
router.get('/savedpost/:id', authenticateToken, getSavedPost);
router.put('/uploadimg/:id', updateUSerImg);

module.exports = router;
