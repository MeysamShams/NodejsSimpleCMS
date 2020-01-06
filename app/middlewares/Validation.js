const {check}=require('express-validator');

class Validation{
    loginValidation(){
        return[
            check('username')
                .isLength({min:5})
                .withMessage("ایمیل وارد شده نامتبر است !"),
            
            check('password')
                 .isLength({min:6})
                 .withMessage("پسورد حداقل باید دارای 6 کاراکتر باشد !")
        ]
    }
}
module.exports=new Validation()