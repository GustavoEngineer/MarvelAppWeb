const db = require('../models');
const Hero = db.Hero;

// Crear un nuevo Héroe
exports.create = async (req, res) => {
    try {
        const { nombre_personaje, persona_tras_mascara, ciudad_pertenece, enemigos_personaje, edad } = req.body;

        // Validación básica
        if (!nombre_personaje) {
            return res.status(400).send({ message: "El nombre del personaje es obligatorio." });
        }

        const hero = await Hero.create({
            nombre_personaje,
            persona_tras_mascara,
            ciudad_pertenece,
            enemigos_personaje,
            edad
        });

        res.status(201).send(hero);
    } catch (error) {
        res.status(500).send({ message: error.message || "Ocurrió un error al crear el héroe." });
    }
};

// Obtener todos los Héroes
exports.findAll = async (req, res) => {
    try {
        const heroes = await Hero.findAll();
        res.status(200).send(heroes);
    } catch (error) {
        res.status(500).send({ message: error.message || "Ocurrió un error al recuperar los héroes." });
    }
};

// Obtener un Héroe por ID
exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const hero = await Hero.findByPk(id);

        if (!hero) {
            return res.status(404).send({ message: `Héroe con id=${id} no encontrado.` });
        }

        res.status(200).send(hero);
    } catch (error) {
        res.status(500).send({ message: error.message || `Error al recuperar héroe con id=${req.params.id}.` });
    }
};

// Actualizar un Héroe por ID
exports.update = async (req, res) => {
    try {
        const id = req.params.id;

        const [numAffectedRows] = await Hero.update(req.body, {
            where: { id: id }
        });

        if (numAffectedRows === 1) {
            res.status(200).send({ message: "El héroe fue actualizado correctamente." });
        } else {
            res.status(404).send({ message: `No se pudo actualizar el héroe con id=${id}. Tal vez el héroe no fue encontrado o req.body está vacío.` });
        }
    } catch (error) {
        res.status(500).send({ message: error.message || `Error al actualizar héroe con id=${req.params.id}.` });
    }
};

// Eliminar un Héroe por ID
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        const numDeletedRows = await Hero.destroy({
            where: { id: id }
        });

        if (numDeletedRows === 1) {
            res.status(200).send({ message: "El héroe fue eliminado correctamente." });
        } else {
            res.status(404).send({ message: `No se pudo eliminar el héroe con id=${id}. Tal vez el héroe no fue encontrado.` });
        }
    } catch (error) {
        res.status(500).send({ message: error.message || `Error al eliminar héroe con id=${req.params.id}.` });
    }
};