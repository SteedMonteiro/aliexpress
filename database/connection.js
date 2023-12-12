const mongoose = require('mongoose');
const config = require('../config');

const db = mongoose.connection;

mongoose.connect(config.db.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
    console.log('Connected to MongoDB successfully!');
});

module.exports = db;