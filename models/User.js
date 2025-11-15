const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users', // Nombre real de la tabla en Supabase
    timestamps: true, // Sequelize manejará createdAt y updatedAt
    createdAt: 'created_at',
    updatedAt: false // No necesitamos `updatedAt` para la tabla de usuarios en este caso
});

module.exports = User;