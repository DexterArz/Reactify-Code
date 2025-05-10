import {User} from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';




const signup = async (req,res)=>{
    const {email,password,username} = req.body;
    try {
        if(!email || !password|| !username){
            throw new Error("Please provide all the fields")
        }

        const ExistedUser = await User.findOne({email});
        if(ExistedUser){
            return res.status(400).json({success:false,message:`user already exists`})
        }
        const hashedPassword = await bcryptjs.hash(password,10);

        const user = new User({
            email,
            password:hashedPassword,
            username,

        })

        await user.save();
        console.log("Created User :", user);
        
        generateTokenAndSetCookie(res,user._id)


        return res.status(201).json({success:true,message:"User created successfully",user:{
            ...user._doc,password:undefined
        }})
    } catch (error) {
        return res.status(400).json({success:false,message:error.message})
    }
}

const login = async (req,res)=>{
    const {email,password} = req.body;

    try {
        const user = await User.findOne({email})
        if(!user){
            throw new Error("Invalid credentials")
        }

        const isPasswordCorrect = await bcryptjs.compare(password,user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({success:false,message:"Invalid credentials"})
        }

        generateTokenAndSetCookie(res,user._id)
        
        await user.save()

        return res.status(200).json({success:true,message:"Logged in successfully",user:{
            ...user._doc,password:undefined
        }})
        
    } catch (error) {
        return res.status(400).json({success:false,message:error.message})
        
    }
}

const logout = async (req,res)=>{
    res.clearCookie("token")
    res.status(200).json({success:true,message:"Logged out successfully"})
}

const userFiles = async(req,res)=>{
    const {_id} = req.user

    try {
        const user = await User.findOne({_id})
        console.log(`user in userFiles ${user}`);
    
        res.status(200).json({files:user?.files})
    } catch (error) {
        res.status(404).json({message:`something went wrong while fetching files`})
    }
}


const currentUser = async(req,res)=>{
    const user = req.user
    try {
        if(!user){
            return res.status(404).json({success:false,message:"User not found"})
        }
        return res.status(200).json({success:true,user:{
            ...user._doc,password:undefined
        }})
    } catch (error) {
        return res.status(400).json({success:false,message:error.message})
    }
}

export {
    signup,
    login,
    logout,
    userFiles,
    currentUser
}