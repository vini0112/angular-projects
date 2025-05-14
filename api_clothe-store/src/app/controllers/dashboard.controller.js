
import dashboardService from "../services/dashboard.service.js"

class dashBoardController{

    async showDashboardData(req, res){
        try{
            const row = await dashboardService.getDashboardData_service()
            return res.status(200).json(row) 
        }catch(err){
            res.status(404).json(err)
        }
        
    }

}

export default new dashBoardController()
