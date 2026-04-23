# 🎁 Tarjetas Regalo Rasca

Crea tarjetas de regalo digitales personalizadas con efecto rasca y gana. Compártelas con un link único o código QR.

## ✨ Características

- **Editor visual completo** con preview en tiempo real
- **Efecto de rasca** interactivo (funciona en desktop y móvil)
- **Personalización total:**
  - Destinatario (genérico o personalizado)
  - 3 texturas de rasca (plateada, dorada, arcoíris)
  - 7 iconos predefinidos (opcional)
  - 5 colores sólidos + imagen personalizada de fondo
  - Título, mensaje y firma personalizables
- **Compartir fácilmente:**
  - Link único
  - Código QR personalizado por color
  - Envío por email
  - Compartir nativo en móvil
- **Auto-expiración** a los 30 días
- **Descarga de imagen** de la tarjeta revelada
- **Responsive** con bottom sheet en móvil

## 🚀 Tecnologías

### Backend
- Node.js + Express
- MongoDB (con índice TTL para auto-expiración)
- Nodemailer (envío de emails)
- QRCode (generación de QR personalizados)

### Frontend
- HTML5 + CSS3 + JavaScript Vanilla
- Canvas API (efecto de rasca)
- html2canvas (descarga de imagen)
- Diseño inspirado en Apple.com y Pitch.com

## 📦 Instalación

### Requisitos previos
- Node.js >= 18.0.0
- MongoDB (local o MongoDB Atlas)
- Cuenta de email (Gmail, SendGrid, o Resend)

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tarjetas-regalo-rasca.git
cd tarjetas-regalo-rasca
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/tarjetas-regalo
# O para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/tarjetas-regalo

# Server
PORT=3000
NODE_ENV=development

# Email (configuración con Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=tu-email@gmail.com
EMAIL_PASSWORD=tu-contraseña-app

# URL base
BASE_URL=http://localhost:3000

# Expiración
CARD_EXPIRATION_DAYS=30
```

#### Configurar Gmail para enviar emails:

1. Ve a tu cuenta de Google → Seguridad
2. Activa "Verificación en 2 pasos"
3. Ve a "Contraseñas de aplicaciones"
4. Genera una contraseña para "Correo"
5. Usa esa contraseña en `EMAIL_PASSWORD`

#### Alternativa: SendGrid

```env
SENDGRID_API_KEY=tu-api-key-de-sendgrid
```

Descomentar en `utils/emailService.js` la configuración de SendGrid.

### 4. Configurar MongoDB

#### Opción A: MongoDB Local

Instala MongoDB localmente y asegúrate de que esté corriendo:

```bash
# macOS (con Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

#### Opción B: MongoDB Atlas (Recomendado para producción)

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito (M0)
3. Crea un usuario de base de datos
4. Whitelist tu IP (o usa 0.0.0.0/0 para acceso desde cualquier lugar)
5. Obtén tu connection string y úsalo en `MONGODB_URI`

### 5. Iniciar el servidor

```bash
# Desarrollo (con auto-reload)
npm run dev

# Producción
npm start
```

El servidor estará disponible en `http://localhost:3000`

## 🌐 Deploy en Producción

### Railway (Recomendado)

1. Crea una cuenta en [Railway.app](https://railway.app)
2. Crea un nuevo proyecto desde GitHub
3. Conecta tu repositorio
4. Railway detectará automáticamente Node.js
5. Añade las variables de entorno en Settings → Variables
6. Railway generará un dominio automáticamente

### Render

1. Crea una cuenta en [Render.com](https://render.com)
2. Nuevo Web Service → Conecta tu repositorio
3. Configuración:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Añade las variables de entorno
5. Deploy

### Vercel + MongoDB Atlas

1. Crea cuenta en [Vercel](https://vercel.com)
2. Importa el repositorio
3. Configura las variables de entorno
4. Usa MongoDB Atlas para la base de datos
5. Deploy

## 📱 Uso

### Crear una tarjeta

1. Accede a la página principal
2. Personaliza tu tarjeta:
   - Elige si es genérica o personalizada
   - Selecciona textura de rasca
   - Elige icono (opcional)
   - Selecciona fondo (color o imagen)
   - Escribe título, mensaje y firma
3. Haz click en "Generar tarjeta"
4. Comparte el link o descarga el QR

### Ver una tarjeta

1. Abre el link compartido
2. Rasca con el mouse o dedo
3. Descarga la imagen revelada (opcional)

## 🛠️ Estructura del proyecto

```
tarjetas-regalo-rasca/
├── models/           # Modelos de MongoDB
│   └── Card.js
├── routes/           # Rutas de la API
│   └── cards.js
├── utils/            # Utilidades
│   ├── idGenerator.js
│   ├── qrGenerator.js
│   └── emailService.js
├── public/           # Frontend
│   ├── css/
│   │   ├── styles.css
│   │   ├── editor.css
│   │   ├── card.css
│   │   └── modal.css
│   ├── js/
│   │   └── editor.js
│   └── index.html
├── views/
│   └── tarjeta.html
├── server.js         # Servidor Express
├── package.json
├── .env.example
└── README.md
```

## 🔧 API Endpoints

### POST /api/cards
Crear una nueva tarjeta

**Request:**
```json
{
  "headerType": "personal",
  "from": "María",
  "to": "Juan",
  "texture": "gold",
  "icon": "🎉",
  "backgroundType": "color",
  "backgroundValue": "#FFE5EC",
  "title": "¡Feliz Cumpleaños!",
  "message": "Te regalo...",
  "signature": "Con cariño"
}
```

**Response:**
```json
{
  "success": true,
  "cardId": "XyZ9k2Bm",
  "url": "https://tudominio.com/tarjeta/XyZ9k2Bm",
  "qrCode": "data:image/png;base64,...",
  "expiresAt": "2026-05-23T10:30:00.000Z"
}
```

### GET /api/cards/:id
Obtener una tarjeta por ID

### POST /api/cards/:id/send-email
Enviar tarjeta por email

**Request:**
```json
{
  "email": "destino@ejemplo.com"
}
```

## 🎨 Personalización

### Cambiar colores del tema

Edita las variables CSS en `public/css/styles.css`:

```css
:root {
  --color-accent: #5B7FFF;
  --gradient-accent: linear-gradient(135deg, #5B7FFF 0%, #8B5FFF 100%);
  /* ... */
}
```

### Añadir más texturas de rasca

1. Edita `public/css/editor.css` para añadir el botón
2. Edita `public/js/editor.js` para añadir el gradiente
3. Edita `views/tarjeta.html` para el efecto de rasca
4. Edita `utils/qrGenerator.js` para el color del QR

### Cambiar tiempo de expiración

Edita `.env`:

```env
CARD_EXPIRATION_DAYS=60  # 60 días en vez de 30
```

## 🐛 Troubleshooting

### Error de conexión a MongoDB

- Verifica que MongoDB esté corriendo
- Revisa el connection string en `.env`
- Asegúrate de que tu IP está whitelisted en Atlas

### Los emails no se envían

- Verifica las credenciales de email en `.env`
- Revisa que la "Contraseña de aplicación" esté correcta
- Prueba con SendGrid como alternativa

### La imagen no se sube

- Verifica que sea menor a 3MB
- Formatos permitidos: JPG, PNG, WebP
- Revisa el límite en `server.js`: `express.json({ limit: '5mb' })`

## 📝 Licencia

MIT

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing`)
5. Abre un Pull Request

## 📧 Contacto

Para preguntas o sugerencias, abre un issue en GitHub.

---

Hecho con ❤️ para compartir momentos especiales
