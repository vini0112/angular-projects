
import express from 'express'
import Router from 'express'
import stripeController from '../app/controllers/stripe.controller.js';
import bodyParser from 'body-parser';

const router = Router()


router.post('/stripeCheckout', express.raw({ type: 'application/json' }),stripeController.checkout)
router.post('/webhook',express.raw({ type: 'application/json' }), stripeController.webHook)


// router.post('/webhook', bodyParser.raw({type: "application/json"}), (req, res) =>{
//     console.log('called')
//     const sig = req.headers['stripe-signature']
//     let event;
//     console.log(event)
//     try{
//         event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
//     }catch(error){
//         console.error("Erro ao validar webhook:", error.message);
//         return res.status(400).send(`Webhook Error: ${error.message}`);
//     }

//     console.log("📦 Evento recebido:", event.type);

//     if(event.type === "payment_intent.succeeded"){
//         const paymentIntent = event.data.object;
//         console.log("✅ Pagamento bem-sucedido:", paymentIntent.id);
//     }

//     res.json({ received: true });
// })



export default router;
