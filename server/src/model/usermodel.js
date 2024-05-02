const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{ 
        type: String , 
        require:true },
    password:{
        type:String , 
        reqired: true},
    email:{ 
        type:String , 
        require:true , 
        unique:true},
    img:{type:String ,
        default:""
    },
    desc:{
        type:String
    },
    savePost:{
        type:[String], //here define PostId as array of postIds
        default:[]
    }
    // creator:{ type: mongoose.Schema.Types.ObjectId , ref:"", required:true}
},{timestamp:true})

module.exports = mongoose.model('users',userSchema);