
import jwt from 'jsonwebtoken';
import config from '../config/env.js';


const protectedRoute = (req, res, next) => {
    let authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).send('No credentials sent!')
    }
    
    let token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, config.JWT.SECRET_KEY);

        console.log('✅ Authorization Header Received!')
        req.user = decoded // Attach the decoded user information to the request object
        next()

    }catch(err){
        console.error('❌ Token invalid:', err.message);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

}

export default protectedRoute;
