
import connection from '../database/connection.js'
import mailer from 'nodemailer'
import stripe from "../config/stripe.config.js";



class stripeService{

    checkout_service(body){
        return new Promise(async(resolve, reject) =>{

            const {products, userInfo} = JSON.parse(body)

            const dateNow = new Date().toLocaleDateString('en-CA')

            const productsID = products.map(product => product.id)
            const userId = userInfo[0].userId
            const email = userInfo[0].email
            const username = userInfo[0].username


            // CHECK THE USER IN DB
            connection.query(
                `SELECT idusers FROM users WHERE idusers = ? AND email = ?`, [userId, email], (error, result) =>{
                    if(error) return console.log('error: ', error)

                    if(result.length == 0) {
                        return reject({errorMessage:'❌ User not found'})
                    }

                    console.log('✅ userId Valid!')
                }
            )

            // 01 GETTING PRODUCTS FROM DB
            const [rows] = await connection.promise().execute(
                    `SELECT id, name, price FROM clothes WHERE id IN (${productsID.map(() => '?').join(',')})`,productsID
            );
        
            // calculating price according to quantity
            let totalAmount = 0
        
            products.forEach(item => {
                const productFromDB = rows.find(p => p.id === item.id)
                if(productFromDB){
                    totalAmount += productFromDB.price * item.quantity
                }
            })

            // TAKING AMOUNT       
            const amount = rows.reduce((total, pro) => total + pro.price,0)
            const quantity = products.reduce((quant, pro) => quant + pro.quantity,0)
            

            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: 'brl',
                automatic_payment_methods: {
                    enabled: true,
                },
                metadata:{
                    userId: userId,
                    username: username,
                    email: email,
                    status: "paid",
                    price: amount,
                    date: dateNow
                }
    
            })
    
            return resolve({
                
                clientSecret: paymentIntent.client_secret,
                amount: totalAmount,
                quantity: quantity
                
            }) 


        })
    }


    webHook_service(event){

        return new Promise(async (resolve, reject) =>{
            
            switch(event.type){ 

                case 'payment_intent.succeeded':

                    const paymentIntent = event.data.object;
                    console.log("✅ Pagamento bem-sucedido:", paymentIntent.id);

                    const email = paymentIntent.metadata.email
                    const amount = paymentIntent.amount
                    const metadata = paymentIntent.metadata

                    const WeekDay = new Date().getDay()
                    const currentMonth = new Date().getMonth()

                    
                    // Mark as paid to sinalize the frontend
                    connection.query('UPDATE users SET status = ? WHERE email = ?', ['paid', email], (err, res) =>{
                        if(err) return reject({error: 'webhook did not set the value in DB correctly!'})
                        
                        if(res.length == 0){
                            return reject({error: 'webhook did not set the value in DB!'})
                        }

                        console.log('✅ FLAG (payeid) added in DB!')
                    }) 



                    // UPDATES DASHBOARD TABLE

                    const sql = `UPDATE dashboard SET total_sales = total_sales + 1, invoices = JSON_ARRAY_APPEND(invoices, '$', ?) ,revenue = revenue + ?, yearMonthsData = ?, weekdays = ?,currentMonth = ?, currentDay = ? WHERE idDashboard = 1`


                    connection.query("SELECT yearMonthsData, weekdays, currentMonth, currentDay FROM dashboard WHERE idDashboard = 1", (err1, result1) =>{
                        if(err1) {
                            return reject({Error: err1.message, details: 'ERROR column yearMonthData not found!'})
                        }

                        let atualMonth = result1[0].currentMonth
                        let arrayMonths = result1[0].yearMonthsData

                        //CHECK IF THE MONTH CHANGED! IF IT'S ADD A NEW DATA(0) TO THE ARRAYMONTHS
                        if(atualMonth !== currentMonth){
                            arrayMonths.push(0)
                            atualMonth = currentMonth
                        }


                        // INCREASES ONE IN SALES OF THE CURRENT MONTH
                        arrayMonths[arrayMonths.length-1] += 1


                        // INCREASES ONE IN WEEKDAYS SALE ACCORDING TO THE DAY
                        let currentDay = result1[0].currentDay
                        let weekdays = result1[0].weekdays

                        // REFRESHING THE WEEK CHART EVERY MONDAY AND UPDATING THE DAY
                        if(currentDay !== WeekDay && WeekDay === 1){
                            currentDay = WeekDay
                            weekdays = [0, 0, 0, 0, 0, 0, 0]
                        }else{
                            currentDay = WeekDay
                        }

                        // COUNTING THE SALES
                        weekdays[currentDay] += 1




                        // UPDATES ALONG WITH ALL THE PURCHASE INFO
                        
                        connection.query(sql, [JSON.stringify(metadata), amount, JSON.stringify(arrayMonths), JSON.stringify(weekdays), atualMonth, currentDay], (err2, result2) =>{

                            if(err2) {
                                return reject({Error: err2.message, details: 'ERROR while updating dashboard table!'})
                            }

                            console.log('✅ Dashboard table updated successfully!');
                        }) 
                    })
                        
        


                    // SENDING EMAIL
                    const transporter = mailer.createTransport({
                        host: "smtp.gmail.com",                
                        secure: true,
                        auth:{
                            user: process.env.MY_EMAIL,
                            pass: process.env.MY_PASSWORD 
                        }
                    })

                    const receiver = {
                        from: 'vinilocsilva@gmail.com',
                        to: email,
                        subject: 'Clothe Store',
                        html: `<p>Thank your for shopping at our place, we have made a lot of efforts to make it consumer-friendly and a comfortable environment!</p>`
                    }

                    await transporter.sendMail(receiver)

                    resolve({ received: true });

                    break


                case 'payment_intent.payment_failed':
                    console.log('❌ Failed payment:', event.data.object);
                    break;


                default:
                    console.log(`ℹ️ Event not found!: ${event.type}`)
                    break
            }
        


        })
    }


    checkPaymentStatus_service(body){

        return new Promise((resolve, reject) =>{

            const {userInfo} = JSON.parse(body)
            const userId = userInfo[0].userId
            const email = userInfo[0].email

            // SELECTING THE STATUS ACCORDIND TO THE IDUSER AND EMAIL   
            connection.query('SELECT status FROM users WHERE idusers = ? AND email = ?', [userId, email], (erro, response) =>{

                if(erro){
                    return reject({error: erro.message,details:'Erro while selecting the status payment!'})
                }

                const statusPayment = response[0].status 
                
                if(statusPayment === 'paid'){
                    console.log('✅ Flag paid found!')

                    // SETTING FLAG PAID TO NULL AND RETURN TRUE TO FRONT
                    connection.query('UPDATE users SET status = ? WHERE idusers = ? AND email = ?', [null, userId, email], (erro2, response2) =>{
                        if(erro2){
                            return reject({error: erro2.message,details:'colunm status from the DB was not updated!'})
                        }

                        console.log('✅ Flag updated to null!')
                        return resolve({status: true}) 
                    })

                }else{ // IF NO FLAG IN DB
                    console.log('Not paid flag found in status!')
                    return reject({status: false, details: 'Not paid flag found in status!'})
                }
            })


        })
        
    }

}

export default new stripeService()
