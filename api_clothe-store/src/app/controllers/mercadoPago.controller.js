
import { Preference } from "mercadopago";
import  connection from '../database/connection.js'
import order from '../config/mercadoPagoConfig.js'


// const preferenceOF = new Preference(client)

const createPayment = async (req, res) =>{

    

    const {products} = req.body
    // console.log(JSON.stringify(products))
    
    const productsID = products.map(product => product.id)

    // 01 GETTING PRODUCTS FROM DB
    const [rows] = await connection.promise().execute(
        `SELECT id, name, price FROM clothes WHERE id IN (${productsID.map(() => '?').join(',')})`,productsID
    );

    // 02 PASS THE PRODUCT TO MERCADO PAGO
    const ITEMS = products.map(item => {
        const product = rows.find(p => p.id === item.id)

        if(!product) throw new Error(`Produto ${item.productId} não encontrado`)
        
        return {
            title: product.name,
            quantity: item.quantity,
            unit_price: parseFloat(product.price),
            currency_id: 'BRL'
        }
        
    })

    
    


        // console.log(preference)
        // const response = await mercadopago.preferences.create(preference) 
        // const response = await preferenceOF.create(preference) 
    try{
        const body = {
            
            type: "online",
	        processing_mode: "automatic",
            payer: {
                email: "viniloqsilva@gmail.com",
            },
            transactions: {
                payments: [
                    {
                        amount: "1000.00",
                        payment_method: {
                            id: "master",
                            type: "credit_card",
                            token: "<CARD_TOKEN>",
                            installments: 1,
                            statement_descriptor: "Store name",
                        },
                    }
                ]
            },
            
            
            back_urls: {
                success: "http://localhost:4200/success",
                failure: "http://localhost:4200/failure",
                pending: "http://localhost:4200/pending",
            },
            auto_return: "approved",
            
        }   
        const response = await order.create({ body });
        console.log(response);
        res.json(response);
        // order.create({body}).then(console.log).catch(console.log)
    }
    
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar preferência' });
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
