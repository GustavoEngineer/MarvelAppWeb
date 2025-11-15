require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URI, {
    dialect: 'postgres',
    logging: false, // Puedes establecer a true para ver las consultas SQL en consola
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Esto puede ser necesario para conexiones SSL a Supabase
        }
    }
});

module.exports = sequelize;