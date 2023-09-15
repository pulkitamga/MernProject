const { check,validationResult }=require('express-validator');
exports.validateSignUpRequest=[
    check('firstname').isEmpty().withMessage('Firstname is required'),
    check('lastname').isEmpty().withMessage('Last name is reuired'),
    check('email').isEmail().withMessage(' Valid Email is required'),
    check('password').isLength({min:6}).withMessage('Password must be at least 6 character long')
]

exports.validateSignInRequest=[
    check('email').isEmail().withMessage('Valid Email is Required'),
    check('password').isLength({min:6}).withMessage('Password must be at 6 character long')
]
exports.isRequestValidated=(req,res,next)=>{
     const errors=validationResult(req);
     if(errors.array().length>0)
     {
        return res.status(400).json({error:errors.array()[0].msg})
     }
      next();
}