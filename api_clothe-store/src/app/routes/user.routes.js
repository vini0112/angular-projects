
import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router()


router.get('/user-info/:id', userController.getUserInfo)

router.put('/user-update/:id', userController.updateUserInfo)


export default router;