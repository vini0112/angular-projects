
import Router from 'express'
import dashBoardController from '../app/controllers/dashboard.controller.js';

const router = Router()


router.get('/dashboard-data', dashBoardController.show)
router.get('/current-month', dashBoardController.getCurrentMonth)


router.patch('/new-month', dashBoardController.monthChanged)


export default router;

