const mongoose = require('mongoose');
const { Schema } = mongoose;

const FilteredProductSchema = new Schema({
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

module.exports = mongoose.model('FilteredProduct', FilteredProductSchema);