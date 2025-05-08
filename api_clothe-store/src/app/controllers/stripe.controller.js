

import stripe from "../config/stripe.config.js";
import connection from '../database/connection.js'
import mailer from 'nodemailer'



const endpointSecret = process.env.STRIPE_SECRET_ENDPOINT

class stripeController{

    

    async checkout(req, res){ 

        const dateNow = new Date().toLocaleDateString('en-CA')

        const {products, userInfo} = JSON.parse(req.body)

        const productsID = products.map(product => product.id)
        const userId = userInfo[0].userId
        const email = userInfo[0].email
        const username = userInfo[0].username
        

        // CHECK THE USER IN DB
        connection.query(
            `SELECT idusers FROM users WHERE idusers = ? AND email = ?`, [userId, email], (error, result) =>{
                if(error) return console.log('error: ', error)

                if(result.length == 0) {
                    console.log('User not found!')
                    return res.status(404).json('❌ User not found')
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
        
    
        try{
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
    
            return res.json({
                userPurchaseInformation: {
                clientSecret: paymentIntent.client_secret,
                amount: totalAmount,
                quantity: quantity
                }
            }) 
    
        }catch(error){
            console.log(error)
            res.status(400).json({error: error})
        }
    
    }


    async webHook(req, res){
        let event = req.body

        if(endpointSecret){
            const sig = req.headers['stripe-signature']
        
            try{

                event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)

            }catch(error){
                console.error("Erro ao validar webhook:", error.message);
                return res.status(400).send(`Webhook Error: ${error.message}`);
            }
        }


        

        switch(event.type){

            case 'payment_intent.succeeded':

                const paymentIntent = event.data.object;
                console.log("✅ Pagamento bem-sucedido:", paymentIntent.id);

                const email = paymentIntent.metadata.email
                const amount = paymentIntent.amount
                const metadata = paymentIntent.metadata

                const WeekDay = new Date().getDay()
                const currentMonth = new Date().getMonth()

                console.log("METADATA: ", metadata)
                
                // Mark as paid to sinalize the frontend
                connection.query('UPDATE users SET status = ? WHERE email = ?', ['paid', email], (err, res) =>{
                    if(err) return res.status(500).json({error: 'webhook did not set the value in DB correctly!'})
                    
                    if(res.length == 0){
                        return res.status(500).json({error: 'webhook did not set the value in DB!'})
                    }

                    console.log('✅ FLAG (payeid) added in DB!')
                }) 



                // UPDATES DASHBOARD TABLE

                const sql = `UPDATE dashboard SET total_sales = total_sales + 1, invoices = JSON_ARRAY_APPEND(invoices, '$', ?) ,revenue = revenue + ?, yearMonthsData = ?, weekdays = ?,currentMonth = ?, currentDay = ? WHERE idDashboard = 1`


                connection.query("SELECT yearMonthsData, weekdays, currentMonth, currentDay FROM dashboard WHERE idDashboard = 1", (err1, result1) =>{
                    if(err1) {
                        console.log('ERROR column yearMonthData not found!')
                        return res.json(err1)
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
                            console.log('ERROR while updating dashboard table!')
                            return res.json(err2)
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

                break

            case 'payment_intent.payment_failed':
                console.log('❌ Pagamento falhou:', event.data.object);
                break;

            default:
                console.log(`ℹ️ Evento não tratado: ${event.type}`)
                break
        }

        res.json({ received: true });
    }


    async checkPaymentStatus(req, res){

        const {userInfo} = JSON.parse(req.body)
        const userId = userInfo[0].userId
        const email = userInfo[0].email

        // SELECTING THE STATUS ACCORDIND TO THE IDUSER AND EMAIL   
        connection.query('SELECT status FROM users WHERE idusers = ? AND email = ?', [userId, email], (erro, response) =>{

            if(erro){
                console.log('Erro while selecting the status payment!')
                return response.status(500).json('Erro while selecting the status payment!')
            }

            const statusPayment = response[0].status // FLAG PAID HERE
            
            if(statusPayment === 'paid'){
                console.log('✅ Flag paid found!')

                // SETTING FLAG PAID TO NULL AND RETURN TRUE TO FRONT
                connection.query('UPDATE users SET status = ? WHERE idusers = ? AND email = ?', [null, userId, email], (erro2, response2) =>{
                    if(erro2){
                        console.log('column status of DB was not updated!')
                        return response2.status(500).json('colunm status from the DB was not updated!')
                    }

                    console.log('✅ Flag updated to null!')
                    return res.status(202).json({status: true}) // FRONT RECEIVES THIS
                })

            }else{ // IF NO FLAG IN DB
                console.log('Not paid flag found in status!')
                return res.json({status: false})
            }
        })
        
    }



}




export default new stripeController();
