// importing 
import { User } from "../models/user.js"
import { configDotenv } from "dotenv"
import jwt from "jsonwebtoken"
import { sendCode } from "../utils/verificationCode.js";
import { generateSixDigitCode } from "../utils/codeGenerator.js";


configDotenv();
let code;
let username;

const loadLogin=(req,res)=>{
    res.clearCookie('token')
    res.render("login")
 
}


const redirect=(req,res)=>{
    const {username,password}=req.body
    User.findOne({username}).then((user)=>{
        if(user.password==password){
            const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);
            
            res.cookie("token",token,{
                maxAge:30 * 24 * 60 * 60 * 1000,
                httponly:true
            })
            res.redirect("/")
        }
        else
        res.redirect("/login")
    })
    .catch(()=>res.redirect("/login"))
    
}

const logout=(req,res)=>{
    res.clearCookie("token")
    res.redirect("/login")
}

const loadSignup=(req,res)=>{
    res.clearCookie("token");
    res.render("signup",{alertMsg:""})
}

const redirectVerify=(req,res)=>{
    username=req.body.username;
    User.findOne({username}).then((user)=>{
        if(user){
            console.log("username already taken")
             res.render("signup",{alertMsg:"Username already taken"})
        }
       else{
        code=generateSixDigitCode()
        sendCode(username,code)
        res.redirect("/verify")
       }
      
    }).catch((e)=>{
    res.redirect("/signup");
    console.log(e)
    })
}
const loadVerify=(req,res)=>{
    res.render("verify",{alertMsg:""});
}

const usernameVerified=(req,res)=>{
    
    const userCode=req.body.code
    if(userCode==code){
        console.log("code verified");
        res.redirect("/details")
    }
    else{
        res.render("verify",{alertMsg:"Code not matched"})
    }
}
const loadDetails=(req,res)=>{
    res.render("details");
}


const putDetails=(req,res)=>{
    const {fName,lName,password}=req.body;
    User.create({
        fName,lName,username,password
    }).then((user)=>{
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);
            
            res.cookie("token",token,{
                maxAge:30 * 24 * 60 * 60 * 1000,
                httponly:true
            })
            res.redirect("/")
    }).catch((e)=>{
        console.log(e)
        res.redirect("/signup")
    })

}


export {loadLogin,redirect,logout,loadSignup,redirectVerify,loadVerify,usernameVerified,loadDetails,putDetails}