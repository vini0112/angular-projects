
import productService from "../services/product.service.js";

class productControllers{
    
    // all data
    async show(req, res){
        try{
            const row = await productService.findAll()
            res.json(row)
        }catch(err){
            console.log('Error in show data: ',err.message)
            return res.json(err.message)
        }
    }

    // getting by id
    async getById(req, res){
        try{
            const id = req.params.id
            const row = await productService.findById(id)
            res.json(row[0])

        }catch(err){
            console.log('Error in get product by id: ',err.message)
            return res.json(err.message)
        }
        
    }

    // post product
    async postingClothes(req, res){
        try{
            const dados = req.body
            const file = req.file

            const imagePath = `/upload/${file.filename}`
            dados.image = imagePath
            
            const row = await productService.posting(dados)
            res.status(201).json(row)

        }catch(err){
            console.log('Error in posting new product: ',err.message)
            return res.json(err.message)
        }
        
    }

    // update product
    async updateClothe(req, res){
        try{
            const dados = req.body
            const id = req.params.id 
            
            const row = await productService.editing(id, dados)
            res.json({message: 'Succesfull Updated!', row})

        }catch(err){
            console.log('Error in updating product: ',err.message)
            return res.json(err.message)
        }
        
    }

    async changeFavorite(req, res){
        try{
            const {isFavorite} = req.body
            const id = req.params.id
            let valor = 0

            if(isFavorite == 0){
                valor = 1
            }
            
            const row = await productService.editingFavorite(id, valor)
            res.json(row)

        }catch(err){
            console.log('Error changing product to un/favorite: ',err.message)
            return res.json(err.message)
        }
        

    }  

    // delete product 
    async deletingClothe(req, res){
        try{
            const id = req.params.id

            const row = await productService.delete(id)
            res.json(row)

        }catch(err){
            console.log('Error in deleting product: ',err.message)
            return res.json(err.message)
        }
        
    }
    
}


export default new productControllers();

