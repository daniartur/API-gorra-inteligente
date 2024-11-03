if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const hatRoutes = require('./routes/hatRoutes');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: '*', // Permitir todos los orígenes
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
app.use('/auth', authRoutes);
app.use('/hats', hatRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});


