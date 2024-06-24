import {User} from "../models/user.js"

const loadUser=(req,res)=>{
    
    User.findById(req.user._id).then((user)=>{
        res.render("index",{user})
    })
    

}


const getTask=(req,res)=>{
    const {name,description}=req.body;
    User.findByIdAndUpdate(req.user._id,{
            $push:{task:{
                name,
                description
            }}

    },{new:true}).then(()=>{
        console.log("task added");
        res.redirect("/")
    
    })
        .catch((e)=>{
            console.log(e)
        })

}

const deleteTask=(req,res)=>{
   
    const {taskId}=req.params 

    User.findByIdAndUpdate(req.user._id,{
        $pull:{
            task:{ _id:taskId}
           
        }
    },{new:true}).then(()=>{
        
        console.log("task removed")
        res.redirect("/")
    })

   .catch((e)=>console.log(e))
}

export {loadUser,getTask,deleteTask}