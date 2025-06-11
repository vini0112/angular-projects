import { consulta } from "../database/connection.js"
import jwt from 'jsonwebtoken'


class UserService {

    // {"city": "", "state": "", "street": "", "country": "", "zipCode": 0, "apartment": "", "houseNumber": 0}

    getUserInfo_service(token){

        const userData = jwt.decode(token)

        if(!userData){
            throw new Error('userData not found/not decode properly!')
        }

        let sql = 'SELECT idusers, username, email, ammount, purchases, address FROM users WHERE idusers = ?'
        
        return consulta(sql, userData.id, 'Error fetching the User Information!')
    }


    updateUserInfo_service(token, data){

        const userData = jwt.decode(token)

        if(!userData){
            throw new Error('userData not found/not decode properly!')
        }

        const formatedData = {
            username: data.username,
            email: data.email,
            address: {
                country: data.country,
                street: data.street,
                houseNumber: data.houseNumber,
                city: data.city,
                zipCode: data.zipCode,
                state: data.state,
                apartment: data.apartment
            }
        }
        
        if(formatedData.address){
            formatedData.address = JSON.stringify(formatedData.address)
        }


        

        const sql = "UPDATE users SET ? WHERE idusers = ?"
        return consulta(sql, [formatedData, userData.id], "UserInformation not updated!")
    }



}

export default new UserService()
