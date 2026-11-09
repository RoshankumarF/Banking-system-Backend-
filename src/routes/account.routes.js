import express , {Router} from "express"
import { authmiddleware } from "../middleware/auth.middleware.js"

const router=Router()


router.route("/").post(authmiddleware,)
export default router

