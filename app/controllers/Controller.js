const autoBind=require('auto-bind');
const {validationResult}=require('express-validator')

module.exports=class Controller{
    constructor(){
        autoBind(this);
    }
     

    back(req , res) {
        req.flash('formData' , req.body);
        return res.redirect(req.header('Referer') || '/');
    }
}

