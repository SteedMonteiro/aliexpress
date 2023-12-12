const fs = require('fs');
const path = require('path');
const { log } = require('./logger');

function handleError(error) {
    const errorLogPath = path.join(__dirname, '../logs/error.log');
    const errorMessage = `${new Date().toISOString()} - ${error.message}\n`;

    log(errorMessage);

    fs.appendFile(errorLogPath, errorMessage, (err) => {
        if (err) {
            console.error('Failed to write to error log', err);
        }
    });
}

module.exports = {
    handleError
};