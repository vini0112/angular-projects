import { consulta } from "../database/connection.js"

class loginRepository{
    
    findAll(){
        const sql = "SELECT * FROM users"
        return consulta(sql, '' ,'Not Found!')
    }

    findById(id){
        const sql = "SELECT * FROM users WHERE idusers=?"
        return consulta(sql, id, 'Product Not Found!')
    }

    posting(dados){
        let sql = "INSERT INTO users SET ?"
        return consulta(sql, dados, 'Not Created!')
    }

    // editing(id, dados){
    //     let sql = "UPDATE clothes SET ? WHERE id=?"
        
    //     return consulta(sql, [dados, id], 'Erro in Edit Product!')
    // }
}

export default new loginRepository()
