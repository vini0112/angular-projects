
import express from "express"
import cors from 'cors'
import productRouter from "./routes/product_routes.js"
import loginRouter from "./routes/login.routes.js"
import cookieParse from 'cookie-parser'
import dashboardRouter from './routes/dashboard.routes.js'

import stripeRoute from './routes/stripe.route.js'

const app = express()

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // ou '*'
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//     if (req.method === 'OPTIONS') {
//       return res.sendStatus(200); // ✅ Responde OK e encerra o preflight
//     }

//     next(); // segue para a rota real
// });


app.use(cors({
    origin: 'http://localhost:4200', // url front
    credentials: true ,// allowing cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// app.options("*", cors()) 


app.use(stripeRoute)

app.use(express.json())
app.use(cookieParse())

app.use(loginRouter)
app.use(productRouter)
app.use(dashboardRouter)

app.use('/upload', express.static('upload')) 



export default app;

