import { consulta } from "../database/connection.js"

class loginRepository{
    
    
    posting(dados){
        let sql = "INSERT INTO users SET ?"
        return consulta(sql, dados, 'Not Created!')
    }

}

export default new loginRepository()
