const axios = require('axios');
const cheerio = require('cheerio');
const { handleError, log } = require('../utils/errorHandler.js');
const { secure } = require('../utils/security.js');

const scrapeAliExpress = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const products = [];

    $('.product-item').each((index, element) => {
      const title = $(element).find('.product-title').text();
      const price = $(element).find('.product-price').text();
      const dailyOrders = $(element).find('.daily-orders').text();
      const monthlyOrders = $(element).find('.monthly-orders').text();

      const product = {
        title: secure(title),
        price: secure(price),
        dailyOrders: secure(dailyOrders),
        monthlyOrders: secure(monthlyOrders),
      };

      products.push(product);
    });

    log('Scraping completed successfully');
    return products;
  } catch (error) {
    handleError('Scraping failed', error);
  }
};

module.exports = { scrapeAliExpress };