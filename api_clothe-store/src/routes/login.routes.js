
import { Router } from "express";
import loginController from "../app/controllers/login.controller.js";

const router = Router()


router.get('/allUsers/:id', loginController.getById)


// SIGN IN 
router.post('/entrando', loginController.entrando)

// SIGN UP
router.post('/emailValidation', loginController.validandoEmail)
router.post('/addingUser', loginController.adding)

export default router;