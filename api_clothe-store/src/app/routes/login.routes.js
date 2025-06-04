
import { Router } from "express";
import loginController from "../controllers/login.controller.js";
import protectedRoute from "../middleware/protected.route.js";
import {verifyTokenFromBody} from "../middleware/auth0.js";

const router = Router()



router.post('/refreshToken', loginController.refreshToken)


// CHECKING IF IS LOGGED
router.get('/isLogged', loginController.isLogged)

// SIGN IN  
router.post('/entrando', loginController.entrando)

// AUTH0 LOGIN
router.post('/auth0/token',verifyTokenFromBody ,loginController.login_auth0)


router.post('/addingUser', loginController.adding)

// LOG OUT
router.post('/auth/logout', loginController.logOut)

// RESETING PASSWORD
router.post('/request/reset',loginController.requestToReset)

router.post('/reset-password', loginController.resetPassword)

router.get('/validatorTokenResetPassword/:token', loginController.validatorTokenResetPassword)


export default router;