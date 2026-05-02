require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const cardRoutes = require('./routes/cards');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', 1);

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Middlewares
app.use(helmet({
  contentSecurityPolicy: false
  frameguard: false
}));
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.use('/api', cardRoutes);

// Ruta principal - Editor
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta de tarjeta individual
app.get('/tarjeta/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'tarjeta.html'));
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
