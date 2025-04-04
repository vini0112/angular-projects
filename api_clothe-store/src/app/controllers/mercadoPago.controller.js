
import client from "../config/mercadoPagoConfig.js";
import { Preference } from "mercadopago";


const preference = new Preference(client)

const createPayment = async (req, res) =>{
    try{
        const {title, price, quantity} = req.body
        
        preference.create({
            body:{
                items:
                [
                    {
                        id: String,
                        title,
                        quantity: Number(quantity),
                        unit_price: Number(price),
                        currency_id: 'BRL'
                    }
                ],

                back_urls: {
                    success: "http://localhost:4200/success",
                    failure: "http://localhost:4200/failure",
                    pending: "http://localhost:4200/pending",
                },

                auto_return: "approved",
            }
            
    
        })
        .then(console.log)
        .catch(console.log)
    }
    
    catch(error){

    }

}

export default createPayment;


// const createPayment = async (req, res) =>{
//     try{
//         const {title, price, quantity} = req.body


//         const preference = new Preference(client)
//         const response = await preference.create({


//             body:{
//                 items: [
    
//                     {
//                         title,
//                         quantity: Number(quantity),
//                         unit_price: Number(price),
//                         currency_id: 'BRL'
//                     }
//                 ],
//                 back_urls: {
//                     success: "http://localhost:4200/success",
//                     failure: "http://localhost:4200/failure",
//                     pending: "http://localhost:4200/pending",
//                 },
//                 auto_return: 'approved'
//             }

//         })

        

//         res.json({ id: response.id});

//     }catch(error){
//         res.status(500).json({ error: error.message });
//     }
// }

// export default createPayment;
