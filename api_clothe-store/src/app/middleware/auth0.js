
import jwksRsa from 'jwks-rsa'
import jwt from 'jsonwebtoken'
import config from '../config/env.js'


// retrieve signing keys from a JWKS (JSON Web Key Set) endpoint.
const client = jwksRsa({
    // points to the Auth0 JWKS endpoint where the public keys used to sign tokens are published.
    jwksUri: `https://${config.AUTH0.AUTH0_DOMAIN}/.well-known/jwks.json`
})

// we pass this getKey in the JWT_verify to retrieve the publick key for sicnature verification
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
    const {token} = req.body

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









