import jwt from 'jsonwebtoken'
import {User} from '../models/user.model.js'


export const verifyJWT = async (req,res,next)=>{
    try {
        let token;
        
        // Check for token in cookies
        if (req.cookies?.token) {
            token = req.cookies.token;
        }
        // Check for token in Authorization header
        else if (req.headers.authorization?.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required. Please login."
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from token
        const user = await User.findById(decoded.userId).select("-password");
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found or unauthorized"
            });
        }

        // Attach user to request object
        req.user = user;
        console.log("req.user of the user consoled",req.user._id); 
        next();  
    } catch (error) {
        console.error("Authentication error:", error.message);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token expired. Please login again."
            });
        }
        
        return res.status(500).json({
            success: false,
            message: "Authentication failed"
        });
    }
}