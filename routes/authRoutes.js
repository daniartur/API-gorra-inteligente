const express = require('express');
const { register, login, editUser, deleteUser } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/edit/:id', editUser);  
router.delete('/delete/:id', deleteUser); 

module.exports = router;

