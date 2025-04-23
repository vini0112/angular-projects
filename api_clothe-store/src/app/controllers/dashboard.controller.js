
import dashboardRepository from "../repositories/dashboard.repository.js"

class dashBoardController{

    async show(req, res){
        const row = await dashboardRepository.getAll()
        res.status(200).json(row)
    }

    async adding(req, res){
        const body = req.body
        const row = await dashboardRepository.postingPurchaseData(body)
        res.json(row.table2)
    }

    async monthChanged(req, res){
        const newMonth = req.body
        const row = await dashboardRepository.patchMonth(newMonth)
        res.json(row)
    }



}

export default new dashBoardController()
