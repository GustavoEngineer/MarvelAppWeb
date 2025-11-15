import db from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const User = db.User;

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Registro de usuario
    if (req.url.endsWith('/register') && req.method === 'POST') {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required!' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, password: hashedPassword });
            return res.status(201).json({ message: 'User registered successfully!', user: { id: user.id, username: user.username } });
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ message: 'Username already exists!' });
            }
            return res.status(500).json({ message: error.message || 'Some error occurred while registering the user.' });
        }
    }

    // Login de usuario
    if (req.url.endsWith('/login') && req.method === 'POST') {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required!' });
            }
            const user = await User.findOne({ where: { username } });
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            const passwordIsValid = await bcrypt.compare(password, user.password);
            if (!passwordIsValid) {
                return res.status(401).json({ accessToken: null, message: 'Invalid Password!' });
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
            return res.status(200).json({ id: user.id, username: user.username, accessToken: token });
        } catch (error) {
            return res.status(500).json({ message: error.message || 'Some error occurred while logging in.' });
        }
    }

    res.status(405).json({ message: 'Método o endpoint no permitido.' });
}
