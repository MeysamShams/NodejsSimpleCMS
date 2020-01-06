const bcrypt=require('bcryptjs');

let passwordHashing=(password)=> new Promise((resolve,reject)=>{
    bcrypt.genSalt(10,(err,salt)=>{
        if(err) reject(err)
        bcrypt.hash(password,salt,(err,hash)=>{
            if(err) reject(err)
            resolve(hash)
        })
    })
})

module.exports=passwordHashing