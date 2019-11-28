class Authentication{
    redirectIfNotAdmin(req,res,next){
        if(req.isAuthenticated() && req.user.role=="admin") return next();
        res.redirect("/")
    }


    redirectIfNotTeacher(req,res,next){
        if(req.isAuthenticated() && req.user.role=="teacher") return next();
        res.redirect("/")
    }


    redirectIfNotUser(req,res,next){
        if(req.isAuthenticated() && req.user.role=="user") return next();
        res.redirect("/")
    }


    redirectIfIsLoggedIn(req,res,next){
        if(!req.isAuthenticated) return next();
        res.redirect("/")
    }
}
module.exports=new Authentication();