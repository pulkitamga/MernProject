const Product=require('../../models/product');
const slugify=require('slugify');
const shortid=require('shortid');
 

exports.createProduct=(req,res)=>{
    //res.status(200).json({message:'Hello'});
    //res.status(200).json({file:req.files, body:req.body});
    const{
        name,price,description,category,createdBy,quantity
    }=req.body;

    let productPictures=[];
    if(req.files.length>0){
        productPictures=req.files.map(file=>{
        return {img:file.filename}
       });
    }
    const product=new Product({
        name:name,
        slug:slugify(name),
        price,
        description,
        productPictures,
        category,
        quantity,
        createdBy:req.user._id
    });
    product.save().then((data)=>{
         res.status(201).send({message:"Product Added Sucessfully",data})
    }).catch((error)=>{
     res.status(400).send(error.message)
    });
};


