
import stripe from "../config/stripe.config.js";
import stripeService from "../services/stripe.service.js";

const endpointSecret = process.env.STRIPE_SECRET_ENDPOINT


class stripeController{

    

    async checkout(req, res){ 

        try{
            const row = await stripeService.checkout_service(req.body)
            return res.json(row)
            
        }catch(error){
            res.status(404).json(error)
        }
    
    }


    async webHook(req, res){
        try{
            let event = req.body
            
            if(!event || !endpointSecret){
                return res.status(400).json({error: error.message, details: 'Error while validating event/endpointSecret in webhook controller!'});
            }

            const sig = req.headers['stripe-signature']
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)


            const row = await stripeService.webHook_service(event)
            res.json(row)
           
        }catch(err){
            console.log('Webhook problem: ', err.message)
            res.status(404).json(err)
        }
    }


    async checkPaymentStatus(req, res){

        try{
            const row = await stripeService.checkPaymentStatus_service(req.body)
            return res.json(row)
        }catch(err){
            res.status(404).json(err)
        }
        
    }


}




export default new stripeController();
