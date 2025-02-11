
import { Router } from "express";
import loginController from "../app/controllers/login.controller.js";

const router = Router()


router.get('/allUsers/', loginController.showAll)
router.get('/allUsers/:id', loginController.getById)

router.post('/allUsers', loginController.creatingUser)

export default router;