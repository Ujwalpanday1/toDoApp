// importing 
import express from "express"
import {createServer} from "http"
import {connectDb} from "./config/database.js"
import bodyParser from "body-parser";
import authrouter from "./routes/authroutes.js"
import userrouter from "./routes/userroutes.js"
import cookieParser from "cookie-parser";


// creating server:
const app=express();
const server=createServer(app);


//connecting to database 
connectDb();



app.use(express.static('public'));

app.set('view engine', 'ejs')


// using middlewares 

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(cookieParser())

app.use("/",authrouter)

app.use("/",userrouter)


// listening to server
server.listen(5500,()=>{
    console.log("server running")
})

