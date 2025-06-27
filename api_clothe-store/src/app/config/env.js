import env from 'env-var'
import dotenv from "dotenv";
dotenv.config();


const config = { 
    DB:{
        host: env.get('DB_HOST').required().asString(),
        port: env.get('DB_PORT').required().asInt(),
        user: env.get('DB_USER').required().asString(),  
        password: env.get('DB_PASSWORD').required().asString(),
        database: env.get('DB_NAME').required().asString()  
    },
    BACKEND_URL: env.get('BACKEND_URL').required().asString(),

    RESET_PASSWORD: {
        SECRET_RESET_PASSWORD: env.get('SECRET_RESET_PASSWORD').required().asString(),
        MY_EMAIL: env.get('MY_EMAIL').required().asString(),
        MY_PASSWORD: env.get('MY_PASSWORD').required().asString(),
        CLIENT_URL: env.get('CLIENT_URL').required().asString()
    },

    JWT: {
        SECRET_KEY: env.get('SECRET_KEY').required().asString(),
        REFRESH_TOKEN: env.get('REFRESH_TOKEN').required().asString(),
        EMAIL_OF_DEVELOPER: env.get('EMAIL_OF_DEVELOPER').required().asString(),
        ADM_ROLE: env.get('ADM_ROLE').required().asString(),
    },

    STRIPE: {
        STRIPE_SECRET_KEY: env.get('STRIPE_SECRET_KEY').required().asString(),
        STRIPE_PUBLIC_KEY: env.get('STRIPE_PUBLIC_KEY').required().asString(),
        STRIPE_SECRET_ID: env.get('STRIPE_SECRET_ID').required().asString(),
        STRIPE_SECRET_ENDPOINT: env.get('STRIPE_SECRET_ENDPOINT').required().asString(),

    },

    AUTH0: {
        AUTH0_DOMAIN: env.get('AUTH0_DOMAIN').required().asString(),
        AUTH0_CLIENT_ID: env.get('AUTH0_CLIENT_ID').required().asString(),
        AUTH0_CLIENT_SECRET: env.get('AUTH0_CLIENT_SECRET').required().asString(),
        AUTH0_CALLBACK_URL: env.get('AUTH0_CALLBACK_URL').required().asString(),
        API_AUTH0_ID: env.get('API_AUTH0_ID').required().asString(),
        API_AUTH0_AUDIENCE: env.get('API_AUTH0_AUDIENCE').required().asString(),
    }


    
}


export default config
