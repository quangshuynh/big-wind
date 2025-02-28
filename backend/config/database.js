// backend/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // The SQLite database file
  logging: false,             // Disable SQL logging in console (optional)
});

module.exports = sequelize;