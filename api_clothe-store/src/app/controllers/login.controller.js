import loginRepository from "../repositories/login.repository.js"
import connection from "../database/connection.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const saltRounds = 10;
const secretKey = "chaveSecretaSuperSegura";

class loginController{

    // login
    async entrando(req, res){
        const {email, password} = req.body
        
        if(!email || !password){
            return res.status(400).json({ error: 'Username e password são obrigatórios.' });
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

            const match = await bcrypt.compare(password, user.password)
            
            if(!match){
                return res.status(401).json({erro: 'Wrong password'})
            }
            
            const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

            res.cookie('token', token, {
                httpOnly: true, // impede acesso ao cookie via JavaScript do lado do cliente
                secure: true, // Somente HTTPS em produção
                sameSite: 'none', // Evita envio do cookie em requisições de outros sites
                maxAge: 60 * 60 * 1000 // expirar em 1h
            }) 

            res.json({ message: 'Login realizado com sucesso!'});
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



    // criando usuario
    async adding(req, res){

        const {password, email, username} = req.body

        if(!email || !password || !username){
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        let sql = "SELECT * FROM users"

        connection.query(sql, async(err, result) =>{
            if(err){
                return res.status(500).json({ error: 'Erro no servidor.' });
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
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        })
        res.status(200).json({message: 'Succefull Logout'})
    }

    // forgot password
    async resetPassword(req, res){

        const {email} = req.body

        if(!email){
            res.status(400).json({message: 'Please provide email!'})
        }

        const sql = 'SELECT * FROM users WHERE email = ? LIMIT 1'
        connection.execute(sql, [email], (err, result) =>{
            if(err){
                console.error('ERROR while accessing the Database')
            }

            let ifExisteEmail = result.some(user => user.email == email)
            
            if(ifExisteEmail == false){
                res.status(400).json({error: "Email not found!"})
                return
            }

            

        })

    }

}

export default new loginController()
