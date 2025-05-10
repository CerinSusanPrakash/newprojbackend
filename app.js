
const express = require('express');
require('dotenv').config();
require('./connection');


const authRoutes = require('./routes/auth');

const app = express();
const productModel = require('./models/Product');
//  Middleware to parse JSON
app.use(express.json());
app.post('/addproducts',async(req,res)=>{
    try {
        var item=req.body;
        const data_add=new productModel(item);
        const data=await data_add.save();
        res.send('Post sucessful')
    } catch (error) {
        console.log(error)
    }
})

//  Routes
app.use('/api/auth', authRoutes);

app.listen(5000, () => {
  console.log('Server running on PORT 5000');
});

