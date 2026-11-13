import { Router } from "express";
import { authmiddleware } from "../middleware/auth.middleware.js";
import { createTransaction } from "../controller/transaction.controller.js";


const router=Router()

router.route("/").post(authmiddleware,createTransaction)


export default router