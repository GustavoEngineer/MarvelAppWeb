import db from '../models/index.js';
import { verifyToken } from '../middleware/authJwt.js';

const Hero = db.Hero;

export default async function handler(req, res) {
    // Permitir CORS y headers
    res.setHeader('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Autenticación para POST
    if (req.method === 'POST') {
        // Verificar token
        return verifyToken(req, res, async () => {
            try {
                const { nombre_personaje, persona_tras_mascara, ciudad_pertenece, enemigos_personaje, edad } = req.body;
                if (!nombre_personaje) {
                    return res.status(400).json({ message: 'El nombre del personaje es obligatorio.' });
                }
                const hero = await Hero.create({
                    nombre_personaje,
                    persona_tras_mascara,
                    ciudad_pertenece,
                    enemigos_personaje,
                    edad
                });
                return res.status(201).json(hero);
            } catch (error) {
                return res.status(500).json({ message: error.message || 'Ocurrió un error al crear el héroe.' });
            }
        });
    }

    // GET: obtener todos los héroes
    if (req.method === 'GET') {
        try {
            const heroes = await Hero.findAll();
            return res.status(200).json(heroes);
        } catch (error) {
            return res.status(500).json({ message: error.message || 'Ocurrió un error al recuperar los héroes.' });
        }
    }

    // Otros métodos no permitidos
    res.status(405).json({ message: 'Método no permitido.' });
}
