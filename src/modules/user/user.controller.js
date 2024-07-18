import User from "../../../Database/models/user.model.js";

import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken"


import { ErrorHandlerClass } from "../../utilis/error-class.utilis.js";



//=============================================================== Sign up API====================================================================

/**
 * 
 * @param {object} req 
 * @param {object} res
 * @param {*object} next 
 * @returns {message,user}
 * @description create new user
 */

export  const signup =async(req,res,next)=>{

const { name,email,password}=req.body;
// email check
const isEmailExist=await User.findOne({email})

if(isEmailExist){
return next(new ErrorHandlerClass("Email already Exist",409,"error from signup controller",{email})) 
}
// hash pass
const hashedPassword = hashSync(password,10)

// user data
const userObject= {
    name,
    email,
    password:hashedPassword  
}
// create user
const user= await User.create(userObject)
// success response
res.status(201).json({message:"user created successfully",user})
    
}

//=============================================================== Signin API===========================================================================

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} {message ,token ,logged in user }
 * @description  login user
 */

export const signin=async (req,res,next)=>{
// destruct data
const {email,password}=req.body;
// check email 
const user=await User.findOne({email})
if(!user){
return next(new ErrorHandlerClass("Invalid login credentials",404,"error from signin controller")) 
}
// match password
const isMatch=compareSync(password,user.password)
if(!isMatch){
return next(new ErrorHandlerClass("Invalid login credentials",404,"error from signin controller")) 
}
// generate Token
const token=jwt.sign({userId:user._id,email:user.email},"task55555",{expiresIn:"2h"})

//success response
res.status(200).json({message:"user logged in successfully",token})

} 
