
import jwt from 'jsonwebtoken'


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if(!authHeader) return res.sendStatus(401)


    const token = authHeader.split(' ')[1] // takes the second parameter of authHeader -> token
    jwt.verify(
        token,
        process.env.SECRET_KEY,
        (err, decoded) =>{
            if(err) return res.sendStatus(401) // invalid token
            req.user = decoded.username
            next()
        }
    ) 

}


export default verifyJWT
