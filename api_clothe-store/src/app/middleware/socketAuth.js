
import jwt from 'jsonwebtoken'
import config from '../config/env.js';

export default function sokectAuth(socket, next){
    const token = socket.handshake.query.token;
    
    if(!token) return next(new Error('No token!'))

    try{
        const user = jwt.verify(token, config.JWT.SECRET_KEY)
        socket.user = user
        next()
    }catch(err){
        
        if(err.name === 'TokenExpiredError'){
            next(new Error('EXPIRED_TOKEN'))
        }
        return next(new Error('Error in Socket_Auth: ',err.message))
    }
}

