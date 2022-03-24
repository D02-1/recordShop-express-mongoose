require('dotenv').config();
const jwt = require('jsonwebtoken')

const userAdmin = (req, res, next)=>{
    try{
        let token = req.cookies.access_token
        const verifiedUser = jwt.verify(token, process.env.SECRET_TOKEN);
        const admin = verifiedUser.admin
        if(admin === true){
            next();
        }else throw new Error("User not admin")
    }catch (err){
        next(err)
    }
   
}

module.exports=userAdmin


