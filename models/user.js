import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    fName:{
        type:"string",
        required:"true"
    },
    lName:{
        type:"string",
        required:"true"
    },
    username:{
        type:"string",
        required:"true",
        unique:true
    },
    password:{
        type:"string",
        required:"true",
        select:"false"
    },
    task:[{
        name:"string",
        description:"string",
    }]


})
const User=mongoose.model("User",userSchema);

export {User}