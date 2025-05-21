
import jwt from 'jsonwebtoken'
import a from '../services/login.service.js'


export default function sokectAuth(socket, next){
    const token = socket.handshake.query.token;
    
    if(!token) return next(new Error('No token!'))

    try{
        // console.log()
        const user = jwt.verify(token, process.env.SECRET_KEY)
        console.log(user)
        socket.user = user
        next()
    }catch(err){
        
        if(err.name === 'TokenExpiredError'){
            fetch('http://localhost:3000/refreshToken', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('accessToken', data.accessToken)
            })
            
            .catch((err) =>{
                console.log('Error Calling the refresh token from Socket.Auth: ',err.message)
            })
        }
        next(new Error('Error in Socket_Auth: ',err.message))
    }
}

