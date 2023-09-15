const express = require('express');
const {signup, signin}=require('../controller/auth');
const router = express.Router();
const { validateSignUpRequest, isRequestValidated, validateSignInRequest } = require('../validators/auth');

router.post('/signup',validateSignUpRequest,isRequestValidated,signup);
router.post('/signin',validateSignInRequest,isRequestValidated,signin);
// router.post('/profile',requireSignin,(req,res)=>{
//     res.status(200).json({
//         user:'profile'
//     });
// })



module.exports = router;