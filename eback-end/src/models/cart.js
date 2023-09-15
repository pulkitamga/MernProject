const mongoose=require('mongoose');
const cartSchmea=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',require:true},
    cartItems:[
        {
            product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',require:true},
            quantity:{type:Number,default:1},
            price:{type:Number,require:true},
            
        }

    ]
},{timestamps:true})
module.exports=mongoose.model('Cart',cartSchmea)