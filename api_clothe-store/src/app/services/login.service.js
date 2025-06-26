import jwt from 'jsonwebtoken'
import connection from '../database/connection.js'
import bcrypt from 'bcrypt'
import mailer from 'nodemailer'
const saltRounds = 10;
import config from '../config/env.js';



class loginService {

    checkIf_isLogged_service(token){

        return new Promise((resolve, reject) =>{

            jwt.verify(token, config.JWT.REFRESH_TOKEN, (err, user) =>{
                if(err) {
                    console.log('❌ Token inválido! ', err.message)
                    return reject({erroMessage: "Token inválido!"})
                }
                
                
                if(user.role === config.JWT.ADM_ROLE){
                    console.log('✅ DEV')
                    return resolve({message: "Developer_Logged"})
                }

                console.log('✅ USER')
                return resolve({message: "User_Logged"})
            })

        })

    }


    logging_in_service(body){

        const {email, password} = body

        return new Promise((resolve, reject) =>{

            if(!email || !password){
                return reject({ error: 'Username e Password são obrigatórios.'});
            }

            const sql = "SELECT * FROM users WHERE email = ?"

            connection.query(sql, [email], async (err, result) =>{
                if(err){
                    return reject({ error: `Erro while checking if the user exists: ${err.message}` });
                }

                if(result.length === 0){
                    return reject({ error: "User not found!" })
                }

                const user = result[0]

                // DEVELOPER LOGIN 
                if(email === config.JWT.EMAIL_OF_DEVELOPER && user.roles === config.JWT.ADM_ROLE){
                    const match = await bcrypt.compare(password, user.password)

                    if(match){
                        
                        const accessToken = jwt.sign({ id: user.idusers, username: user.username ,email: user.email }, config.JWT.SECRET_KEY, { expiresIn: '1h' });

                        const refreshToken = jwt.sign({ id: user.idusers, role: config.JWT.ADM_ROLE, email: user.email, username: user.username }, config.JWT.REFRESH_TOKEN, { expiresIn: '7d'});

                        await connection.promise().execute('UPDATE users SET token_reset = ? WHERE email = ?', [refreshToken,  user.email])
                        
                        
                        return resolve({developerMsg: "Developer_Logged!", accessToken: accessToken, refreshToken: refreshToken})
                    }


                }
                

                // USER LOGIN
                const match = await bcrypt.compare(password, user.password)
                
                if(!match){
                    return reject({erro: 'Wrong password'})
                } 
                
                const accessToken = jwt.sign({ id: user.idusers, username: user.username ,email: user.email }, config.JWT.SECRET_KEY, { expiresIn: '15m' });

                const refreshToken = jwt.sign({ id: user.idusers, email: user.email, username: user.username }, config.JWT.REFRESH_TOKEN, { expiresIn: '7d' });


                await connection.promise().execute('UPDATE users SET token_reset = ? WHERE email = ?', [refreshToken, user.email])

                return resolve({ userMsg: 'Login realizado com sucesso!', accessToken: accessToken, refreshToken: refreshToken});
            })



        })

    }
    

    loginAuth0_service(body){

        return new Promise((resolve, reject) =>{
            const {nickname, email, sub} = body.user 

            if(!nickname || !email || !sub){
                return reject({ message: 'Nickname/Email/Sub is messing!'});
            } 

            const sql = 'SELECT * FROM users'

            connection.query(sql, async(err, result) =>{
                if(err){
                    return reject({error: 'Error while trying to create a new user through auth0!',
                    details: err.message});
                }


                let ifExisteEmail = result.some(user => user.email === email && user.auth0_sub === sub)

                
                if(ifExisteEmail){

                    let account
                    result.forEach(user =>{
                        if(user.email === email && user.auth0_sub === sub) account = user
                    })
                    
                    const accessToken = jwt.sign({ id: account.idusers, username: account.username ,email: account.email }, config.JWT.SECRET_KEY, { expiresIn: '15m' });

                    const refreshToken = jwt.sign({ id: account.idusers, email: account.email, username: account.username }, config.JWT.REFRESH_TOKEN, { expiresIn: '7d' });
                

                    await connection.promise().execute('UPDATE users SET token_reset = ? WHERE email = ? and idusers = ?', [refreshToken, account.email, account.idusers])

                    return resolve({ userMsg: 'Login successfuly completed with auth0!', accessToken: accessToken, refreshToken: refreshToken});
                }


                const [res_newRegister] = await connection.promise().execute(
                    'INSERT INTO users (username, password ,email, purchases, ammount, roles, auth0_sub) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [nickname, null,email, 0, 0, 'user', sub] 
                );

                const insertId = res_newRegister.insertId

                const accessToken = jwt.sign({ id: insertId, username: nickname ,email: email }, config.JWT.SECRET_KEY, { expiresIn: '15m' });

                const refreshToken = jwt.sign({ id: insertId, email: email, username: nickname }, config.JWT.REFRESH_TOKEN, { expiresIn: '7d' });
                
                await connection.promise().execute('UPDATE users SET token_reset = ? WHERE email = ? and idusers = ?', [refreshToken, email, insertId])

                return resolve({ userMsg: 'User successfully registered via auth0!', accessToken: accessToken, refreshToken: refreshToken});

            })

        })
        
    }


    refreshingTokenService_service(refreshToken){

        return new Promise((resolve, reject) =>{

            if(!refreshToken) return reject({message: "Not authorized!"})

            connection.query('SELECT * FROM users WHERE token_reset = ?', [refreshToken], (err, result) =>{

            
                if(err || result.length === 0) return reject({ message: "Token inválido" });

                jwt.verify(refreshToken, config.JWT.REFRESH_TOKEN, (err, user) =>{
                    if (err) return reject({ message: "Token inválido", refreshToken});
                    

                    // IF ROLE DEVELOPER
                    if(user.role === config.JWT.ADM_ROLE){
                        const newAccessToken = jwt.sign({ id: user.id, role: config.JWT.ADM_ROLE, email: user.email, username: user.username  }, config.JWT.SECRET_KEY, { expiresIn: '1h' });
                        
                        return resolve({accessToken: newAccessToken})
                    }


                    const newAccessToken = jwt.sign({ id: user.id, username: user.username ,email: user.email }, config.JWT.SECRET_KEY, { expiresIn: '15m' });
                    
                    return resolve({accessToken: newAccessToken})

                })
            })

        })

    }


    addingNewUser_service(body){

        return new Promise((resolve, reject) =>{

            const {password, email, username} = body

            if(!email || !password || !username){
                return reject({ message: 'email/password/username is messing!' });
            }

            let sql = "SELECT * FROM users"

            connection.query(sql, async(err, result) =>{
                if(err){
                    return reject({error: 'Error while trying to create a new user!',
                    details: err.message});
                }

                let ifExisteEmail = result.some(user => user.email == email)
                
                if(ifExisteEmail == true){
                    return reject({error: "Email already exist!"})
                }

                try {
                    const hashedPassword = await bcrypt.hash(password, saltRounds)
                    const initialAddress = {"city": "", "state": "", "street": "", "country": "", "zipCode": 0, "apartment": "", "houseNumber": 0}

                    connection.execute(
                        'INSERT INTO users (username, email, password, purchases, ammount, roles, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
                        [username, email, hashedPassword, 0, 0, 'user', initialAddress] 
                    );
                    return resolve({ message: 'User successfully registered!' });
        
                } catch (error) {

                    return reject({ message: 'Server error in login!', error });
                }
                
            }) 

        })

    }


    sendingEmailReq_ResetPassword_service(body){

        return new Promise(async (resolve, reject) =>{
            const {email} = body

            if(!email){
                return reject({message: 'Please provide an email!'})
            }

            const [rows] = await connection.promise().execute("SELECT * FROM users WHERE email = ?", [email])
            if(rows.length === 0){
                return reject({ message: "Email not found!" })
            }


            const tokenReset = jwt.sign({email}, config.RESET_PASSWORD.SECRET_RESET_PASSWORD, {expiresIn: '15min'})


            await connection.promise().execute("UPDATE users SET token_reset = ?, token_expires = DATE_ADD(NOW(), INTERVAL 15 MINUTE) WHERE email = ?", [tokenReset, email])
            
            const transporter = mailer.createTransport({

                host: "smtp.gmail.com",                
                secure: true,
                auth:{
                    user: config.RESET_PASSWORD.MY_EMAIL,
                    pass: config.RESET_PASSWORD.MY_PASSWORD 
                }
            })
            
            const resetUrl = `${config.RESET_PASSWORD.CLIENT_URL}/${tokenReset}`

            const receiver = {
                from: 'vinilocsilva@gmail.com',
                to: email,
                subject: 'Password Reset Request',
                html: `<p>Click on the link down here to reset your password!:</p>
                <a href="${resetUrl}">${resetUrl}</a> 
                <p>This link expires in 15min!</p>`
            }
            
    
            await transporter.sendMail(receiver)

            return resolve({message: 'Please check your email!'})
            

        })

    }


    requestToResetPassword_service(body){
        return new Promise( async(resolve, reject) =>{

            const {token, newPassword} = body 

            const [rows] = await connection.promise().execute('SELECT * FROM users WHERE token_reset = ? AND token_expires > NOW()', [token])
            if(rows.length === 0){
                return reject({ message: "Invalid/Expired token!" })
            }

            const email = rows[0].email
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds)
            
            await connection.promise().execute('UPDATE users SET password = ? WHERE email = ?',[hashedPassword, email], (err) =>{
                if(err) return reject({message: "Error to reset the password!"})
            })

            
            await connection.promise().execute('UPDATE users SET token_reset = NULL WHERE token_reset = ?',[token], (err) =>{
                if(err) return reject({message: 'Error to remove the token!'})
            })

            return resolve({message: 'Password Successful Updated!'})
            

        })
    }


    validatorTokenResetPassword_service(params){
        

        return new Promise(async (resolve, reject) =>{
            const {token} = params

            const [row] = await connection.promise().execute("SELECT * FROM users WHERE token_reset = ? AND token_expires > NOW()", [token])

            if(row.length === 0) return reject({ message: "Invalid/Expired token!" });
            
            return resolve({valid: true });
        })
    }





}

export default new loginService()
