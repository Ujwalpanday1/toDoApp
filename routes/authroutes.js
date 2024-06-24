// importing
import express from "express"
import {loadLogin,redirect,logout,loadSignup,redirectVerify,loadVerify,usernameVerified,loadDetails,putDetails} from "../controllers/authController.js"
const router=express.Router()

router.get("/login",loadLogin);
router.post("/login",redirect);
router.get("/logout",logout);
router.get("/signup",loadSignup);
router.post("/signup",redirectVerify);
router.get("/verify",loadVerify);
router.post("/verify",usernameVerified);
router.get("/details",loadDetails)
router.post("/details",putDetails)
export default router
