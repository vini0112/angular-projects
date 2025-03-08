
import { Router } from "express";
import loginController from "../app/controllers/login.controller.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = Router()


// rota protegida
router.get('/auth/user', loginController.protectedRoute)

router.post('/refreshToken', loginController.refreshToken)


// SIGN IN  
router.post('/entrando', loginController.entrando)


// SIGN UP verifyJWT,
router.post('/emailValidation', loginController.validandoEmail)
router.post('/addingUser', loginController.adding)

// LOG OUT
router.post('/auth/logout', loginController.logOut)

// RESETING PASSWORD
router.post('/request/reset', loginController.requestToReset)

router.post('/reset-password', loginController.resetPassword)

router.get('/validatorTokenResetPassword/:token', loginController.validatorTokenResetPassword)


export default router;