
import { consulta } from "../database/connection.js"


class dashboardService{

    async getDashboardData(){
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
            console.log('ERROR getting the dashboard data')
            return err
        }
        
    }

}

export default new dashboardService()
