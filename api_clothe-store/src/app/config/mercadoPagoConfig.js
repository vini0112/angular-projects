
import {Preference, MercadoPagoConfig} from 'mercadopago'


const client = new MercadoPagoConfig({
    access_token: process.env.MERCADO_ACCESS_TOKEN,
})


export default {client, Preference};
