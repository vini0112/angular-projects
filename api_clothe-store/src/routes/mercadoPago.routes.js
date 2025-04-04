
import {Router} from 'express'
import createPayment from '../app/controllers/mercadoPago.controller.js'
const router = Router()


router.post('create-payment', createPayment)

export default router;
