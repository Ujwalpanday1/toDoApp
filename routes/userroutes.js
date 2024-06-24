import {Router} from "express"
import {loadUser,getTask,deleteTask} from "../controllers/userController.js"
import {isAuthenticated} from "../middlewares/auth.js"


const router=Router();
router.get("/",isAuthenticated,loadUser);
router.post("/addTask",isAuthenticated,getTask);
router.post("/delete/:taskId",isAuthenticated,deleteTask);
export default router;