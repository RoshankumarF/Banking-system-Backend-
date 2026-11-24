import express , {Router} from "express"
import { authmiddleware } from "../middleware/auth.middleware.js"
import { createAccount, getAccountBalance, getUserAccount } from "../controller/account.controller.js"

const router=Router()


router.route("/create-account").post(authmiddleware,createAccount)
router.route("/get-accounts").get(authmiddleware,getUserAccount)

router.route("/balance/:accountId").get(authmiddleware,getAccountBalance)
export default router

