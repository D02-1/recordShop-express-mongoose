require('dotenv').config();
const jwt = require('jsonwebtoken')

const userAuth = (req, res, next)=>{
    try{
        // token is send in the cookie 
        let token = req.cookies.access_token
        const verifiedUser = jwt.verify(token, process.env.SECRET_TOKEN);
        console.log("verifiedUser", verifiedUser);
        req.tokenUser = verifiedUser.userId
        next();
    }
    catch (e){
        res.status(401).json({ 
            success:false,
            message: 'You are not logged in!' });
    }
}

module.exports=userAuth