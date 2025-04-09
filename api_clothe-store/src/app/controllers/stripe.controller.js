
import { request } from "express";
import stripe from "../config/stripe.config.js";
import connection from '../database/connection.js'

const checkout = async(req, res) =>{


    const {products} = req.body

    const my_domain = 'http://localhost:4200'
    
    const productsID = products.map(product => product.id)

    // 01 GETTING PRODUCTS FROM DB
    const [rows] = await connection.promise().execute(
        `SELECT id, name, price FROM clothes WHERE id IN (${productsID.map(() => '?').join(',')})`,productsID
    );


    // TAKING AMOUNT       
    const amount = rows.reduce((total, pro) => total + pro.price,0)
    


    try{

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'brl',
            automatic_payment_methods: {
                enabled: true,
            },

        })

        return res.json({
            clientSecret: paymentIntent.client_secret,
            amount: amount
        }) 

    }catch(error){
        console.log(error)
        res.status(400).json({error: error})
    }

}


export default checkout;
