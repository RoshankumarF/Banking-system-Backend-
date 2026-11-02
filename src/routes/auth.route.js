import express from "express"

import { userLogin, userRegister } from "../controller/auth.controller.js"


const router=express.Router()


router.route("/register").post(userRegister)

router.route("/login").post(userLogin)


export default router 