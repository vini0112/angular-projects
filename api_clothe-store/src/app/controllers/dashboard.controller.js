
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


    async showDashboardUsers(req, res){
        try{
            const row = await dashboardService.getDashboardUsersData_service()
            return res.json(row)

        }catch(err){
            console.log('Error in dashboard users controller: ',err.message)
            return res.status(404).json(err.message)
        }
    }

}

export default new dashBoardController()
