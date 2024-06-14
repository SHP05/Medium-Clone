const User = require("../model/usermodel")
const posts = require('../model/postmodel');
const multer = require('multer')

const GetUserData =async  (req, res, next) => {
    const id = req.params.id;
    await User.findById(id)
        .then(result => {
            res.json(result)
            // console.log(result);
        })
        .catch(err => res.json(err))
}

const UpdateUser = async(req,res,next)=>{
    const id = req.params.id;
    await User.findByIdAndUpdate({_id:id} , {
        name: req.body.name,
        desc:req.body.desc
    })
    .then(result => res.status(200).json({message: "User Data Updated Successfully !" , data: result}))
    .catch(err=> res.status(404).json(err))
}

//Upload user Profile image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../../../client/public/Images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname + '-' + uniqueSuffix)
    }
})
  
const upload = multer({ storage: storage })
// upload.single('file') , 
const SetProfileImg = async (req,res,next) =>{
    let id = req.params.id;
    let imgname = req.file.filename;
    const {FormData} = req.body
    console.log(FormData);
    const user = await  User.findById({_id:id});
    if(user){
        await user.updateOne({img:imgname})
        .then(result => {res.json({message:"Profile image Uploaded"})})
        .catch(err => res.status(404).json(err));
    }
    else{
        res.json({message:"User Not Found"});
    }
} 

// Save posts
const savePost = async (req,res,next) =>{
    let uid = req.body.id;
    let PostId = req.body.pid;
    const user =await User.findById({_id:uid});
    if(user.savePost.includes(PostId))
    {
        await User.findByIdAndUpdate({_id: uid} , 
            {$pull : {savePost : PostId}},
            {new : true}  // return the modified array
            )
        .then(result => {res.status(200).json({message:"Post UnSaved",data :result})})
        .catch(err => {res.json(err)});
    }
    else{
        await User.findByIdAndUpdate({_id: uid} , 
            {$push : {savePost : PostId}},
            {new : true}  // return the modified array
            )
        .then(result => {res.status(200).json({message:"Post Saved",data :result})})
        .catch(err => {res.json(err)});    }
}

const unSavePost = async (req,res,next) =>{
    let uid = req.body.id;
    let PostId = req.body.pid;
    const user = await User.findById({_id:uid});
    if(user)
    {
        await User.findByIdAndUpdate({_id: uid} , 
            {
                $pull: { savePost: PostId }, // Delete the number if it exists
                // $push : {savePost : PostId}
                // {$addToSet: { savePost: PostId }}, // Add Id if Not exist
            },
            {new : true , upsert: true}  // return the modified array
            )
        .then(result => {res.status(200).json({message:"Post Removed",data :result})})
        .catch(err => {res.json(err)});
    }
    else{
        res.json({message:"User Doesn't Exist"});
    }
}

//get Saved post
const getSavedPost = async(req,res)=>{
    const id = req.params.id;
    const user = await User.findById({_id:id});
    try{
        const userPosts = user.savePost;
        const Data = {
            "_id" : { "$in" : userPosts }
        }

        const result = await posts.find(Data)
        res.status(200).json({result, message: "Saved Posts Recieved"});
    }
    catch(err){
        res.json(err);
        console.log(err);
    }
}

module.exports = { GetUserData , SetProfileImg , upload , UpdateUser , savePost , unSavePost , getSavedPost};