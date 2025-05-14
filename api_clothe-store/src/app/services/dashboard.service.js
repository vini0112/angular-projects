
import { consulta } from "../database/connection.js"
import connection from "../database/connection.js"


class dashboardService{

    getDashboardData(){
        const sql = 'SELECT * FROM dashboard'
        const [row] = connection.query(sql, '', (err, result) =>{
            if(err){
                console.log('ERROR select dashboard data')
                return err
            }

            console.log(result)
        })
    }

}

export default new dashboardService()
