
import {expressjwt} from 'express-jwt'
import jwksRsa from 'jwks-rsa'
import configAuth0 from '../config/auth0.js'


export default checkJwt = expressjwt({

    secret: jwksRsa.expressJwtSecret({
        jwksUri: `https://${configAuth0.domain}/.well-known/jwks.json`,
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
    }),
    audience: configAuth0.audience,
    issuer: `https://${configAuth0.domain}/`,
    algorithms: ['RS256']
    
})

