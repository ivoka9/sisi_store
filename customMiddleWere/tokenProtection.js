const { verify } = require("jsonwebtoken")

const jws = require('jsonwebtoken')

module.exports={
    tokenProtection : (req,res,next)=>{
        try{
            const token =jws.decode(req.body.token)

            if(token.isAdmin){
                next()
            }else{
                res.sendStatus(403).send('Forbidden') 
            }
        }catch(err){
            console.log(err)
            res.sendStatus(403).send('Forbidden')
        }
    }
}