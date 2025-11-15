const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Hero = sequelize.define('Hero', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nombre_personaje: {
        type: DataTypes.STRING,
        allowNull: false
    },
    persona_tras_mascara: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ciudad_pertenece: {
        type: DataTypes.STRING,
        allowNull: true
    },
    enemigos_personaje: {
        type: DataTypes.TEXT, // Almacenar como texto, puedes manejarlo como array en la app
        allowNull: true
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'heroes', // Nombre real de la tabla en Supabase
    timestamps: true, // Sequelize manejará createdAt y updatedAt
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Hero;