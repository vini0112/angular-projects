import connection from "../database/connection.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mailer from 'nodemailer'

const saltRounds = 10;

class loginController{

    // FAST REQUEST OF THE APP      
    async isLogged(req, res){
        const token = req.cookies.refreshToken

        if(!token){
            return res.status(404).send("No Token!");
        }

        jwt.verify(token, process.env.REFRESH_TOKEN, (err, user) =>{
            if(err) return res.status(403).json({ message: "Token inválido!"})
            
            if(user.role === process.env.ADM_ROLE){
                return res.json({developerMsg: "Developer_Logged"})
            }
            
            res.json({message: "UserLogged"})
        })

    }

    // login
    async entrando(req, res){
        const {email, password} = req.body
        
        if(!email || !password){
            return res.status(400).json({ error: 'Username e Password são obrigatórios.' });
        }

        // conexao com DB
        const sql = "SELECT * FROM users WHERE email = ?"
        connection.query(sql, [email], async (err, result) =>{
            if(err){
                return res.status(500).json({ error: 'Erro no servidor.' });
            }
            if(result.length === 0){
                return res.status(401).json({ error: "Usuário não encontrado" })
            }

            const user = result[0]

            // DEVELOPER LOGIN 
            if(email === process.env.EMAIL_OF_DEVELOPER && user.roles === process.env.ADM_ROLE){
                const match = await bcrypt.compare(password, user.password)
                if(match){
                    
                    const accessToken = jwt.sign({ id: user.idusers, username: user.username ,email: user.email }, process.env.SECRET_KEY, { expiresIn: '30m' });

                    const refreshToken = jwt.sign({ id: user.idusers, role: process.env.ADM_ROLE, email: user.email }, process.env.REFRESH_TOKEN, { expiresIn: '7d'});

                    await connection.promise().execute('UPDATE users SET token_reset = ? WHERE email = ?', [refreshToken,  user.email])

                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true, // impede acesso ao cookie via JavaScript do lado do cliente
                        secure: true, // Somente HTTPS em produção
                        sameSite: 'none', // Evita envio do cookie em requisições de outros sites
                        maxAge:  7 * 24 * 60 * 60 * 1000 // expirar em 7d
                    })
                    
                    return res.json({developerMsg: "Developer_Logged!", accessToken})
                }

            }
            

            // USER LOGIN
            const match = await bcrypt.compare(password, user.password)
            
            if(!match){
                return res.status(401).json({erro: 'Wrong password'})
            }
            
            const accessToken = jwt.sign({ id: user.idusers, username: user.username ,email: user.email }, process.env.SECRET_KEY, { expiresIn: '15m' });

            const refreshToken = jwt.sign({ id: user.idusers, email: user.email }, process.env.REFRESH_TOKEN, { expiresIn: '7d' });


            await connection.promise().execute('UPDATE users SET token_reset = ? WHERE email = ?', [refreshToken, user.email])

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true, // impede acesso ao cookie via JavaScript do lado do cliente
                secure: true, // Somente HTTPS em produção
                sameSite: 'none', // Evita envio do cookie em requisições de outros sites
                maxAge: 7 * 24 * 60 * 60 * 1000 // expirar em 7d
            }) 

            res.json({ userMsg: 'Login realizado com sucesso!', accessToken});
        })

    }


    async refreshToken(req, res){
        
        const refreshToken = req.cookies.refreshToken

        // have to check if it has a role developer or user
        // const oldAccessToken = req.body.accessToken 
        // const decoded = jwt.decode(oldAccessToken)

        if(!refreshToken) return res.status(401).json({message: "not authorized!"})
        
        connection.query('SELECT * FROM users WHERE token_reset = ?', [refreshToken], (err, result) =>{

            
            if(err || result.length === 0) return res.status(401).json({ message: "Token inválido" });

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) =>{
                if (err) return res.status(401).json({ message: "Token inválido", refreshToken});
                

                // IF ROLE DEVELOPER
                if(user.role === process.env.ADM_ROLE){
                    const newAccessToken = jwt.sign({ id: user.id, role: process.env.ADM_ROLE, email: user.email,username: user.username  }, process.env.SECRET_KEY, { expiresIn: '30m' });
                    
                    return res.status(200).json({accessToken: newAccessToken})
                }


                const newAccessToken = jwt.sign({ id: user.id, username: user.username ,email: user.email }, process.env.SECRET_KEY, { expiresIn: '15m' });
                
                res.status(200).json({accessToken: newAccessToken})

            })
        })
    }

    
    async protectedRoute(req, res){
        const token = req.cookies.token
        
        if(!token){
            return res.json({message: 'Não authorized!'})
        }

        try{
            const decoded = jwt.verify(token, secretKey)
            res.json({user: decoded})
        }catch(error){
            res.status(401).json({message: 'Invalid Token'})
        }

    }


    // criando usuario
    async adding(req, res){

        const {password, email, username} = req.body

        if(!email || !password || !username){
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        
        let sql = "SELECT * FROM users"

        connection.query(sql, async(err, result) =>{
            if(err){
                return res.status(500).json({ error: 'Erro no servidor.', err});
            }

            let ifExisteEmail = result.some(user => user.email == email)
            
            if(ifExisteEmail == true){
                res.status(400).json({error: "Email already exist!"})
                return
            }

            try {
                const hashedPassword = await bcrypt.hash(password, saltRounds)
                // Salvar no banco
                connection.execute(
                    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                    [username, email, hashedPassword] 
                );
                res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    
            } catch (error) {
                    res.status(500).json({ message: 'Erro no servidor.', error });
            }
            
        }) 

    }


    // logout
    async logOut(req, res){
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        })
        res.status(200).json({message: 'Succefull Logout'})
    }


    // forgot password
    async requestToReset(req, res){

        const {email} = req.body

        if(!email){
            res.status(400).json({message: 'Please provide email!'})
        }

        try{
            const [rows, fields] = await connection.promise().execute("SELECT * FROM users WHERE email = ?", [email])
            if(rows.length === 0){
                return res.status(404).json({ message: "E-mail não encontrado" })
            }


            const tokenReset = jwt.sign({email}, process.env.SECRET_RESET_PASSWORD, {expiresIn: '15min'})


            await connection.promise().execute("UPDATE users SET token_reset = ?, token_expires = DATE_ADD(NOW(), INTERVAL 15 MINUTE) WHERE email = ?", [tokenReset, email])
            
            const transporter = mailer.createTransport({
                    host: "smtp.gmail.com",                
                    secure: true,
                    auth:{
                        user: process.env.MY_EMAIL,
                        pass: process.env.MY_PASSWORD 
                    }
            })
            
            const resetUrl = `${process.env.CLIENT_URL}/${tokenReset}`

            const receiver = {
                from: 'vinilocsilva@gmail.com',
                to: email,
                subject: 'Password Reset Request',
                html: `<p>Click on the link down here to reset your password!:</p>
                <a href="${resetUrl}">${resetUrl}</a> 
                <p>This link expires in 15min!</p>`
            }
            
    
            await transporter.sendMail(receiver)

            return res.status(200).json({message: 'Please check your email!'})
            
        }catch(err){
            console.log(err)
        }

    }

    async resetPassword(req, res){

        const {token, newPassword} = req.body 
        // console.log(token)

        try{

            const [rows, result] = await connection.promise().execute('SELECT * FROM users WHERE token_reset = ? AND token_expires > NOW()', [token])
            if(rows.length === 0){
                return res.status(400).json({ message: "Token inválido ou expirado" })
            }

            const email = rows[0].email
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds)
            
            await connection.promise().execute('UPDATE users SET password = ? WHERE email = ?',[hashedPassword, email], (err) =>{
                if(err) return res.status(500).json({message: "Error to reset the password!"})
            })

            
            await connection.promise().execute('UPDATE users SET token_reset = NULL WHERE token_reset = ?',[token], (err) =>{
                if(err) return res.status(500).json({message: 'Error to remove the token!'})
            })

            res.json({message: 'Password Successful Updated!'})
            

        }catch(err){
            console.log(err)
        }

    }

    async validatorTokenResetPassword(req, res){
        const {token} = req.params

        const [row, result] = await connection.promise().execute("SELECT * FROM users WHERE token_reset = ? AND token_expires > NOW()", [token])

        if(row.length === 0) return res.status(400).json({ message: "Token inválido ou expirado" });
        
        res.json({valid: true });
    }
        

    // not in used
    async validandoEmail(req, res){
        const {email} = req.body
        
        let sql = "SELECT * FROM users"

        connection.query(sql, (err, result) =>{
            if(err){
                return res.status(500).json({ error: 'Erro no servidor.' });
            }

            let ifExisteEmail = result.some(user => user.email == email)
            
            if(ifExisteEmail == true){
                res.status(400).json({error: "Email already exist!"})
                return
            }
            
        }) 
    }

}

export default new loginController()
