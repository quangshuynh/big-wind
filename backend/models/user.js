// backend/models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pffts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  jars: {
    type: DataTypes.TEXT, // Store as JSON string
    defaultValue: "[]",
  },
  upgrades:{
    type: DataTypes.TEXT,
    defaultValue: JSON.stringify({
        spicierDiet: 0,
        improvedDigestion: 0,
        buttMuscleTraining: 0,
    }),
  }
});

module.exports = User;