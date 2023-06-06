const User =require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req,res,next) =>{
    
    bcrypt.hash(req.body.password,10,(error,hashedPassword)=>{
        if (error) {
            res.json({
                error : error
            })
        }
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password:hashedPassword,
        })
        console.log(user);
        // return false;
        user.save()
        .then(user =>{
            res.json({
                message: 'user created successfully!'
            })
        })
        .catch(error => {
            res.json(
                {
                    message : error
                }
            )
        })
        
    });
}
const login = (req,res,next)=>{

                if(!req.body.email){
                    return res.json({
                        message : "email is required"
                    });
                }
                if(!req.body.password){
                    return res.json({
                        message : "password is required"
                    });
                }
                const email = req.body.email;
                const password = req.body.password;
                User.findOne({email:email})
                .then(user=>{
                    bcrypt.compare(password,user.password,function (err,result) {
                        if(err){
                           res.json({
                                error : err
                            })
                        }else{
                            let token  = jwt.sign({name:user.name},'verySecretValue',{expiresIn:'1h'})
                            res.json({
                                message: "Loged in successfully!",
                                token : token
                            });
                        }
                    })  
                })
                .catch(err=>{
                    res.json({
                        message : 'user not found'
                    });
                })
        
                
            
                };

module.exports = {
    register,
    login,
    
}