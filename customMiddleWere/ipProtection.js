const fetch = require('node-fetch')

module.exports={
   ipProtection: async function  (req,res,next){
       try{
        const url= process.env.MY_IP_URL
        const data = await fetch(url)
        const my = await data.json()
        if(my.ip===process.env.MY_IP){
            next()
        }else{
            res.send('no auth')
        }
       }catch(err){
           console.log(err)
           next()
       }
        
      
    }
}



