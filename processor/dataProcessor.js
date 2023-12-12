const mongoose = require('mongoose');
const Product = require('../database/models/Product');
const FilteredProduct = require('../database/models/FilteredProduct');
const notifier = require('../notifier/notifier');
const { handleError } = require('../utils/errorHandler');
const { log } = require('../utils/logger');

async function processData() {
    try {
        const products = await Product.find({});
        const filteredProducts = products.filter(product => {
            const dailyOrders = product.dailyOrders;
            const monthlyOrders = product.monthlyOrders;
            const hasMinimumDailyOrders = dailyOrders.every(orderCount => orderCount >= 10);
            const hasLessMonthlyOrders = monthlyOrders <= 5000;
            return hasMinimumDailyOrders && hasLessMonthlyOrders;
        });

        for (let product of filteredProducts) {
            const existingProduct = await FilteredProduct.findOne({ title: product.title });
            if (!existingProduct) {
                const newProduct = new FilteredProduct({
                    title: product.title,
                    price: product.price,
                    dailyOrders: product.dailyOrders,
                    monthlyOrders: product.monthlyOrders
                });
                await newProduct.save();
                notifier.notify('newFilteredProduct', newProduct);
            }
        }
    } catch (error) {
        handleError(error);
        log('Error occurred while processing data', error);
    }
}

module.exports = {
    processData
};