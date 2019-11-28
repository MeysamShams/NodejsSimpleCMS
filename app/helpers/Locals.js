module.exports=class Locals{
    constructor(req,res){
        this.req=req,
        this.res=res
    }

    helpers(){
        return{
            auth:0,
            errors:this.req.flash('errors')
        }
    }
}
