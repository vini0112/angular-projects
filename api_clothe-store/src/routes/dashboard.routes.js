
import Router from 'express'
import dashBoardController from '../app/controllers/dashboard.controller.js';

const router = Router()


router.get('/dashboard-data', dashBoardController.show)

router.post('/purchase-made', dashBoardController.adding)

router.patch('/newMonth', dashBoardController.monthChanged)


export default router;

