const express=require('express');
const{addItemToCart}=require('../../controller/cart/cart');
const{requireSignin,userMiddleware}=require('../../common-middleware');
const router=express.Router();

router.post('/user/cart/add',requireSignin,addItemToCart);

module.exports=router;

//requireSign,userMiddleware