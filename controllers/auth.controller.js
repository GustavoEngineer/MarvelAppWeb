const db = require('../models');
const User = db.User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send({ message: "Username and password are required!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username: username,
            password: hashedPassword
        });

        res.status(201).send({ message: "User registered successfully!", user: { id: user.id, username: user.username } });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).send({ message: "Username already exists!" });
        }
        res.status(500).send({ message: error.message || "Some error occurred while registering the user." });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send({ message: "Username and password are required!" });
        }

        const user = await User.findOne({ where: { username: username } });

        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            id: user.id,
            username: user.username,
            accessToken: token
        });
    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred while logging in." });
    }
};