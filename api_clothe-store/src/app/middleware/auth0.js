
import {expressjwt} from 'express-jwt'
import jwksRsa from 'jwks-rsa'
import jwt from 'jsonwebtoken'


const client = jwksRsa({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
})

function getKey(header, callback) {
    client.getSigningKey(header.kid, function (err, key) {
        if (err) {
        return callback(err);
        }
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
    });
}


export async function verifyTokenFromBody(req, res, next) {
    const {token, user} = req.body

    if (!token) {
        return res.status(400).json({ message: 'tokenId missing' });
    }

    const decodedToken = jwt.decode(token)

    
    jwt.verify(
        token,
        getKey,
        {
            audience: decodedToken.aud,
            issuer: decodedToken.iss,
            algorithms: ['RS256'],
        },
        (err, decoded) => {
            if (err) {
                console.log(err.message)
                return res.status(401).json({ message: 'Invalid token', error: err });
            }
            req.user = decoded; 
            next();
        }
    );

}



// export default checkJwt = expressjwt({

//     secret: jwksRsa.expressJwtSecret({
//         jwksUri: `https://${configAuth0.domain}/.well-known/jwks.json`,
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 5,
//     }),
//     audience: configAuth0.audience,
//     issuer: `https://${configAuth0.domain}/`,
//     algorithms: ['RS256']
    
// })





