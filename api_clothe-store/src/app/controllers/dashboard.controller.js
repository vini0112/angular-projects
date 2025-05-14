
import dashboardService from "../services/dashboard.service.js"

class dashBoardController{

    async show(req, res){
        const row = await dashboardService.getDashboardData()
        res.status(200).json(row)
    }

}

export default new dashBoardController()
