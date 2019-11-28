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
            errors:this.req.flash('errors')
        }
    }
}
