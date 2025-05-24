
import Router from 'express'

import dashBoardController from '../controllers/dashboard.controller.js';


const router = Router()

router.get('/dashboard-data', dashBoardController.showDashboardData)

router.get('/dashboard-users', dashBoardController.showDashboardUsers)

router.delete('/dashboard-delete/:id', dashBoardController.deleteUserById)

export default router;