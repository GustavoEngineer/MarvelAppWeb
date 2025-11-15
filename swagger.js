const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Marvel Heroes API (Express.js)',
            version: '1.0.0',
            description: 'API RESTful para gestionar héroes de Marvel con autenticación, CRUD y conexión a Supabase.',
            contact: {
                name: 'Tu Nombre',
                email: 'tu.email@example.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de Desarrollo Local'
            },
            {
                url: 'https://tu-api-en-la-nube.com', // ¡Cambia esto por tu URL de despliegue!
                description: 'Servidor de Producción en la Nube'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Token de autenticación JWT (ej. "Bearer eyJhbGciOiJIUzI1Ni...").'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./routes/*.js', './models/*.js'], // Rutas donde están tus comentarios JSDoc para Swagger
};

const specs = swaggerJsdoc(options);

module.exports = specs;