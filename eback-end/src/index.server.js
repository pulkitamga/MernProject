const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const path=require('path');


//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category/category');
const productRoutes = require('./routes/product/product');
const cartRoutes = require('./routes/cart/cart');
//env variable 
env.config();


//mongo connection
//mongodb+srv://pulkitamga0610:<password>@cluster0.1wsdsx4.mongodb.net/
mongoose.connect(
    `mongodb+srv://pulkitamga0610:ZgVyEyIrLtv0q0nS@cluster0.1wsdsx4.mongodb.net/Ecommerce?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }
).then(() => {
    console.log('Database Connected')
});
app.use(express.json());
app.use('/public',express.static(path.join(__dirname,'uploads')));
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

// app.get('/',(req,res,next)=>{
//      res.status(200).json({
//         message:'Hello server'
//      });
// });

// app.post('/data',(req,res,next)=>{
//     res.status(200).json({
//         message:req.body
//     });
// });
app.listen(process.env.PORT, () => {
    console.log(`server Is Connected and runnig on port ${process.env.Port}`);
});