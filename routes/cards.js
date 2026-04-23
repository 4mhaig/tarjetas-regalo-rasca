const express = require('express');
const router = express.Router();
const Card = require('../models/Card');
const { generateCardId } = require('../utils/idGenerator');
const { generateQR } = require('../utils/qrGenerator');
const { sendCardEmail } = require('../utils/emailService');

// POST /api/cards - Crear nueva tarjeta
router.post('/cards', async (req, res) => {
  try {
    const {
      headerType,
      from,
      to,
      texture,
      icon,
      backgroundType,
      backgroundValue,
      title,
      message,
      signature
    } = req.body;
    
    // Validaciones básicas
    if (!title || !message) {
      return res.status(400).json({ 
        error: 'Título y mensaje son obligatorios' 
      });
    }
    
    // Validar tamaño de imagen si es base64
    if (backgroundType === 'image' && backgroundValue) {
      const sizeInBytes = (backgroundValue.length * 3) / 4;
      const sizeInMB = sizeInBytes / (1024 * 1024);
      if (sizeInMB > 3) {
        return res.status(400).json({ 
          error: 'La imagen no puede superar 3MB' 
        });
      }
    }
    
    // Generar ID único
    const cardId = generateCardId();
    
    // Calcular fecha de expiración
    const expirationDays = parseInt(process.env.CARD_EXPIRATION_DAYS) || 30;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expirationDays);
    
    // Crear tarjeta
    const card = new Card({
      cardId,
      headerType: headerType || 'generic',
      from,
      to,
      texture: texture || 'silver',
      icon,
      backgroundType: backgroundType || 'color',
      backgroundValue: backgroundValue || '#FFFFFF',
      title,
      message,
      signature,
      expiresAt
    });
    
    await card.save();
    
    // Generar URL y QR
    const cardUrl = `${process.env.BASE_URL}/tarjeta/${cardId}`;
    const qrCodeDataURL = await generateQR(cardUrl, texture);
    
    res.status(201).json({
      success: true,
      cardId,
      url: cardUrl,
      qrCode: qrCodeDataURL,
      expiresAt
    });
    
  } catch (error) {
    console.error('Error creando tarjeta:', error);
    res.status(500).json({ 
      error: 'Error al crear la tarjeta' 
    });
  }
});

// GET /api/cards/:id - Obtener tarjeta por ID
router.get('/cards/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const card = await Card.findOne({ cardId: id });
    
    if (!card) {
      return res.status(404).json({ 
        error: 'Tarjeta no encontrada o expirada' 
      });
    }
    
    // Incrementar contador de vistas
    card.views += 1;
    await card.save();
    
    res.json({
      success: true,
      card: {
        cardId: card.cardId,
        headerType: card.headerType,
        from: card.from,
        to: card.to,
        texture: card.texture,
        icon: card.icon,
        backgroundType: card.backgroundType,
        backgroundValue: card.backgroundValue,
        title: card.title,
        message: card.message,
        signature: card.signature,
        expiresAt: card.expiresAt,
        views: card.views
      }
    });
    
  } catch (error) {
    console.error('Error obteniendo tarjeta:', error);
    res.status(500).json({ 
      error: 'Error al obtener la tarjeta' 
    });
  }
});

// POST /api/cards/:id/send-email - Enviar tarjeta por email
router.post('/cards/:id/send-email', async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        error: 'Email es obligatorio' 
      });
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Formato de email inválido' 
      });
    }
    
    const card = await Card.findOne({ cardId: id });
    
    if (!card) {
      return res.status(404).json({ 
        error: 'Tarjeta no encontrada' 
      });
    }
    
    const cardUrl = `${process.env.BASE_URL}/tarjeta/${id}`;
    const qrCodeDataURL = await generateQR(cardUrl, card.texture);
    
    await sendCardEmail(
      email,
      cardUrl,
      id,
      card.expiresAt,
      qrCodeDataURL
    );
    
    res.json({
      success: true,
      message: 'Email enviado correctamente'
    });
    
  } catch (error) {
    console.error('Error enviando email:', error);
    res.status(500).json({ 
      error: 'Error al enviar el email' 
    });
  }
});

module.exports = router;
