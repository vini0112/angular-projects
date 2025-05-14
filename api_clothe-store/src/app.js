
import express from "express"
import cors from 'cors'

import productRouter from "./app/routes/product_routes.js"
import loginRouter from "./app/routes/login.routes.js"
import cookieParse from 'cookie-parser'
import dashboardRouter from './app/routes/dashboard.routes.js'

import stripeRoute from './app/routes/stripe.route.js'

const app = express()


app.use(cors({
    origin: 'http://localhost:4200', // url front
    credentials: true ,// allowing cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH' ,'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))



app.use(stripeRoute)

app.use(express.json())
app.use(cookieParse())

app.use(loginRouter)
app.use(productRouter)
app.use(dashboardRouter)

app.use('/upload', express.static('upload')) 



export default app;

