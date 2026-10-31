import express from "express"

import { userRegister } from "../controller/auth.controller.js"


const router=express.Router()


router.route("/register").post(userRegister)


export default router 