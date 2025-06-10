

const protectedRoute = (req, res, next) => {
    let authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).send('Token not set!')
    }
    
    let token = authHeader.split(' ')[1];

    
    if(!token){
        return res.status(404).json({message: 'Token not found!'})
    }

    console.log('✅ Authorization Header Received!')
    next()

}

export default protectedRoute;
