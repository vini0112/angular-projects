import mysql from 'mysql2'


const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'vini123',
    database: 'db_clothes_product'
})

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
