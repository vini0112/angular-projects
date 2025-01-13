import {consulta} from '../database/connection.js'
class productRepositories {

    
    findAll(){
        const sql = "SELECT * FROM clothes"
        return consulta(sql, '' ,'Not Found!')
    }

    findById(id){
        const sql = "SELECT * FROM clothes WHERE id=?"
        return consulta(sql, id, 'Product Not Found!')
    }

    posting(dados){
        let sql = "INSERT INTO clothes SET ?"
        return consulta(sql, dados, 'Not Created!')
    }

    editing(id, dados){
        let sql = "UPDATE clothes SET ? WHERE id=?"
        return consulta(sql, [id, dados], 'Erro in Edit Product!')
    }

    delete(id){
        const sql = 'DELETE FROM clothes WHERE id=?'
        return consulta(sql, id, 'Erro in Delete Product!')
    }

}


export default new productRepositories();

