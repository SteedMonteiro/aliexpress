const config = {
    aliExpressUrl: 'https://www.aliexpress.com',
    db: {
        host: 'localhost',
        port: 27017,
        name: 'aliexpress_bot_db'
    },
    filterCriteria: {
        minDailyOrders: 10,
        maxMonthlyOrders: 5000
    },
    schedule: {
        runEvery: '1h' // bot runs every hour
    },
    notification: {
        email: 'admin@example.com'
    }
};

module.exports = config;