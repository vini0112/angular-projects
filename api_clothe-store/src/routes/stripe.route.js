
import express from 'express'
import Router from 'express'
import stripeController from '../app/controllers/stripe.controller.js';
import verifyJWT from "../middleware/verifyJWT.js";


const router = Router()



router.post('/stripeCheckout', verifyJWT, express.raw({ type: 'application/json' }),stripeController.checkout)


router.post('/checkPaymentStatus', express.raw({ type: 'application/json' }), stripeController.checkPaymentStatus)

// stripe listen --forward-to localhost:3000/webhook
router.post('/webhook',express.raw({ type: 'application/json' }), stripeController.webHook)




export default router;
