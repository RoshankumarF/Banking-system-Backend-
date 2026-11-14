import { Router } from "express";
import { authmiddleware, systemUserMiddleware } from "../middleware/auth.middleware.js";
import { createTransaction ,createIntialFundsTrans } from "../controller/transaction.controller.js";


const router=Router()

router.route("/").post(authmiddleware,createTransaction)

router.route("/system/initial-funds").post(systemUserMiddleware,createIntialFundsTrans)
export default router