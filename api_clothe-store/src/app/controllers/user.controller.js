
import userService from "../services/user.service.js"

class UserController{


    async getUserInfo(req, res){
        try{

            const token = req.headers.authorization.split(' ')[1]    
            const row = await userService.getUserInfo_service(token)
            res.json(row[0])

        }catch(err){
            console.log('Error in user controller: ', err.message)
            return res.status(404).json(err.message)
        }
    }


    async updateUserInfo(req, res){
        try{
            const {userDetail} = req.body
            
            const token = req.headers.authorization.split(' ')[1]
            const row = await userService.updateUserInfo_service(token, userDetail)
            return res.json(row)

        }catch(err){
            console.log('Error in update user information: ',err.message)
            return res.status(404).json(err.message)
        }
    }

    
}


export default new UserController();
