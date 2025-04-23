
import { consulta } from "../database/connection.js";

class dashboardRepository{

    getAll(){
        const sql = 'SELECT * FROM dashboard'
        return consulta(sql, '', 'Table dashboard not found!')
    }

    postingPurchaseData(body){
        const sql = `UPDATE dashboard SET total_sales = ?, yearMonthsData = JSON_ARRAY_APPEND(yearMonthsData, '$', ?) WHERE idDashboard = ?`
        return consulta(sql, [body.total_sales, body.yearMonthsData, 1], 'Data not updated in dashboard table!')
    }

}

// {
//     total_sales: 5,
//     yearMonthsData: [ 0, 0, 1 ],
//     invoices: [ { id: 1, username: 'vinicius', price: 100, status: 'paid' } ],
//     revenue: '100,90'
//   }
export default new dashboardRepository();

