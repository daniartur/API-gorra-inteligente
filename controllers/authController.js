const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro
exports.register = async (req, res) => {
    const { usuario, correo, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
        [usuario, correo, hashedPassword],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Usuario registrado exitosamente.' });
        }
    );
};

// Inicio de sesión
exports.login = (req, res) => {
    const { user, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [user], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado.' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta.'});

        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    });
};

// Editar
exports.editUser = async (req, res) => {
    const { id } = req.params;
    const { usuario, correo, contraseña } = req.body;

    const params = [];
    let query = 'UPDATE usuarios SET usuario = ?, correo = ?';
    params.push(usuario, correo);

    if (contraseña) {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        query += ', contraseña = ?';
        params.push(hashedPassword);
    }

    query += ' WHERE id = ?';
    params.push(id);

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado.' });
        res.json({ message: 'Usuario actualizado exitosamente.' });
    });
};


// Eliminar
exports.deleteUser = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado.' });
        res.json({ message: 'Usuario eliminado exitosamente.' });
    });
};
