

import Router from 'express'
import checkout from '../app/controllers/stripe.controller.js';

const router = Router()


router.post('/stripeCheckout', checkout)



export default router;
