const express = require('express');
const {signup, signin}=require('../../controller/admin/auth');
const router = express.Router();
const { validateSignUpRequest, isRequestValidated } = require('../../validators/auth');
const { validateSignInRequest } = require('../../validators/auth');

router.post('/admin/signup',validateSignUpRequest,isRequestValidated,signup);
router.post('/admin/signin',validateSignInRequest,isRequestValidated,signin);
// router.post('/profile',requireSignin,(req,res)=>{
//     res.status(200).json({
//         user:'profile'
//     });
// })



module.exports = router;