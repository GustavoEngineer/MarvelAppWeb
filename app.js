require('dotenv').config(); // Carga las variables de entorno
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');

const app = express();

// Configuración de CORS para permitir solicitudes desde tu aplicación Angular
var corsOptions = {
    origin: "http://localhost:4200" // Cambia esto a la URL de tu app Angular cuando la tengas
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a la base de datos
db.sequelize.authenticate()
    .then(() => {
        console.log('Connection to Supabase database has been established successfully.');
        // Sincronizar modelos con la base de datos.
        // ¡Solo usar `alter: true` en desarrollo! En producción, maneja las migraciones.
        return db.sequelize.sync({ alter: true });
    })
    .then(() => {
        console.log('Database synchronized.');
    })
    .catch(err => {
        console.error('Unable to connect to the database or sync:', err);
    });

// Ruta principal
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Marvel Heroes API!' });
});

// Rutas de autenticación
require('./routes/auth.routes')(app);
// Rutas de héroes
require('./routes/hero.routes')(app);

// Ruta para la documentación de Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Middleware de manejo de errores (como se explica en la sección 2.4 de la guía)
app.use((err, req, res, next) => {
    console.error(err.stack); // Log del error para depuración
    res.status(500).send({ message: 'Something broke!', error: err.message });
});

// Puerto de la API (Vercel no usa app.listen en este contexto)
// Dejamos el PORT definido para referencias si es necesario, pero el .listen se exporta.
const PORT = process.env.PORT || 3000; // Puedes incluso remover esta línea si no la usas en otro lugar.

// Exportar la aplicación para que Vercel la use como una Serverless Function
module.exports = app;