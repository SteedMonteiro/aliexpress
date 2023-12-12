const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/log.txt');

const log = (message) => {
    const timestamp = new Date().toISOString();
    const formattedMessage = `${timestamp} - ${message}\n`;

    fs.appendFile(logFilePath, formattedMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
};

module.exports = {
    log
};