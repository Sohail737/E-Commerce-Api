const express = require('express');
const bodyParser=require("body-parser");
const cors=require("cors");
const products=require("./routes/products.router.js");
const cartItems=require("./routes/cartItems.router.js");
const initializeDBConnection=require("./db/db.connect.js") 

const app = express();

app.use(bodyParser.json());

app.use(cors());

const PORT=3000

initializeDBConnection();

app.use("/products",products)
app.use("/cart-items",cartItems)

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(PORT, () => {
  console.log('server started on port',PORT);
});