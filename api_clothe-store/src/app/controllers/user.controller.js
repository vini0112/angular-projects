
import userService from "../services/user.service.js"

class UserController{


    async getUserInfo(req, res){
        try{
            const id = req.params.id
            const row = await userService.getUserInfo_service(id)
            res.json(row[0])

        }catch(err){
            console.log('Error in user controller: ', err.message)
            return res.status(404).json(err.message)
        }
    }


    async updateUserInfo(req, res){
        try{

            const id = req.params.id
            const row = await userService.updateUserInfo_service(id, req.body)
            return res.json(row)

        }catch(err){
            console.log('Error in update user information: ',err.message)
            return res.status(404).json(err.message)
        }
    }

    
}


export default new UserController();
