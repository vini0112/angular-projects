import product_repositories from "../repositories/product_repositories.js";

class productControllers{
    
    // all data
    async show(req, res){
        const row = await product_repositories.findAll()
        res.json(row)
    }


    // getting by id
    async getById(req, res){
        const id = req.params.id
        const row = await product_repositories.findById(id)
        res.json(row)

    }

    // post product
    async postingClothes(req, res){
        const dados = req.body
        
        const row = await product_repositories.posting(dados)
        res.json(row)
    }

    // update product
    async updateClothe(req, res){
        const dados = req.body
        const id = req.params.id 
        const row = await product_repositories.editing(id, dados)
        res.json(row)
    }

    async changeFavorite(req, res){
        const {isFavorite} = req.body
        const id = req.params.id
        let valor = 0

        if(isFavorite == 0){
            valor = 1
        }
        
        const row = await product_repositories.editingFavorite(id, valor)
        res.json(row)

    }  


    // delete product 
    async deletingClothe(req, res){
        const id = req.params.id

        const row = await product_repositories.delete(id)
        res.json(row)
    }
    
}


export default new productControllers();

