import jwt from 'jsonwebtoken'
import {User} from '../models/user.model.js'


export const verifyJWT = async (req,res,next)=>{
    console.log(req.cookies.token);
    
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ","")
    console.log(`No token detected ${token}`);

    if(!token){
        console.log(`No token1 detected`);
        
        return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    try {
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET)

        const user = await User.findById(decodedToken?.userId).select("-password ")
        if(!user){
            console.log(`Before unauthorized user:- ${user}`);
            
            throw new Error("Unauthorized") 
        }
            req.user=user 
            console.log("req.user of the user consoled",req.user._id); 
             
            next()  
         
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
        
    }
  
}