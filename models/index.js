const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Hero = require('./Hero');

// Aquí podrías definir relaciones si las tuvieras entre User y Hero (ej. un usuario crea un héroe)

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User;
db.Hero = Hero;

module.exports = db;