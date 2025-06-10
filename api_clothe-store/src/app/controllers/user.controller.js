
import userService from "../services/user.service.js"

class UserController{


    async getUserInfo(req, res){
        try{
            const authHeader = req.headers.authorization
            
            if (!authHeader) {
                return res.status(403).json({ error: 'No credentials sent!' });
            }

            const token = authHeader.split(' ')[1]
            
            if(!token){
                return res.status(404).json('Token no found in headers!')
            }
            
            const row = await userService.getUserInfo_service(token)
            res.json(row[0])

        }catch(err){
            console.log('Error in user controller: ', err.message)
            return res.status(404).json(err.message)
        }
    }


    async updateUserInfo(req, res){
        try{
            const row = await userService.updateUserInfo_service(req.body) 
            return res.json(row)

        }catch(err){
            console.log('Error in update user information: ',err.message)
            return res.status(404).json(err.message)
        }
    }

    
}


export default new UserController();
