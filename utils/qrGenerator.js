const QRCode = require('qrcode');

// Mapeo de texturas a colores de QR
const textureColors = {
  silver: '#534AB7', // Purple
  gold: '#D85A30',   // Coral/Amber
  rainbow: '#D4537E' // Pink
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
