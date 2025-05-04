
import { Router } from "express";
import loginController from "../app/controllers/login.controller.js";
import protectedRoute from "../middleware/protected.route.js";

const router = Router()


// rota protegida
// router.get('/auth/user', loginController.protectedRoute)

router.post('/refreshToken', loginController.refreshToken)


// CHECKING IF IS LOGGED
router.get('/isLogged', loginController.isLogged)

// SIGN IN  
router.post('/entrando', loginController.entrando)



router.post('/addingUser', loginController.adding)

// LOG OUT
router.post('/auth/logout', loginController.logOut)

// RESETING PASSWORD
router.post('/request/reset', protectedRoute,loginController.requestToReset)

router.post('/reset-password', loginController.resetPassword)

router.get('/validatorTokenResetPassword/:token', loginController.validatorTokenResetPassword)


export default router;