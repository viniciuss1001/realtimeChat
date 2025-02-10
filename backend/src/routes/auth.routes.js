import express from "express";
import { loginController, logoutController, signupController, updateProfileControlle } from "../controllers/auth.controller.js";

const router = express.Router()

router.post("/signup", signupController)
router.post("/login", loginController)
router.post("/logout", logoutController)

router.put("update-profile", updateProfileControlle)

export default router