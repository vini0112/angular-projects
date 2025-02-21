import mysql from 'mysql2'


const connection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER, 
    port:process.env.DB_PASSWORD,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
}) // 



// refatorando o processo de new Promise de repositories
/**
 * 
 * @param {string} sql instrução sql a ser executada
 * @param {string=id | [clothes, id]} valores a serem passados para o sql
 * @param {string} mensagemReject msg de erro
 * @returns obj da primise
 */

export const consulta = (sql, valores='', mensagemReject) =>{

    return new Promise((resolve, reject) =>{
        connection.query(sql, valores, (error, result) =>{
                    //    <>    <>
            if(error) return reject(mensagemReject)
                                        //<>
            // doing a parse in the result
            const row = JSON.parse(JSON.stringify(result))
            return resolve(row)
        })
    })
}




export default connection;
