
import { Router } from "express";
import userController from "../controllers/user.controller.js";
import protectedRoute from "../middleware/protected.route.js";

const router = Router()


router.get('/user-info', protectedRoute, userController.getUserInfo)

router.put('/user-update',protectedRoute ,userController.updateUserInfo)


export default router;