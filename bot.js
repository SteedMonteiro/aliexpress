const config = require('./config');
const db = require('./database/connection');
const { Product, FilteredProduct } = require('./database/models/Product');
const scrapeAliExpress = require('./scraper/aliexpressScraper');
const processData = require('./processor/dataProcessor');
const { handleError } = require('./utils/errorHandler');
const { log } = require('./utils/logger');
const { secure } = require('./utils/security');

const runBot = async () => {
  try {
    // Secure the bot
    secure();

    // Connect to the database
    await db.connect(config.db.connectionString);

    // Scrape AliExpress
    const products = await scrapeAliExpress();

    // Process the scraped data
    const filteredProducts = await processData(products);

    // Save the filtered results to the database
    await FilteredProduct.insertMany(filteredProducts);

    // Log the successful operation
    log('Bot run successfully');
  } catch (error) {
    // Handle any errors
    handleError(error);
  } finally {
    // Close the database connection
    await db.disconnect();
  }
};

// Run the bot on a regular schedule
setInterval(runBot, config.bot.interval);
