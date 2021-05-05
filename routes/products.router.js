const express=require ("express");
const router=express.Router();
const Product=require ("../models/Product.model.js");

router.route("/").get(async (req,res)=>{
  try{
    const products= await Product.find({});
    res.json({success:true,data:products})
  }catch(err){
    res.status(500).json({success:false,message:err.message})
  }
}).post(async (req,res)=>{
  try{
    const product=req.body;
    const NewProduct=new Product(product);
    const savedProduct=await NewProduct.save();
    res.status(201).json({success:true,data:savedProduct})
  }catch(err){
    res.status(500).json({success:false,message:err.message
  })
  }
})

router.route("/:id").get(async(req,res)=>{
  try{
    const id=req.params.id
    const product=await Product.findById(id);
    res.json({success:true,data:product})
  }catch(err){
    res.status(500).json({success:false,message:err.message
  })
  }
  
}
)
module.exports=router