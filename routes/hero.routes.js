const controller = require('../controllers/hero.controller');
const { verifyToken } = require('../middleware/authJwt');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, Authorization"
        );
        next();
    });

    /**
     * @swagger
     * tags:
     *   name: Heroes
     *   description: Gestión de héroes de Marvel
     */

    /**
     * @swagger
     * /api/heroes:
     *   post:
     *     summary: Crea un nuevo héroe (Requiere Token de Autenticación)
     *     tags: [Heroes]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - nombre_personaje
     *             properties:
     *               nombre_personaje:
     *                 type: string
     *                 example: Spider-Man
     *               persona_tras_mascara:
     *                 type: string
     *                 example: Peter Parker
     *               ciudad_pertenece:
     *                 type: string
     *                 example: New York
     *               enemigos_personaje:
     *                 type: string
     *                 example: Duende Verde, Doctor Octopus
     *               edad:
     *                 type: integer
     *                 example: 25
     *     responses:
     *       201:
     *         description: Héroe creado exitosamente
     *       400:
     *         description: El nombre del personaje es obligatorio
     *       401:
     *         description: No autorizado (token inválido o expirado)
     *       403:
     *         description: No se proporcionó token
     *       500:
     *         description: Error del servidor
     */
    app.post("/api/heroes", [verifyToken], controller.create);

    /**
     * @swagger
     * /api/heroes:
     *   get:
     *     summary: Obtiene todos los héroes (Requiere Token de Autenticación)
     *     tags: [Heroes]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de héroes
     *       401:
     *         description: No autorizado
     *       403:
     *         description: No se proporcionó token
     *       500:
     *         description: Error del servidor
     */
    app.get("/api/heroes", [verifyToken], controller.findAll);

    /**
     * @swagger
     * /api/heroes/{id}:
     *   get:
     *     summary: Obtiene un héroe por ID (Requiere Token de Autenticación)
     *     tags: [Heroes]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *           format: uuid
     *         required: true
     *         description: ID del héroe
     *     responses:
     *       200:
     *         description: Información del héroe
     *       401:
     *         description: No autorizado
     *       403:
     *         description: No se proporcionó token
     *       404:
     *         description: Héroe no encontrado
     *       500:
     *         description: Error del servidor
     */
    app.get("/api/heroes/:id", [verifyToken], controller.findOne);

    /**
     * @swagger
     * /api/heroes/{id}:
     *   put:
     *     summary: Actualiza un héroe por ID (Requiere Token de Autenticación)
     *     tags: [Heroes]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *           format: uuid
     *         required: true
     *         description: ID del héroe
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nombre_personaje:
     *                 type: string
     *                 example: Spider-Man (Miles Morales)
     *               persona_tras_mascara:
     *                 type: string
     *                 example: Miles Morales
     *               ciudad_pertenece:
     *                 type: string
     *                 example: Brooklyn
     *               enemigos_personaje:
     *                 type: string
     *                 example: Kingpin, El Merodeador
     *               edad:
     *                 type: integer
     *                 example: 17
     *     responses:
     *       200:
     *         description: Héroe actualizado exitosamente
     *       401:
     *         description: No autorizado
     *       403:
     *         description: No se proporcionó token
     *       404:
     *         description: Héroe no encontrado o req.body vacío
     *       500:
     *         description: Error del servidor
     */
    app.put("/api/heroes/:id", [verifyToken], controller.update);

    /**
     * @swagger
     * /api/heroes/{id}:
     *   delete:
     *     summary: Elimina un héroe por ID (Requiere Token de Autenticación)
     *     tags: [Heroes]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *           format: uuid
     *         required: true
     *         description: ID del héroe
     *     responses:
     *       200:
     *         description: Héroe eliminado exitosamente
     *       401:
     *         description: No autorizado
     *       403:
     *         description: No se proporcionó token
     *       404:
     *         description: Héroe no encontrado
     *       500:
     *         description: Error del servidor
     */
    app.delete("/api/heroes/:id", [verifyToken], controller.delete);
};