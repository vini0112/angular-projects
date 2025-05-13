
import { consulta } from "../database/connection.js";



class dashboardRepository{

    getAll(){
        const sql = 'SELECT * FROM dashboard'
        return consulta(sql, '', 'Table dashboard not found!')
    }

}





export default new dashboardRepository();

