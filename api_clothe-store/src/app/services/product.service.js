import { consulta } from "../database/connection.js"


class productService{

    findAll(){
        const sql = "SELECT * FROM clothes"
        return consulta(sql, '' ,'Not Found!')
    }

    findById(id){
        const sql = "SELECT * FROM clothes WHERE id=?"
        return consulta(sql, id, 'Product Not Found!')
    }

    productSize_service(id){

        const sql = `
        SELECT
        ps.product_id,
        s.label
        FROM products_size ps
        JOIN sizes s ON ps.size_id = s.idsizes
        WHERE ps.product_id = ?
        `

        return consulta(sql, id, 'Product size not found!')
        
    }


    posting(dados){
        let sql = "INSERT INTO clothes SET ?"
        return consulta(sql, dados, 'Not Created!')
    }

    editing(id, dados){
        let sql = "UPDATE clothes SET ? WHERE id=?"
        
        return consulta(sql, [dados, id], 'Erro in Edit Product!')
    }

    editingFavorite(id, valor){

        let sql = "UPDATE clothes SET isFavorite = ? WHERE id=?"
        return consulta(sql, [valor, id], 'Erro in Edit Product!')
    }

    delete(id){
        const sql = 'DELETE FROM clothes WHERE id=?'
        return consulta(sql, id, 'Erro in Delete Product!')
    }

}

export default new productService()
