import { consulta } from "../database/connection.js"
import connection from "../database/connection.js"

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

        return new Promise(async (resolve, reject) =>{

            if(!dados){ 
                return reject({message: 'Data missing!'})
            }
            
            const newSizes = dados.sizes.split(',').map(Number)
            const {sizes, ...transformedDados} = dados


            let sql = "INSERT INTO clothes (name, image, info, isFavorite, sexo, section, price, isBestseller, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
            

            const [res_productCreated] = await connection.promise().execute(sql, [
                transformedDados.name,
                transformedDados.image,
                transformedDados.info,
                transformedDados.isFavorite,
                transformedDados.sexo,
                transformedDados.section,
                transformedDados.price,
                transformedDados.isBestseller,
                transformedDados.quantity,
            ])

            const insertId = res_productCreated.insertId
            
            const values = newSizes.map(() => '(?, ?)').join(', ')
            const params = newSizes.flatMap(size => [insertId, size])

            const sql2 = `INSERT INTO products_size (product_id, size_id) VALUES ${values}`

            await connection.promise().execute(sql2, params)
            
            resolve({message: 'Product Created!'})

        })
        

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

        return new Promise(async (resolve, reject) =>{

            if(!id) return reject({message: 'Id missing in delete product service!'})

            const sql = 'DELETE FROM clothes WHERE id = ?'
            await connection.promise().execute(sql, [id])
            console.log("✅ Product deleted")

            const sql2 = 'DELETE FROM products_size WHERE product_id = ?'
            await connection.promise().execute(sql2, [id])
            console.log("✅ product size deleted") 

            return resolve({message: 'Product Deleted!'})

        })
        
    }

}

export default new productService()
