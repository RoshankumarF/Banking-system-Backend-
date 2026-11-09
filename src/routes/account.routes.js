import express , {Router} from "express"
import { authmiddleware } from "../middleware/auth.middleware.js"
import { createAccount } from "../controller/account.controller.js"

const router=Router()


router.route("/create-account").post(authmiddleware,createAccount)
export default router

