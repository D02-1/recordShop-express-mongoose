const userAdmin = (req, res, next)=>{
    try{
        console.log(req.body);
        if(req.body.admin){
            console.log(req.body);
            next();
        }else throw new Error("User not admin")
    }catch (e){
        next(e)
    }
   
}

module.exports=userAdmin