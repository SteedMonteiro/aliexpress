const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    dailyOrders: {
        type: Array,
        required: true
    },
    monthlyOrders: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;