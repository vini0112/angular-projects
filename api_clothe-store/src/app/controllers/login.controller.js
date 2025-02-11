import loginRepository from "../repositories/login.repository.js"

class loginController{

    async showAll(req, res){
        const row = await loginRepository.findAll()
        res.json(row)
        
    }

    // getting by id
    async getById(req, res){
        const id = req.params.id
        const row = await loginRepository.findById(id)
        res.json(row) 
    }

    // post 
    async creatingUser(req, res){
        const dados = req.body
        
        // const row = await loginRepository.posting(dados)
        res.json(dados.email)
    }



    // update
    // async updateClothe(req, res){
    //     const dados = req.body
    //     const id = req.params.id 
    //     const row = await product_repositories.editing(id, dados)
    //     res.json(row)
    // }

    // delete product 
    // async deletingClothe(req, res){
    //     const id = req.params.id

    //     const row = await product_repositories.delete(id)
    //     res.json(row)
    // }
    

}

export default new loginController()
