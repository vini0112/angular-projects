import { consulta } from "../database/connection.js"


class UserService {

    // "{\"country\":\"\",\"street\":\"\",\"houseNumber\":\"\",\"city\":\"\",\"zipCode\":\"\",\"state\":\"\",\"apartment\":\"\"}"

    async getUserInfo_service(id){
        let sql = 'SELECT idusers, username, email, ammount, purchases, address FROM users WHERE idusers = ?'
        
        const [data] = await consulta(sql, id, 'Error fetching the User Information!')

        data.address = JSON.parse(data.address)

        return data
    }


    updateUserInfo_service(id, data){
        
        const sql = "UPDATE users SET ? WHERE idusers = ?"
        return consulta(sql, [data, id], "UserInformation not updated!")

    }



}

export default new UserService()
