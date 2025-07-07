
import Router from 'express'
import verifyJWT from "../middleware/verifyJWT.js";
import dashBoardController from '../controllers/dashboard.controller.js';
import protectedRoute from '../middleware/protected.route.js';


const router = Router()

router.get('/dashboard-data', dashBoardController.showDashboardData)

router.get('/dashboard-users', dashBoardController.showDashboardUsers)

router.delete('/dashboard-delete/:id', protectedRoute ,dashBoardController.deleteUserById)

export default router;