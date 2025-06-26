import mysql from 'mysql2'
import config from '../config/env.js'

const connection = mysql.createConnection({
    host: config.DB.host,
    user:config.DB.user, 
    port:config.DB.port, 
    password:config.DB.password,
    database:config.DB.database 
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
