const controller = require('../controllers/auth.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /**
     * @swagger
     * tags:
     *   name: Auth
     *   description: Autenticación de usuarios
     */

    /**
     * @swagger
     * /api/auth/register:
     *   post:
     *     summary: Registrar un nuevo usuario
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - username
     *               - password
     *             properties:
     *               username:
     *                 type: string
     *                 example: nuevoUsuario
     *               password:
     *                 type: string
     *                 example: mipasswordseguro
     *     responses:
     *       201:
     *         description: Usuario registrado exitosamente
     *       400:
     *         description: Faltan username o password
     *       409:
     *         description: El username ya existe
     *       500:
     *         description: Error del servidor
     */
    app.post("/api/auth/register", controller.register);

    /**
     * @swagger
     * /api/auth/login:
     *   post:
     *     summary: Iniciar sesión de usuario
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - username
     *               - password
     *             properties:
     *               username:
     *                 type: string
     *                 example: usuarioExistente
     *               password:
     *                 type: string
     *                 example: supassword
     *     responses:
     *       200:
     *         description: Inicio de sesión exitoso, devuelve token de acceso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                 username:
     *                   type: string
     *                 accessToken:
     *                   type: string
     *       400:
     *         description: Faltan username o password
     *       401:
     *         description: Contraseña inválida
     *       404:
     *         description: Usuario no encontrado
     *       500:
     *         description: Error del servidor
     */
    app.post("/api/auth/login", controller.login);
};