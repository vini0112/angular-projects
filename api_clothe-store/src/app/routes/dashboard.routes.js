
import Router from 'express'
import dashBoardController from '../controllers/dashboard.controller.js';

const router = Router()

router.get('/dashboard-data', dashBoardController.showDashboardData)

export default router;