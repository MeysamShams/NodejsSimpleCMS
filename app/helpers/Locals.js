const moment = require('moment-jalaali');
const path=require('path');
module.exports=class Locals{
    constructor(req,res){
        this.req=req,
        this.res=res
    }

    helpers(){
        return{
            auth:{
                check:this.req.isAuthenticated(),
                user:this.req.user
            },
            errors:this.req.flash('errors'),
            jalaliDate:this.jalaliDate,
            byteToMB:this.byteToMB,
            getExtName:this.getExtName
        }

    }
    jalaliDate(date){
              return moment(date)
    }
    byteToMB(size){
        return (size/1024/1024).toFixed(3)
    }
    getExtName(fileName){
        return path.extname(fileName)
    }
    
}
