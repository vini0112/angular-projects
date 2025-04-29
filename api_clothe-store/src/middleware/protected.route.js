
import jwt from 'jsonwebtoken'

const protectedRoute = (req, res) => {
    let authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('Token not set!')
    }
    
    let token = authHeader.split(' ')[1];

    
    if(!token){
        return res.status(404).json({message: 'Token not found!'})
    }


    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        res.json({user: decoded})

    }catch(error){
        res.status(403).json({message: 'Invalid Token'})
    }

}

export default protectedRoute;
