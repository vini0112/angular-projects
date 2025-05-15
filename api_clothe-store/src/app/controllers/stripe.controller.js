

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
            let event = body.req

            if(endpointSecret){
                const sig = req.headers['stripe-signature']
                event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)

                const row = await stripeService.webHook_service(event)
                res.json(row)
            }
            else{
                return res.status(404).json({error: error.message, details: 'Error while validating webhook'});
            }
            

        }catch(err){
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
