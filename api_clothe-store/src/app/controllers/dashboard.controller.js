
import dashboardRepository from "../repositories/dashboard.repository.js"

class dashBoardController{

    async show(req, res){
        const row = await dashboardRepository.getAll()
        res.status(200).json(row)
    }

    async adding(req, res){
        const body = req.body
        const row = await dashboardRepository.postingPurchaseData(body)
        // console.log(body[total_sales])
        res.json(row) 
        // res.json(body) 
    }

}

export default new dashBoardController()
