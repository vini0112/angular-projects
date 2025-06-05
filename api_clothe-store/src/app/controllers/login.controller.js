
import loginService from "../services/login.service.js"



class loginController{

    // FIRST REQUEST OF THE APP        
    async isLogged(req, res){
        try{
            const token = req.cookies['refreshToken']
            

            if(!token){
                console.log('ℹ️  PREFLIGHT tested or No token found!') 
                return res.json({message: "PREFLIGHT tested (OPTION) or No token found!"});
            } 

            console.log("✅ It was just PREFLIGHT (OPTION) the token exist")


            const row = await loginService.checkIf_isLogged_service(token)
            res.json(row)
        }
        catch(err){
            res.status(404).json(err)
        }
    }

    
    // login
    async entrando(req, res){

        try{
            const row = await loginService.logging_in_service(req.body)

            if(row.developerMsg){
                res.cookie('refreshToken', row.refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    maxAge:  7 * 24 * 60 * 60 * 1000 
                })

                return res.json({developerMsg: "Developer_Logged!", accessToken: row.accessToken})
            }

            res.cookie('refreshToken', row.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000 
            }) 

            return res.json({ userMsg: 'Login realizado com sucesso!', accessToken: row.accessToken})

        }catch(err){
            res.status(404).json({err})
        }
        
    }


    async refreshToken(req, res){
        
        try{
            const refreshToken = req.cookies.refreshToken
            const row = await loginService.refreshingTokenService_service(refreshToken)
            return res.json(row)
        }
        catch(err){
            res.status(501).json(err)
        }
        
    }


    async login_auth0(req, res){

        try{

            const row = await loginService.loginAuth0_service(req)

            res.cookie('refreshToken', row.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000 
            }) 
            

            return res.json({userMsg: 'Login realizado com sucesso!', accessToken: row.accessToken})

        }catch(err){
            console.log('Error in login_auth0 constructor: ',err.message)
            return res.status(404).json(err.message)
        }

        
    }

    

    // criando usuario
    async adding(req, res){

        try{
            const row = await loginService.addingNewUser_service(req.body)
            return res.json(row)

        }catch(err){
            res.status(401).json(err)
        }

    }


    // logout
    async logOut(req, res){

        res.clearCookie('refreshToken', { 
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        })
        
        console.log('Logout Successfully')
        res.status(200).json({message: 'Succefull Logout'})
    }


    // forgot password
    async requestToReset(req, res){

        try{
            const row = await loginService.sendingEmailReq_ResetPassword_service(req.body)
            return res.json(row)

        }catch(err){
            res.status(404).json(err)
        }

    }

    async resetPassword(req, res){

        try{
            const row = await loginService.requestToResetPassword_service(req.body)
            return res.json(row)

        }catch(err){
            res.status(501).json(err)
        }

    }

    async validatorTokenResetPassword(req, res){
        

        try{
            const row = await loginService.validatorTokenResetPassword_service(req.params)
            return res.json(row)

        }catch(err){
            res.status(503).json(err)
        }

        
    } 

}

export default new loginController()
