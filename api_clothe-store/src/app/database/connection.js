import mysql from 'mysql2'
import config from '../config/env.js'

const connection = mysql.createConnection({
    host: config.host,//process.env.DB_HOST
    user:config.user, //process.env.DB_USER 3306
    port:config.port, //process.env.DB_PORT
    password:config.password,//process.env.DB_PASSWORD
    database:config.database //process.env.DB_NAME 
}) 




export const consulta = (sql, valores='', mensagemReject) =>{

    return new Promise((resolve, reject) =>{
        connection.query(sql, valores, (error, result) =>{
                    
            if(error) return reject(mensagemReject)
                                        
            const row = JSON.parse(JSON.stringify(result))
            return resolve(row)
        })
    })
}




export default connection;
