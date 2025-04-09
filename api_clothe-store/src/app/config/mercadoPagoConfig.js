
import {MercadoPagoConfig} from 'mercadopago'
import { Order } from 'mercadopago';

const client = new MercadoPagoConfig({
    access_token: process.env.MERCADO_ACCESS_TOKEN,
    options: { timeout: 5000 }
})


const order = new Order(client);

export default order;
