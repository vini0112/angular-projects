
import express from "express"
import cors from 'cors'
import productRouter from "./app/routes/product_routes.js"
import loginRouter from "./app/routes/login.routes.js"
import cookieParse from 'cookie-parser'
import dashboardRouter from './app/routes/dashboard.routes.js'
import stripeRoute from './app/routes/stripe.route.js'
import userRouter from './app/routes/user.routes.js'
import multer from 'multer'


const app = express()


app.use(cors({
    origin: 'http://localhost:4200', 
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
app.use(userRouter)
app.use('/upload', express.static('upload')) 

app.use((err, req, res, next) =>{
    if(err instanceof multer.MulterError){
        return res.status(400).json({error: err.message})
    }else if(err){
        return res.status(400).json({error: err.message})
    }
    next()
})



export default app;

