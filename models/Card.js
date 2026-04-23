const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  cardId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  // Destinatario
  headerType: {
    type: String,
    enum: ['generic', 'personal'],
    default: 'generic'
  },
  from: String,
  to: String,
  
  // Estilo
  texture: {
    type: String,
    enum: ['silver', 'gold', 'rainbow'],
    default: 'silver'
  },
  icon: String, // Emoji o vacío si no hay icono
  
  // Fondo
  backgroundType: {
    type: String,
    enum: ['texture', 'color', 'image'],
    default: 'color'
  },
  backgroundValue: String, // Nombre de textura, código de color, o base64 de imagen
  
  // Contenido
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  signature: String,
  
  // Metadata
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: true
  },
  views: {
    type: Number,
    default: 0
  }
});

// Índice TTL para auto-eliminar tarjetas expiradas
cardSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
