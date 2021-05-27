const mongoose=require("mongoose");

const ProductSchema=new mongoose.Schema({
  name:{
    type:String,
    required:"Name is required"
  },
  image:{
    type:String,
    required:"Image is required"
  },
  price:{
    type:Number,
    required:"Price is required"
  },
  discount:{
    type:Number,
    required:"Enter discount even if its 0"
  },
  description:{
    type:String,
    min:[300,"Describe in min 300 words"],
    
  },
  inStock:{
    type:Boolean,
    required:"inStock is required"
  },
  fastDelivery:{
    type:Boolean,
    required:"fastDelivery is required"
  },
  genre:{
    type:String,
    required:"Genre is required"
  },
  author:{
    type:String,
    required:"Author is required"
  },
  rating:{
    type:Number,
    required:"Rating is required"
  }
})

const Product=mongoose.model("Products",ProductSchema);

module.exports=Product;