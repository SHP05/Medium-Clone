const express = require('express')
const router = express.Router();
const { createPost , getUserPost , DeletePost , UpdatePost , getPost , getAllPost , AddLikes , SearchPost } = require('../controllers/post');

router.post('/createpost/:id',createPost);
router.put('/updatepost',UpdatePost);
router.delete('/deletepost/:id',DeletePost);
router.get('/getuserpost/:id',getUserPost);
router.get('/getpost/:id',getPost);
router.get('/getallpost',getAllPost);
router.put('/addlikes/',AddLikes);
router.get('/search/',SearchPost);

// Upload post img

const multer = require('multer');
const path = require('path');
const Post = require('../model/postmodel');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const fpath = path.join(__dirname,'../../../clients/public/Images');
      cb(null,fpath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, file.originalname + uniqueSuffix )
    }
})
  
const upload = multer({ storage: storage })
// upload.single('file') , 
router.put("/uploadpostimg/:id",upload.single('file') ,async(req,res) =>{
    let id = req.params.id;
    let imgname = req.file.filename;
    console.log(id);
    console.log(imgname);
    try{
        const user = await  Post.findById({_id:id});
        if(user){
            await Post.findByIdAndUpdate({_id:id},{image:imgname})
            .then(result => {res.json({message:"Profile image Uploaded",data:result})})
            .catch(err => res.status(404).json(err));
        }
    }
    catch(err){
        res.json({message:"User Not Found",err});
    }
} 
)


module.exports = router;