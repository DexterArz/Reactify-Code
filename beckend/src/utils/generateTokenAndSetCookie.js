import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res,userId) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
    console.log(`Token generated: ${token}`);
    

    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        maxAge:6*24*60*60*1000
    })
    return token
}

