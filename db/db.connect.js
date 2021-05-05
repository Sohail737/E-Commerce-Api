const mongoose = require("mongoose");

// TODO: move to .env/sec
const initializeDBConnection=async()=>{
  // Connecting to DB
  try{
    await mongoose.connect("mongodb+srv://asohail737:Exits840bulged@neog-cluster.kdlg7.mongodb.net/inventory?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    });

    console.log("successfully connected");
  }catch(err){
    console.error("mongoose connection failed...", err);
  }
  
}

module.exports =  initializeDBConnection 