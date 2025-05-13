
import Router from 'express'
import dashBoardController from '../app/controllers/dashboard.controller.js';

const router = Router()

router.get('/dashboard-data', dashBoardController.show)

export default router;