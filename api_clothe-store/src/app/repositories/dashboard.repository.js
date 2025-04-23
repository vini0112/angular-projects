
import { consulta } from "../database/connection.js";
import connection from "../database/connection.js";



class dashboardRepository{

    getAll(){
        const sql = 'SELECT * FROM dashboard'
        return consulta(sql, '', 'Table dashboard not found!')
    }

    postingPurchaseData(body){
        
        const sql = `UPDATE dashboard SET total_sales = total_sales + 1, invoices = JSON_ARRAY_APPEND(invoices, '$', ?) ,revenue = revenue + ?, yearMonthsData = ? WHERE idDashboard = 1`

        return new Promise((resolve, reject) =>{

            // GETTING THE MONTHS DATA TO UPDATE THE LAST VALUE WHICH IS THE CURRENT MONTH
            connection.query("SELECT yearMonthsData FROM dashboard WHERE idDashboard = 1", (err1, result1) =>{
                if(err1) {
                    console.log('ERROR column yearMonthData not found!')
                    return reject(err1)
                }
                
                // INCREASES ONE IN THE SALES OF THE CURRENT MONTH
                let arrayMonths = result1[0].yearMonthsData
                arrayMonths[arrayMonths.length-1] += 1

                // UPDATES ALONG WITH ALL THE PURCHASE INFO
                // TOTAL SALE, INVOICES OF THE USER, AND THE TOTAL REVENUE
                connection.query(sql, [JSON.stringify(body.invoices), body.invoices.price, JSON.stringify(arrayMonths)], (err2, result2) =>{

                    if(err2) {
                        console.log('ERROR while updating dashboard table!')
                        return reject(err2)
                    }

                    console.log('updated successfully!');

                    resolve({ table: result1, table2: result2 }); //RESULT OF THE TWO QUERIES

                })

            })


        })

        
    }


    patchMonth(newMonth){
        const sql = "UPDATE dashboard SET yearMonthsData = JSON_ARRAY_APPEND(yearMonthsData, '$', ?) WHERE idDashboard = 1"

        return new Promise((resolve, reject) =>{

            connection.query(sql, newMonth.newMonth, (err, result) =>{
                if(err){
                    console.log("ERROR while updating the new month!")
                    return reject(err)
                }
    
                return resolve(result)
            })
        })
        
    }


}





export default new dashboardRepository();

