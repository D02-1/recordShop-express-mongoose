
exports.requestLogger = (req, res, next)=>{
    console.log("Request Method", req.method);
    console.log("Request URL", req.url);
    console.log("Time", Date.now())
    next()
}