import mongoose from "mongoose"
import { configDotenv } from "dotenv";

configDotenv();

const connectDb=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"todolist",
       
        
    }).then(()=>console.log("database connected"))
    .catch((e)=>console.log(e));

}
export {connectDb}
