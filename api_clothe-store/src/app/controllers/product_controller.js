
import productService from "../services/product.service.js";

class productControllers{
    
    // all data
    async show(req, res){
        const row = await productService.findAll()
        res.json(row)
    }

    // getting by id
    async getById(req, res){
        const id = req.params.id
        const row = await productService.findById(id)
        res.json(row)

    }

    // post product
    async postingClothes(req, res){
        const dados = req.body
        const file = req.file

        const imagePath = `/upload/${file.filename}`
        dados.image = imagePath
        
        const row = await productService.posting(dados)
        res.status(201).json(row)
    }

    // update product
    async updateClothe(req, res){
        const dados = req.body
        const id = req.params.id 
        
        const row = await productService.editing(id, dados)
        res.json({message: 'Succesfull Updated!', row})
    }

    async changeFavorite(req, res){
        const {isFavorite} = req.body
        const id = req.params.id
        let valor = 0

        if(isFavorite == 0){
            valor = 1
        }
        
        const row = await productService.editingFavorite(id, valor)
        res.json(row)

    }  

    // delete product 
    async deletingClothe(req, res){
        const id = req.params.id

        const row = await productService.delete(id)
        res.json(row)
    }
    
}


export default new productControllers();

