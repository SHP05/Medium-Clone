const jwt = require("jsonwebtoken");
const Secret = process.env.SECRETKEY;
const validator = require('validator');

const authenticateToken = (req,res,next) =>{
    // retrive Token from header
    const authHeader  = req.headers['authorization'];
    console.log(authHeader);
    let token;

    // get Received Token
    if(authHeader) token = authHeader.split(' ')[1];

    // Bypass middleware if path is 'user/login'
    if(req.path === 'user/login') next();

    // Token exist then provide access or not
    else if(token && !validator.isEmpty(token)){
        // validate token and secrete key
        jwt.verify(token,Secret,(error,decode)=>{
            if(error){
                res.status(401).json({ error: 'Authentication refused! Unauthorized action.' });
            }else{
                console.log("validated user");
                next();
            }
        })
    }else{
        res.status(401).json({error:"Unauthorized! You must be logged in to use this service!"});
        res.end();
    }
}

module.exports = { authenticateToken };