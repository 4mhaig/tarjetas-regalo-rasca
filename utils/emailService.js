const nodemailer = require('nodemailer');

const createTransporter = () => {
  // Configuración básica con Gmail
  // Para producción, usar SendGrid o Resend
  return nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

const sendCardEmail = async (toEmail, cardUrl, cardId, expirationDate, qrCodeBase64) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Tarjetas Regalo" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: 'Tu tarjeta regalo está lista 🎁',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1D1D1F; background: #f5f5f5; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #534AB7 0%, #7F77DD 100%); color: white; padding: 40px 20px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
            .content { padding: 40px 30px; }
            .content p { margin: 0 0 20px; }
            .link-box { background: #F5F5F7; border-radius: 12px; padding: 20px; margin: 30px 0; text-align: center; }
            .link { color: #5B7FFF; text-decoration: none; font-size: 16px; word-break: break-all; }
            .qr-container { text-align: center; margin: 30px 0; }
            .qr-container img { max-width: 200px; border-radius: 12px; border: 1px solid #E5E5E7; padding: 12px; background: white; }
            .footer { background: #F5F5F7; padding: 20px; text-align: center; font-size: 13px; color: #86868B; }
            .button { display: inline-block; background: linear-gradient(135deg, #5B7FFF 0%, #8B5FFF 100%); color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 500; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎁 Tu tarjeta regalo está lista</h1>
            </div>
            <div class="content">
              <p>Hola,</p>
              <p>Tu tarjeta regalo sorpresa está lista para compartir:</p>
              
              <div class="link-box">
                <p style="margin: 0 0 10px; font-size: 14px; color: #86868B;">Link de tu tarjeta:</p>
                <a href="${cardUrl}" class="link">${cardUrl}</a>
              </div>
              
              <p style="text-align: center;">
                <a href="${cardUrl}" class="button">Ver tarjeta</a>
              </p>
              
              <p style="text-align: center; font-size: 14px; color: #86868B;">También puedes usar este código QR:</p>
              
              <div class="qr-container">
                <img src="${qrCodeBase64}" alt="Código QR">
              </div>
              
              <p style="font-size: 14px; color: #86868B; text-align: center;">
                ⏰ Esta tarjeta estará disponible hasta el <strong>${new Date(expirationDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>
              </p>
            </div>
            <div class="footer">
              <p>¿Quieres crear otra tarjeta? <a href="${process.env.BASE_URL}" style="color: #5B7FFF;">Haz click aquí</a></p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error enviando email:', error);
    throw error;
  }
};

module.exports = { sendCardEmail };
