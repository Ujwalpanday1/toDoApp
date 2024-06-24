import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
configDotenv()
const sendCode=(username,code)=>{

    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
            
        }
    })

const mailOptions={
    from: process.env.EMAIL_USER,
    to: username,
    subject: 'verificationCODE',
    text:"your verification for todolist app is "+code ,
}

transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
       return console.log("code not sent")
    }
    console.log("code sent ")
})

}
export {sendCode}