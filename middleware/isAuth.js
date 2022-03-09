require('dotenv').config();
const jwt = require('jsonwebtoken')

const userAuth = (req, res, next)=>{
    try{
        // jwt is send in Header (POSTMAN or Thunder Client)
        // Key ist authorization (req.headers.authorization) value: Bearer token
        let token = req.headers.authorization.split(' ')[1];
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