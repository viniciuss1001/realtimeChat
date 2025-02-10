import express from "express";
import { checkAuth, loginController, logoutController, signupController, updateProfileControlle } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/signup", signupController)
router.post("/login", loginController)
router.post("/logout", logoutController)

router.put("update-profile", protectedRoute,updateProfileControlle)

router.get("/check", protectedRoute, checkAuth)

export default router