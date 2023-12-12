const nodemailer = require('nodemailer');
const { config } = require('../config');
const { log } = require('../utils/logger');
const { handleError } = require('../utils/errorHandler');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email,
    pass: config.password
  }
});

const notify = async (product) => {
  try {
    const mailOptions = {
      from: config.email,
      to: config.adminEmail,
      subject: 'New Product Alert',
      text: `A new product has been added that meets the filtering criteria. Product details: ${JSON.stringify(product)}`
    };

    await transporter.sendMail(mailOptions);
    log('Notification sent successfully');
  } catch (error) {
    handleError('Error in sending notification', error);
  }
};

module.exports = {
  notify
};