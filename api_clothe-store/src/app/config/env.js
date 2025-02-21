import env from 'env-var'
import dotenv from "dotenv";
dotenv.config();


const config = { 
    host: env.get('DB_HOST').required().asString(),
    port: env.get('DB_PORT').required().asInt(),
    user: env.get('DB_USER').required().asString(), 
    password: env.get('DB_PASSWORD').required().asString(),
    database: env.get('NAME').required().asString()
}

export default config
