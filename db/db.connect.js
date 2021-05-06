const mongoose = require("mongoose");
require('dotenv').config()

// TODO: move to .env/sec
const initializeDBConnection=async()=>{
  // Connecting to DB
  try{
    await mongoose.connect(process.env.connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    });

    console.log("successfully connected");
  }catch(err){
    console.error("mongoose connection failed...", err);
  }
  
}

module.exports =  initializeDBConnection 