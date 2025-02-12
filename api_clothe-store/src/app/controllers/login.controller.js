import loginRepository from "../repositories/login.repository.js"
import connection from "../database/connection.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const saltRounds = 10;
const secretKey = "chaveSecretaSuperSegura";

class loginController{

    // getting by id
    async getById(req, res){
        const id = req.params.id
        const row = await loginRepository.findById(id)
        res.json(row) 
    }

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

            // res.cookie('authToken', token, {
            //     httpOnly: true, // impede acesso ao cookie via JavaScript do lado do cliente
            //     secure: process.env.NODE_ENV === 'production', // Somente HTTPS em produção
            //     sameSite: 'strict' // Evita envio do cookie em requisições de outros sites
            // }) 

            res.json({ message: 'Login realizado com sucesso!', token});
        })

    }



    async validandoEmail(req, res){
        const {email} = req.body
        
        let sql = "SELECT * FROM users"

        connection.query(sql, (err, result) =>{
            if(err){
                return res.status(500).json({ error: 'Erro no servidor.' });
            }
            
            let ifExisteEmail = result.some(user => user.email == email)
            res.json({ifExisteEmail})
        })
    }


    // criando usuario
    async adding(req, res){

        const {password, email, username} = req.body

        if(!email || !password || !username){
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
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

    }

    

}

export default new loginController()
