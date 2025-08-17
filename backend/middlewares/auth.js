import jwt from "jsonwebtoken"

const authMiddleware = async(req,res,next) =>{
    const {token} = req.headers;
    if(!token){
        return res.json({success:false, message:"Not authorized Login again"})
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        
        // Ensure req.body exists
        if (!req.body) {
            req.body = {};
        }
        
        req.body.userId = token_decode.id;
        // Adds it to request body so controllers can use it
        next();
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

export default authMiddleware;