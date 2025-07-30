import {consulta} from "../database/connection.js"

class testSocketService{

    getMessages(){
        const sql = "SELECT * FROM test"
        return consulta(sql)
    }

    postService(data){
        const dateNow = new Date().getDay()
        const sql = "INSERT INTO test (services, day) VALUES (?, ?)"
        const strMessage = JSON.stringify(data)
        
        return consulta(sql, [strMessage, dateNow], "Error saving services in DB")
    }

    updateService(id, data){
        const sql = "UPDATE test SET services = JSON_MERGE_PATCH(services, ?) WHERE idtest = ?"
        const strServices = JSON.stringify(data)
        return consulta(sql, [strServices, id], "Error updating service in DB")
    }

    deleteService(id){
        const sql = "DELETE FROM test WHERE idtest = ?"
        return consulta(sql, [id], "Error deleting service in DB")
    }


}

export default new testSocketService();