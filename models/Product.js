const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productDescription: { type: String, required: true },
    productQuantity: { type: Number, required: true }
});

const ProductData = mongoose.model('product', productSchema);
module.exports = ProductData;