const { GetUserData , UpdateUser , savePost , unSavePost , getSavedPost} = require("../controllers/user");    //, SetProfileImg ,upload
const express = require('express') 
const router = express.Router()

// //Get user data and send token in home page
router.get("/getuser/:id",GetUserData);
router.put("/userupdate/:id",UpdateUser);
router.put("/savepost/:id",savePost);
router.put("/unsavepost/:id",unSavePost);
router.get("/savedpost/:id",getSavedPost);

// //SAVE filE
const User = require("../model/usermodel");
const multer = require('multer');
const path = require('path');


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
router.put("/uploadimg/:id",upload.single('file') ,async(req,res) =>{
    let id = req.params.id;
    let imgname = req.file.filename;
    console.log(id);
    console.log(imgname);
    try{
        const user = await  User.findById({_id:id});
        if(user){
            await User.findByIdAndUpdate({_id:id},{img:imgname})
            .then(result => {res.json({message:"Profile image Uploaded",data:result})})
            .catch(err => res.status(404).json(err));
        }
    }
    catch(err){
        res.json({message:"User Not Found",err});
    }
} 
)
// router.put("/uploadimg/:id", upload.single('file'),SetProfileImg);

module.exports = router;