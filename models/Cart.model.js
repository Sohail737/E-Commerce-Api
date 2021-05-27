const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const cartItem=new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    unique :"product already in cart",
    required:"product required"
  },
  quantity: {
    type: Number,
    required:"quantity required", 
    min:1
  },
  wishlisted:{
    type:Boolean,
    required:"Wishlisted property determines wether item is in cart or wishlist"
  }
})

const CartSchema=new Schema({
  cartItems:[cartItem]
})

const Cart=mongoose.model("Cart",CartSchema);

module.exports=Cart