const express=require("express");
const router=express.Router();
const Cart=require("../models/Cart.model");
const _ =require("lodash")


router.route("/").get(async(req,res)=>{
  try{
    // const cartItems=await Cart.findById("6089c4ceedcca80d8c044425");
    const cart=await Cart.find({}).populate({path:'cartItems',populate:{
      path:'product',
      model:'Products',
      select:['name','price','image','discount','fastDelivery','inStock',]
    }}).exec();
    const cartItems=cart.length>0?cart[0]:null
    res.json({success:true,data:cartItems})
  }catch(err){
  res.status(500).json({success:false,message:err.message})
  }
}).post(async(req,res)=>{
  try{
    const cartItem=req.body;
    const cart=await Cart.find({});
    if(cart.length>0){
      cart[0].cartItems.unshift(cartItem);
      const newCartItem = cart[0].cartItems[0];
      await cart[0].save();
      const cartToReturn=await Cart.find({}).populate({path:'cartItems',populate:{
      path:'product',
      model:'Products',
      select:['name','price','image','discount','fastDelivery','inStock',]
    }}).exec();

    const cartItemToReturn=cartToReturn[0].cartItems.id(newCartItem._id)
      return res.status(201).json({success:true,data:cartItemToReturn})
    }else{
      const cartToSave={cartItems:[]}
      const NewCart=new Cart(cartToSave);
      const savedCart=await NewCart.save()
      return res.status(201).json({success:true,data:savedCart})
    }
    
    
  }catch(err){
    res.status(500).json({success:false,message:err.message})
  }
  
})

router.route("/:id").post(async(req,res)=>{
  try{
  const updateCartItem=req.body;
  const id=req.params.id
  const cart=await await Cart.find({});
  
  let cartItem=cart[0].cartItems.id(id);
  cartItem=_.extend(cartItem,updateCartItem);

  const savedCart=await cart[0].save();

  const savedCartItem=savedCart.cartItems.id(id);

  res.status(200).json({success:true,data:savedCartItem})

  }catch(err){
    res.status(500).json({success:false,message:err.message})
  }
  
}).delete(async (req,res)=>{
  try{
  const id=req.params.id;
  const cart=await Cart.find({});
  
  cart[0].cartItems.id(id).remove();

  cart[0].save();

  res.json({success:true,data:{message:"Cart item deleted successfully"}});
  }catch(err){
    res.status(500).json({success:false,message:err.message})
  }
  

})


module.exports=router