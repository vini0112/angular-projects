
import express from "express"
import cors from 'cors'
import productRouter from "./routes/product_routes.js"
import loginRouter from "./routes/login.routes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(productRouter)
app.use(loginRouter)



export default app;

