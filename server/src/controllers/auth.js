const User = require('../model/usermodel');
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const bodyparser = require('body-parser')

const Login = async (req, res) => {
        await User.findOne({ email: req.body.email }).then(user1 => {
            if (!user1) {
                return res.status(401).json({
                    message: "User Not Exist"
                })
            }
            fetchUser = user1;
            return bcrypt.compare(req.body.password, user1.password)
        }).then(result => {
            console.log(fetchUser);
            if (!result) {
                return res.status(401).json({
                    message: "Invalid Credentials!"
                })
            }
            const token = JWT.sign(
                { email: fetchUser.email, userId: fetchUser._id },
                process.env.SECRETKEY,
                { expiresIn: "6h" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 21600,
                userId: fetchUser._id,
                name: fetchUser.name,
                email:fetchUser.email
            });
        })
            .catch(e => {
                console.log(e)
            })
};

const SignUp =  async (req, res, next) => {
    await bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
            name: req.body.name,
        });

        User.findOne({ email: req.body.email }).then(user1 => {
            if (user1) {
                return res.status(401).json({
                    message: "User Already Exist"
                })
            }

            user.save().then(result => {
                if (!result) {
                    return res.status(500).json({
                        message: "Error Creating User Please try again"
                    })
                }

                res.status(201).json({
                    message: "User created Successfully!",
                    result: result
                });
            })
        })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    })
}

module.exports = { Login , SignUp };