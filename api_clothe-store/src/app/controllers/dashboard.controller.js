
import dashboardRepository from "../repositories/dashboard.repository.js"

class dashBoardController{

    async show(req, res){
        const row = await dashboardRepository.getAll()
        res.status(200).json(row)
    }

}

export default new dashBoardController()
