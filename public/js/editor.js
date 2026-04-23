// Estado global de la tarjeta
let cardConfig = {
  headerType: 'generic',
  from: '',
  to: '',
  texture: 'silver',
  icon: '🎉',
  backgroundType: 'color',
  backgroundValue: '#FFFFFF',
  title: '¡Feliz Cumpleaños!',
  message: 'Te regalo una cena especial en tu restaurante favorito. ¡Espero que lo disfrutes tanto como yo disfruto tu compañía!',
  signature: 'Con todo mi cariño ❤️'
};

// Datos de la tarjeta generada
let generatedCardData = null;

// Mapeo de texturas a colores de header
const textureHeaderColors = {
  silver: 'linear-gradient(135deg, #534AB7 0%, #7F77DD 100%)',
  gold: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
  rainbow: 'linear-gradient(135deg, #FF6B9D 0%, #C368E8 50%, #4FACFE 100%)'
};

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  // Event listeners para inputs
  document.getElementById('from-input').addEventListener('input', updateConfig);
  document.getElementById('to-input').addEventListener('input', updateConfig);
  document.getElementById('title-input').addEventListener('input', updateConfig);
  document.getElementById('message-input').addEventListener('input', updateConfig);
  document.getElementById('signature-input').addEventListener('input', updateConfig);
  
  // Renderizar preview inicial
  renderPreview();
  
  // Mostrar botón flotante en mobile
  if (window.innerWidth < 768) {
    document.getElementById('mobile-preview-btn').style.display = 'flex';
  }
  
  // Responsive
  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      document.getElementById('mobile-preview-btn').style.display = 'flex';
    } else {
      document.getElementById('mobile-preview-btn').style.display = 'none';
      hideMobilePreview();
    }
  });
});

// Funciones de configuración
function setHeaderType(type) {
  cardConfig.headerType = type;
  
  document.getElementById('btn-generic').classList.toggle('active', type === 'generic');
  document.getElementById('btn-personal').classList.toggle('active', type === 'personal');
  
  document.getElementById('personal-fields').style.display = type === 'personal' ? 'block' : 'none';
  
  renderPreview();
}

function setTexture(texture) {
  cardConfig.texture = texture;
  
  document.querySelectorAll('.texture-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.texture === texture);
  });
  
  renderPreview();
}

function setIcon(icon) {
  cardConfig.icon = icon;
  
  document.querySelectorAll('.icon-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.icon === icon);
  });
  
  renderPreview();
}

function setBackground(type, value) {
  cardConfig.backgroundType = type;
  cardConfig.backgroundValue = value;
  
  if (type === 'color') {
    document.querySelectorAll('.bg-color-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.bgValue === value);
    });
    document.querySelectorAll('.bg-texture-btn').forEach(btn => {
      btn.classList.remove('active');
    });
  }
  
  renderPreview();
}

function updateConfig() {
  cardConfig.from = document.getElementById('from-input').value;
  cardConfig.to = document.getElementById('to-input').value;
  cardConfig.title = document.getElementById('title-input').value;
  cardConfig.message = document.getElementById('message-input').value;
  cardConfig.signature = document.getElementById('signature-input').value;
  
  renderPreview();
}

// Upload de imagen
async function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  // Validar tamaño (max 3MB)
  if (file.size > 3 * 1024 * 1024) {
    alert('La imagen no puede superar 3MB');
    event.target.value = '';
    return;
  }
  
  // Validar tipo
  if (!file.type.match('image/(jpeg|png|webp)')) {
    alert('Solo se permiten imágenes JPG, PNG o WebP');
    event.target.value = '';
    return;
  }
  
  try {
    const base64 = await fileToBase64(file);
    const resized = await resizeImage(base64, 1200);
    
    cardConfig.backgroundType = 'image';
    cardConfig.backgroundValue = resized;
    
    // Mostrar preview
    const preview = document.getElementById('image-preview');
    preview.innerHTML = `<img src="${resized}" alt="Preview">`;
    preview.style.display = 'block';
    
    // Desactivar otros botones de fondo
    document.querySelectorAll('.bg-color-btn, .bg-texture-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    renderPreview();
  } catch (error) {
    console.error('Error procesando imagen:', error);
    alert('Error al procesar la imagen');
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function resizeImage(base64, maxWidth) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };
    img.src = base64;
  });
}

// Renderizar preview
function renderPreview() {
  const cards = [
    document.getElementById('preview-card'),
    document.getElementById('mobile-preview-card')
  ].filter(c => c);
  
  cards.forEach(card => {
    card.innerHTML = renderCardHTML(cardConfig, false);
  });
}

function renderCardHTML(config, isStatic = false) {
  const headerColor = textureHeaderColors[config.texture];
  
  let headerText = '';
  if (config.headerType === 'personal' && config.from && config.to) {
    headerText = config.icon ? `${config.icon} De ${config.from} para ${config.to}` : `De ${config.from} para ${config.to}`;
  } else if (config.headerType === 'personal' && config.to) {
    headerText = config.icon ? `${config.icon} Para ${config.to}` : `Para ${config.to}`;
  } else {
    headerText = config.icon ? `${config.icon} Tarjeta de Regalo` : 'Tarjeta de Regalo';
  }
  
  const bgStyle = config.backgroundType === 'color' 
    ? `background: ${config.backgroundValue};`
    : config.backgroundType === 'image'
    ? `background-image: url('${config.backgroundValue}'); background-size: cover; background-position: center;`
    : '';
  
  return `
    <div class="gift-card-header" style="background: ${headerColor};">
      <h2>${headerText}</h2>
      <p>Rasca para descubrir tu sorpresa</p>
    </div>
    <div class="gift-card-content" style="${bgStyle}">
      <div class="gift-content">
        ${config.icon ? `<div class="gift-icon">${config.icon}</div>` : ''}
        <h3>${config.title || 'Título del regalo'}</h3>
        <p class="message">${config.message || 'Mensaje del regalo'}</p>
        ${config.signature ? `<p class="signature">${config.signature}</p>` : ''}
      </div>
    </div>
  `;
}

// Mobile preview
function showMobilePreview() {
  renderPreview();
  document.getElementById('bottom-sheet-overlay').classList.add('show');
}

function hideMobilePreview() {
  document.getElementById('bottom-sheet-overlay').classList.remove('show');
}

// Generar tarjeta
async function generateCard() {
  const btn = event.target;
  const originalText = btn.textContent;
  
  btn.disabled = true;
  btn.textContent = 'Generando...';
  
  try {
    const response = await fetch('/api/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardConfig)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al crear la tarjeta');
    }
    
    const data = await response.json();
    generatedCardData = data;
    
    // Cerrar bottom sheet si está abierto
    hideMobilePreview();
    
    // Mostrar modal de resultado
    showResultModal(data);
    
  } catch (error) {
    console.error('Error:', error);
    alert('Error al generar la tarjeta: ' + error.message);
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

// Modal de resultado
function showResultModal(data) {
  const modal = document.getElementById('result-modal');
  const cardLink = document.getElementById('card-link');
  const qrImage = document.getElementById('qr-code-image');
  
  // Configurar link
  cardLink.href = data.url;
  cardLink.textContent = data.url;
  
  // Configurar QR
  qrImage.src = data.qrCode;
  
  // Renderizar preview con animación
  const previewCard = document.getElementById('modal-preview-card');
  previewCard.innerHTML = renderCardHTML(cardConfig, true);
  
  // Animar preview
  setTimeout(() => {
    animatePreview(previewCard);
  }, 300);
  
  // Mostrar modal
  modal.classList.add('show');
}

function closeResultModal() {
  document.getElementById('result-modal').classList.remove('show');
}

// Animación del preview en el modal
function animatePreview(card) {
  const content = card.querySelector('.gift-card-content');
  const header = card.querySelector('.gift-card-header');
  
  // Asegurar que el contenido esté visible inicialmente
  content.style.position = 'relative';
  
  // Crear capa de rasca
  const scratchLayer = document.createElement('div');
  scratchLayer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 1.5s ease-in-out;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.4);
    font-size: 24px;
    font-weight: bold;
  `;
  
  // Aplicar gradiente según textura
  const textureGradients = {
    silver: 'linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 50%, #A8A8A8 100%)',
    gold: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%)',
    rainbow: 'linear-gradient(135deg, #FF6B9D 0%, #C368E8 50%, #4FACFE 100%)'
  };
  
  scratchLayer.style.background = textureGradients[cardConfig.texture];
  scratchLayer.textContent = 'RASCA AQUÍ';
  
  content.appendChild(scratchLayer);
  
  // Secuencia de animación
  // 1. Mostrar contenido revelado (ya visible)
  setTimeout(() => {
    // 2. Aparecer capa de rasca
    scratchLayer.style.opacity = '1';
  }, 1500);
  
  setTimeout(() => {
    // 3. Shimmer
    const shimmer = document.createElement('div');
    shimmer.style.cssText = `
      position: absolute;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
      transform: skewX(-15deg);
      animation: shimmer 0.5s ease-out;
    `;
    scratchLayer.appendChild(shimmer);
    
    // Cambiar fondo del header al mismo que el contenido
    const bgStyle = cardConfig.backgroundType === 'color' 
      ? cardConfig.backgroundValue
      : cardConfig.backgroundType === 'image'
      ? `url('${cardConfig.backgroundValue}')`
      : '#FFFFFF';
    
    if (cardConfig.backgroundType === 'color') {
      header.style.background = bgStyle;
    } else if (cardConfig.backgroundType === 'image') {
      header.style.backgroundImage = bgStyle;
      header.style.backgroundSize = 'cover';
      header.style.backgroundPosition = 'center';
    }
    
  }, 3000);
}

// Copiar link
function copyLink() {
  const link = document.getElementById('card-link').textContent;
  
  navigator.clipboard.writeText(link).then(() => {
    const tooltip = document.getElementById('copy-tooltip');
    tooltip.classList.add('show');
    
    setTimeout(() => {
      tooltip.classList.remove('show');
    }, 2000);
  }).catch(err => {
    console.error('Error copiando:', err);
    alert('Error al copiar el link');
  });
}

// Descargar QR
function downloadQR() {
  const qrImage = document.getElementById('qr-code-image');
  const link = document.createElement('a');
  link.download = `tarjeta-qr-${generatedCardData.cardId}.png`;
  link.href = qrImage.src;
  link.click();
}

// Modal de email
function showEmailModal() {
  document.getElementById('email-modal-overlay').classList.add('show');
  document.getElementById('email-modal').classList.add('show');
}

function closeEmailModal() {
  document.getElementById('email-modal-overlay').classList.remove('show');
  document.getElementById('email-modal').classList.remove('show');
}

async function sendEmail() {
  const emailInput = document.getElementById('email-input');
  const email = emailInput.value.trim();
  
  if (!email) {
    alert('Por favor ingresa un email');
    return;
  }
  
  // Validar formato
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Por favor ingresa un email válido');
    return;
  }
  
  const btn = event.target;
  const originalText = btn.textContent;
  
  btn.disabled = true;
  btn.textContent = 'Enviando...';
  
  try {
    const response = await fetch(`/api/cards/${generatedCardData.cardId}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al enviar el email');
    }
    
    alert('¡Email enviado correctamente!');
    closeEmailModal();
    emailInput.value = '';
    
  } catch (error) {
    console.error('Error:', error);
    alert('Error al enviar el email: ' + error.message);
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

// Cerrar modales con ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeResultModal();
    closeEmailModal();
    hideMobilePreview();
  }
});

// Cerrar modal de email al hacer click en overlay
document.getElementById('email-modal-overlay').addEventListener('click', (e) => {
  if (e.target.id === 'email-modal-overlay') {
    closeEmailModal();
  }
});
