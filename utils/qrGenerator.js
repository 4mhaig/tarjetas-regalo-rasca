const QRCode = require('qrcode');

// Mapeo de texturas a colores de QR
const textureColors = {
  silver:      '#534AB7', // Purple
  gold:        '#B8740A', // Amber
  rainbow:     '#D4537E', // Pink
  black:       '#333333', // Charcoal
  copper:      '#8B4513', // Saddle brown
  rosegold:    '#B5606A', // Dusty rose
  holographic: '#6A3DB8', // Deep purple
  emerald:     '#1B6B3A', // Forest green
};

const generateQR = async (url, texture = 'silver') => {
  try {
    const color = textureColors[texture] || textureColors.silver;
    
    const qrCodeDataURL = await QRCode.toDataURL(url, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 1,
      margin: 2,
      width: 400,
      color: {
        dark: color,
        light: '#FFFFFF'
      }
    });
    
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generando QR:', error);
    throw error;
  }
};

module.exports = { generateQR };
