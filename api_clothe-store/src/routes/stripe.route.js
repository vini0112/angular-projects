
import express from 'express'
import Router from 'express'
import stripeController from '../app/controllers/stripe.controller.js';
import verifyJWT from "../middleware/verifyJWT.js";


const router = Router()



router.post('/stripeCheckout', verifyJWT, express.raw({ type: 'application/json' }),stripeController.checkout)

router.post('/webhook',express.raw({ type: 'application/json' }), stripeController.webHook)

router.post('/checkPaymentStatus', stripeController.checkPaymentStatus)





export default router;
