
import { consulta } from "../database/connection.js"


class dashboardService{

    async getDashboardData_service(){
        try{
            const sql = 'SELECT * FROM dashboard'
            const [data] = await consulta(sql, '', 'Database connection erro while getting dashboard data!')
            
            
            data.invoices = data.invoices.map(item => {
                let parsedItem = JSON.parse(item)

                return {
                    ...parsedItem,
                    userId: parsedItem.userId ? parseInt(parsedItem.userId) : 0,
                    price: parsedItem.price ? parseFloat(parsedItem.price) : 0
                }
            })

            return data

        }catch(err){
            console.log('ERROR getting the dashboard data', err.message)
            return err.message
        }
        
    }


    async getDashboardUsersData_service(){

        try{

            const sql = 'SELECT idUsers, username, email, ammount, purchases from users'

            const [data] = await consulta(sql, '', 'Error selecting users data!')

            return data

        }catch(err){
            console.log('ERROR getting the dashboard users', err.message)
            return err.message
        }

    }

}

export default new dashboardService()
