const { customAlphabet } = require('nanoid');

// Genera IDs únicos de 8 caracteres alfanuméricos
// Ejemplo: XyZ9k2Bm
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 8);

const generateCardId = () => {
  return nanoid();
};

module.exports = { generateCardId };
