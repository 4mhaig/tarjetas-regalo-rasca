let cardConfig = {
  headerType: 'generic',
  from: '',
  to: '',
  texture: 'silver',
  icon: '🎉',
  iconType: 'emoji', // 'emoji' | 'image'
  iconImageSrc: '',
  iconPosX: 50,
  iconPosY: 50,
  backgroundType: 'color',
  backgroundValue: '#FFFFFF',
  title: '¡Feliz Cumpleaños!',
  message: 'Te regalo una cena especial en tu restaurante favorito. ¡Espero que lo disfrutes tanto como yo disfruto tu compañía!',
  signature: 'Con todo mi cariño ❤️'
};

let generatedCardData = null;

const textureHeaderColors = {
  silver: 'linear-gradient(135deg, #534AB7 0%, #7F77DD 100%)',
  gold: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
  rainbow: 'linear-gradient(135deg, #FF6B9D 0%, #C368E8 50%, #4FACFE 100%)'
};

const backgroundTextures = {
  dots: {
    bgColor: '#F5F5F5',
    bgImage: 'radial-gradient(#BBBBBB 1px, transparent 1px)',
    bgSize: '14px 14px'
  },
  grid: {
    bgColor: '#F5F5F5',
    bgImage: 'linear-gradient(#CCCCCC 1px, transparent 1px), linear-gradient(90deg, #CCCCCC 1px, transparent 1px)',
    bgSize: '18px 18px'
  },
  lines: {
    bgColor: '#F5F5F5',
    bgImage: 'repeating-linear-gradient(0deg, #CCCCCC, #CCCCCC 1px, transparent 1px, transparent 12px)',
    bgSize: 'auto'
  },
  diagonal: {
    bgColor: '#FFF8F0',
    bgImage: 'repeating-linear-gradient(45deg, #E8D5C0 0, #E8D5C0 1px, transparent 0, transparent 50%)',
    bgSize: '12px 12px'
  },
  checker: {
    bgColor: '#F0F0F0',
    bgImage: 'linear-gradient(45deg, #DDDDDD 25%, transparent 25%), linear-gradient(-45deg, #DDDDDD 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #DDDDDD 75%), linear-gradient(-45deg, transparent 75%, #DDDDDD 75%)',
    bgSize: '16px 16px',
    bgPosition: '0 0, 0 8px, 8px -8px, -8px 0'
  },
  paper: {
    bgColor: '#FDF6E3',
    bgImage: 'none',
    bgSize: 'auto'
  },
  noir: {
    bgColor: '#111111',
    bgImage: 'radial-gradient(#1E1E1E 1px, transparent 1px)',
    bgSize: '14px 14px'
  },
  crosshatch: {
    bgColor: '#F5F5F5',
    bgImage: 'repeating-linear-gradient(0deg, transparent, transparent 9px, #CCCCCC 9px, #CCCCCC 10px), repeating-linear-gradient(90deg, transparent, transparent 9px, #CCCCCC 9px, #CCCCCC 10px)',
    bgSize: 'auto'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('from-input').addEventListener('input', updateConfig);
  document.getElementById('to-input').addEventListener('input', updateConfig);
  document.getElementById('title-input').addEventListener('input', updateConfig);
  document.getElementById('message-input').addEventListener('input', updateConfig);
  document.getElementById('signature-input').addEventListener('input', updateConfig);

  renderPreview();

  if (window.innerWidth < 900) {
    document.getElementById('mobile-preview-btn').style.display = 'flex';
  }

  window.addEventListener('resize', () => {
    const isMobile = window.innerWidth < 900;
    document.getElementById('mobile-preview-btn').style.display = isMobile ? 'flex' : 'none';
    if (!isMobile) hideMobilePreview();
  });
});

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
  cardConfig.iconType = 'emoji';
  cardConfig.iconImageSrc = '';
  document.querySelectorAll('.icon-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.icon === icon);
  });
  renderPreview();
}

function setBackground(type, value) {
  cardConfig.backgroundType = type;
  cardConfig.backgroundValue = value;

  document.querySelectorAll('.bg-option-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.bgType === type && btn.dataset.bgValue === value);
  });

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

// Custom icon
function toggleCustomIcon() {
  const panel = document.getElementById('custom-icon-panel');
  panel.classList.toggle('open');
}

function showCustomIconTab(tab) {
  document.querySelectorAll('.custom-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(`custom-tab-${tab}`).classList.add('active');
  document.querySelectorAll('.custom-icon-tabs button').forEach((btn, i) => {
    btn.classList.toggle('active', (tab === 'emoji' && i === 0) || (tab === 'image' && i === 1));
  });
}

function applyCustomEmoji() {
  const val = document.getElementById('custom-emoji-input').value.trim();
  if (!val) return;
  cardConfig.icon = val;
  cardConfig.iconType = 'emoji';
  cardConfig.iconImageSrc = '';
  document.querySelectorAll('.icon-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('custom-icon-btn').classList.add('active');
  renderPreview();
}

function handleIconImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 3 * 1024 * 1024) {
    alert('La imagen no puede superar 3MB');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const src = e.target.result;
    cardConfig.iconType = 'image';
    cardConfig.iconImageSrc = src;
    cardConfig.iconPosX = 50;
    cardConfig.iconPosY = 50;
    cardConfig.icon = src;

    const previewEl = document.getElementById('icon-image-preview');
    const img = document.getElementById('icon-crop-img');
    img.src = src;
    previewEl.style.display = 'block';

    document.getElementById('icon-pos-x').value = 50;
    document.getElementById('icon-pos-y').value = 50;
    updateIconCrop();

    document.querySelectorAll('.icon-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('custom-icon-btn').classList.add('active');
    renderPreview();
  };
  reader.readAsDataURL(file);
}

function updateIconCrop() {
  const x = document.getElementById('icon-pos-x').value;
  const y = document.getElementById('icon-pos-y').value;
  cardConfig.iconPosX = parseInt(x);
  cardConfig.iconPosY = parseInt(y);

  const img = document.getElementById('icon-crop-img');
  img.style.objectPosition = `${x}% ${y}%`;

  renderPreview();
}

function removeIconImage() {
  cardConfig.iconType = 'emoji';
  cardConfig.iconImageSrc = '';
  cardConfig.icon = '';
  document.getElementById('icon-image-preview').style.display = 'none';
  document.getElementById('icon-image-upload').value = '';
  document.querySelectorAll('.icon-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.icon === '');
  });
  renderPreview();
}

// Render
function getBackgroundStyle(config) {
  if (config.backgroundType === 'color') {
    return `background-color: ${config.backgroundValue};`;
  }
  if (config.backgroundType === 'texture') {
    const tex = backgroundTextures[config.backgroundValue];
    if (!tex) return 'background: #FFFFFF;';
    let style = `background-color: ${tex.bgColor};`;
    if (tex.bgImage && tex.bgImage !== 'none') {
      style += ` background-image: ${tex.bgImage};`;
    }
    if (tex.bgSize && tex.bgSize !== 'auto') {
      style += ` background-size: ${tex.bgSize};`;
    }
    if (tex.bgPosition) {
      style += ` background-position: ${tex.bgPosition};`;
    }
    return style;
  }
  return 'background: #FFFFFF;';
}

function renderIconHTML(config) {
  if (!config.icon && !config.iconImageSrc) return '';
  if (config.iconType === 'image' && config.iconImageSrc) {
    return `<div class="gift-icon-img-wrap"><img src="${config.iconImageSrc}" style="width:100%;height:100%;object-fit:cover;object-position:${config.iconPosX || 50}% ${config.iconPosY || 50}%;border-radius:8px;" alt=""></div>`;
  }
  return `<div class="gift-icon">${config.icon}</div>`;
}

function renderCardHTML(config) {
  const headerColor = textureHeaderColors[config.texture];
  let headerText = '';

  if (config.headerType === 'personal' && config.from && config.to) {
    headerText = `${config.icon && config.iconType === 'emoji' ? config.icon + ' ' : ''}De ${config.from} para ${config.to}`;
  } else if (config.headerType === 'personal' && config.to) {
    headerText = `${config.icon && config.iconType === 'emoji' ? config.icon + ' ' : ''}Para ${config.to}`;
  } else {
    headerText = `${config.icon && config.iconType === 'emoji' ? config.icon + ' ' : ''}Tarjeta de Regalo`;
  }

  const bgStyle = getBackgroundStyle(config);

  return `
    <div class="gift-card-header" style="background: ${headerColor};">
      <h2>${headerText}</h2>
      <p>Rasca para descubrir tu sorpresa</p>
    </div>
    <div class="gift-card-content" style="${bgStyle}">
      <div class="gift-content">
        ${renderIconHTML(config)}
        <h3>${config.title || 'Título del regalo'}</h3>
        <p class="message">${config.message || 'Mensaje del regalo'}</p>
        ${config.signature ? `<p class="signature">${config.signature}</p>` : ''}
      </div>
    </div>
  `;
}

function renderPreview() {
  [document.getElementById('preview-card'), document.getElementById('mobile-preview-card')]
    .filter(Boolean)
    .forEach(card => { card.innerHTML = renderCardHTML(cardConfig); });
}

// Mobile
function showMobilePreview() {
  renderPreview();
  document.getElementById('bottom-sheet-overlay').classList.add('show');
}

function hideMobilePreview() {
  document.getElementById('bottom-sheet-overlay').classList.remove('show');
}

// Generate
async function generateCard() {
  const btn = document.getElementById('generate-btn');
  const originalHTML = btn.innerHTML;

  btn.disabled = true;
  btn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite"><path d="M7 1a6 6 0 110 12A6 6 0 017 1z" opacity="0.2"/><path d="M7 1a6 6 0 016 6"/></svg>
    Generando...
  `;

  const payload = {
    headerType: cardConfig.headerType,
    from: cardConfig.from,
    to: cardConfig.to,
    texture: cardConfig.texture,
    icon: cardConfig.iconType === 'image' ? cardConfig.iconImageSrc : cardConfig.icon,
    backgroundType: cardConfig.backgroundType,
    backgroundValue: cardConfig.backgroundType === 'texture'
      ? JSON.stringify(backgroundTextures[cardConfig.backgroundValue])
      : cardConfig.backgroundValue,
    title: cardConfig.title,
    message: cardConfig.message,
    signature: cardConfig.signature
  };

  try {
    const response = await fetch('/api/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al crear la tarjeta');
    }

    const data = await response.json();
    generatedCardData = data;
    hideMobilePreview();
    showResultModal(data);

  } catch (error) {
    console.error('Error:', error);
    alert('Error al generar la tarjeta: ' + error.message);
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalHTML;
  }
}

// Modal
function showResultModal(data) {
  const modal = document.getElementById('result-modal');
  document.getElementById('card-link').href = data.url;
  document.getElementById('card-link').textContent = data.url;
  document.getElementById('qr-code-image').src = data.qrCode;

  const previewCard = document.getElementById('modal-preview-card');
  previewCard.innerHTML = renderCardHTML(cardConfig);

  setTimeout(() => animatePreview(previewCard), 300);
  modal.classList.add('show');
}

function closeResultModal() {
  document.getElementById('result-modal').classList.remove('show');
}

function animatePreview(card) {
  const content = card.querySelector('.gift-card-content');
  if (!content) return;

  content.style.position = 'relative';

  const scratchLayer = document.createElement('div');
  scratchLayer.style.cssText = `
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    opacity: 0; transition: opacity 1.5s ease-in-out; z-index: 10;
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.5); font-size: 13px; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
  `;

  const textureGradients = {
    silver: 'linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 50%, #A8A8A8 100%)',
    gold: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8860B 100%)',
    rainbow: 'linear-gradient(135deg, #FF6B9D 0%, #C368E8 50%, #4FACFE 100%)'
  };

  scratchLayer.style.background = textureGradients[cardConfig.texture];
  scratchLayer.textContent = 'RASCA AQUÍ';
  content.appendChild(scratchLayer);

  setTimeout(() => { scratchLayer.style.opacity = '1'; }, 1500);
}

function copyLink() {
  const link = document.getElementById('card-link').textContent;
  navigator.clipboard.writeText(link).then(() => {
    const tooltip = document.getElementById('copy-tooltip');
    tooltip.classList.add('show');
    setTimeout(() => tooltip.classList.remove('show'), 2000);
  });
}

function downloadQR() {
  const qrImage = document.getElementById('qr-code-image');
  const link = document.createElement('a');
  link.download = `tarjeta-qr-${generatedCardData.cardId}.png`;
  link.href = qrImage.src;
  link.click();
}

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

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Por favor ingresa un email válido');
    return;
  }

  const btn = event.target;
  const originalHTML = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = 'Enviando...';

  try {
    const response = await fetch(`/api/cards/${generatedCardData.cardId}/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    alert('Error al enviar el email: ' + error.message);
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalHTML;
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeResultModal();
    closeEmailModal();
    hideMobilePreview();
  }
});

document.getElementById('email-modal-overlay').addEventListener('click', (e) => {
  if (e.target.id === 'email-modal-overlay') closeEmailModal();
});
