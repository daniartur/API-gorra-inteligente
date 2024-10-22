const express = require('express');
const { registerHat, editHat, deleteHat, getHats } = require('../controllers/hatController');

const router = express.Router();

router.post('/register', registerHat); 
router.put('/edit/:id', editHat);
router.delete('/delete/:id', deleteHat);
router.get('/', getHats);

module.exports = router;

