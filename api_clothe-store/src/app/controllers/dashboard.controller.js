
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


    async deleteUserById(req, res){
        try{
            const row = await dashboardService.deleteingUser_service(req.params.id)
            return res.json(row)
            
        }catch(err){
            console.log('ERROR while deleting the user by id: ', err.message)
            return res.status(404).json(err)
        }
    }

}

export default new dashBoardController()
