import { consulta } from "../database/connection.js"
import jwt from 'jsonwebtoken'


class UserService {

    // "{\"country\":\"\",\"street\":\"\",\"houseNumber\":\"\",\"city\":\"\",\"zipCode\":\"\",\"state\":\"\",\"apartment\":\"\"}"

    getUserInfo_service(token){

        const userData = jwt.decode(token)

        if(!userData){
            throw new Error('userData not found/not decode properly!')
        }

        let sql = 'SELECT idusers, username, email, ammount, purchases, address FROM users WHERE idusers = ?'
        
        return consulta(sql, userData.id, 'Error fetching the User Information!')
    }


    updateUserInfo_service(id, data){

        if(data.address){
            data.address = JSON.stringify(data.address)
        }

        const sql = "UPDATE users SET ? WHERE idusers = ?"
        return consulta(sql, [data, id], "UserInformation not updated!")
    }



}

export default new UserService()
