const db = require('../config/db');

// Registrar
exports.registerHat = (req, res) => {
    const { nombre, codigo } = req.body;

    db.query(
        'INSERT INTO gorras (nombre, codigo) VALUES (?, ?)',
        [nombre, codigo],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Gorra registrada exitosamente.' });
        }
    );
};

// Editar
exports.editHat = (req, res) => {
    const { id } = req.params;
    const { nombre, codigo } = req.body;

    db.query(
        'UPDATE gorras SET nombre = ?, codigo = ? WHERE id = ?',
        [nombre, codigo, id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.affectedRows === 0) return res.status(404).json({ message: 'Gorra no encontrada.' });
            res.json({ message: 'Gorra actualizada exitosamente.' });
        }
    );
};

// Eliminar
exports.deleteHat = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM gorras WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Gorra no encontrada.' });
        res.json({ message: 'Gorra eliminada exitosamente.' });
    });
};

//lista de las gorras
exports.getHats = (req, res) => {
    db.query('SELECT * FROM gorras', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
