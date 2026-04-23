let cardConfig = {
  headerType: 'generic',
  from: '',
  to: '',
  texture: 'black',
  icon: '🎉',
  iconType: 'emoji', // 'emoji' | 'image'
  iconImageSrc: '',
  iconPosX: 50,
  iconPosY: 50,
  iconZoom: 100,
  backgroundType: 'color',
  backgroundValue: '#FFFFFF',
  title: '¡Feliz Cumpleaños!',
  message: 'Te regalo una cena especial en tu restaurante favorito. ¡Espero que lo disfrutes tanto como yo disfruto tu compañía!',
  signature: 'Con todo mi cariño ❤️'
};

let generatedCardData = null;
let showScratchPreview = false;

const textureHeaderColors = {
  silver:       'linear-gradient(135deg, #8A8A8A 0%, #D8D8D8 50%, #A0A0A0 100%)',
  gold:         'linear-gradient(135deg, #B8960C 0%, #FFD700 50%, #C8A400 100%)',
  rainbow:      'linear-gradient(135deg, #FF6B9D 0%, #C368E8 50%, #4FACFE 100%)',
  copper:       'linear-gradient(135deg, #B87333 0%, #E8A050 50%, #A0602A 100%)',
  rosegold:     'linear-gradient(135deg, #C8858A 0%, #F5C8C8 50%, #D4909A 100%)',
  black:        'linear-gradient(135deg, #1A1A1A 0%, #555555 50%, #333333 100%)',
  holographic:  'linear-gradient(135deg, #FF6B9D 0%, #FFD700 25%, #6BCB77 50%, #4FACFE 75%, #C368E8 100%)',
  emerald:      'linear-gradient(135deg, #1B5E20 0%, #4CAF50 50%, #2E7D32 100%)'
};

const textureTextColors = {
  silver:      '#1A1A1A',
  gold:        '#1A1A1A',
  rosegold:    '#1A1A1A',
  black:       '#FFFFFF',
  copper:      '#FFFFFF',
  emerald:     '#FFFFFF',
  rainbow:     '#FFFFFF',
  holographic: '#1A1A1A',
};

const bgColors = [
  { name: 'Blanco',     value: '#FFFFFF' },
  { name: 'Rosa',       value: '#FFE5EC' },
  { name: 'Azul',       value: '#DBEAFE' },
  { name: 'Lavanda',    value: '#EDE9FE' },
  { name: 'Melocotón',  value: '#FFE0B2' },
  { name: 'Menta',      value: '#D1FAE5' },
  { name: 'Amarillo',   value: '#FEF9C3' },
  { name: 'Lila',       value: '#F5D0FE' },
];

function svgBg(svg) {
  return "url('data:image/svg+xml," + encodeURIComponent(svg) + "')";
}

const backgroundTextures = {
  hearts: {
    name: 'Corazones',
    bgColor: '#FFF0F5',
    bgImage: svgBg('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M16 26C8 19 2 14 2 9a7 7 0 0114 0 7 7 0 0114 0c0 5-6 10-14 17z" fill="#FFB3C6"/></svg>'),
    bgSize: '32px 32px'
  },
  stars: {
    name: 'Estrellas',
    bgColor: '#FFFDE7',
    bgImage: svgBg('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><polygon points="16,3 19,11 27,11 21,16 23,24 16,19.5 9,24 11,16 5,11 13,11" fill="#FFD700"/></svg>'),
    bgSize: '32px 32px'
  },
  rainbow: {
    name: 'Arcoíris',
    bgColor: '#FFFFFF',
    bgImage: 'repeating-linear-gradient(45deg, #FF6B6B 0px, #FF6B6B 7px, #FF9F43 7px, #FF9F43 14px, #FFD93D 14px, #FFD93D 21px, #6BCB77 21px, #6BCB77 28px, #4FACFE 28px, #4FACFE 35px, #9B59B6 35px, #9B59B6 42px)',
    bgSize: 'auto'
  },
  confetti: {
    name: 'Confetti',
    bgColor: '#FAFAFA',
    bgImage: 'radial-gradient(circle, #FF6B6B 1.5px, transparent 1.5px), radial-gradient(circle, #FFD93D 1.5px, transparent 1.5px), radial-gradient(circle, #6BCB77 1.5px, transparent 1.5px), radial-gradient(circle, #4FACFE 1.5px, transparent 1.5px), radial-gradient(circle, #FF9F43 1.5px, transparent 1.5px), radial-gradient(circle, #C77DFF 1.5px, transparent 1.5px)',
    bgSize: '24px 24px',
    bgPosition: '0 0, 8px 4px, 16px 8px, 4px 12px, 12px 18px, 20px 2px'
  },
  balloons: {
    name: 'Globos',
    bgColor: '#FFF8F0',
    bgImage: svgBg('<svg xmlns="http://www.w3.org/2000/svg" width="50" height="40"><ellipse cx="10" cy="12" rx="7" ry="9" fill="#FF6B9D" opacity="0.8"/><line x1="10" y1="21" x2="10" y2="28" stroke="#FF6B9D" stroke-width="1" opacity="0.5"/><ellipse cx="34" cy="8" rx="7" ry="9" fill="#4FACFE" opacity="0.8"/><line x1="34" y1="17" x2="34" y2="28" stroke="#4FACFE" stroke-width="1" opacity="0.5"/><ellipse cx="22" cy="18" rx="7" ry="9" fill="#FFD700" opacity="0.8"/><line x1="22" y1="27" x2="22" y2="34" stroke="#FFD700" stroke-width="1" opacity="0.5"/></svg>'),
    bgSize: '50px 40px'
  },
  lightning: {
    name: 'Rayos',
    bgColor: '#EEF2FF',
    bgImage: svgBg('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M19 3L9 17h8L8 29l16-18h-8z" fill="#818CF8" opacity="0.85"/></svg>'),
    bgSize: '32px 32px'
  },
  leaves: {
    name: 'Hojas',
    bgColor: '#F1F8E9',
    bgImage: svgBg('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M16 3C16 3 4 11 4 19a12 12 0 0024 0C28 11 16 3 16 3z" fill="#4CAF50" opacity="0.7"/><path d="M16 6c0 0 2 4 3 8-2-1-4-2-3-8z" fill="#2E7D32" opacity="0.5"/></svg>'),
    bgSize: '32px 32px'
  },
  paper: {
    name: 'Papel antiguo',
    bgColor: '#EDE0C4',
    bgImage: 'repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(160,130,80,0.12) 23px, rgba(160,130,80,0.12) 24px), repeating-linear-gradient(90deg, transparent, transparent 23px, rgba(160,130,80,0.06) 23px, rgba(160,130,80,0.06) 24px)',
    bgSize: 'auto'
  }
};

const EMOJI_DATA = {
  'Celebración': ['🎉','🎊','🎈','🎁','🎂','🥳','🍾','🥂','✨','🎆','🎇','🪅','🎀','🏆','🥇','🎗️','🪄','🎠'],
  'Amor':        ['❤️','💝','💕','💖','💗','💓','💞','💟','🥰','😍','💌','💘','💔','😘','🫶','💑','💏','🌹'],
  'Naturaleza':  ['🌸','🌹','🌺','🌻','🌼','💐','🍀','🌿','🌱','🌲','🍁','🍂','🦋','🐝','🌈','☀️','🌙','⭐'],
  'Comida':      ['🍰','🎂','🍫','🍬','🍭','🧁','🍩','🍪','🥐','🍷','🥃','🍻','🥂','☕','🍕','🍣','🍓','🍒'],
  'Viajes':      ['✈️','🚀','⛵','🗺️','🏖️','🏔️','🌍','🗼','🏰','🎡','🌅','🏝️','🚢','🏕️','🎭','🎪','🎑','🗽'],
  'Actividades': ['⚽','🏀','🎯','🎸','🎹','🎵','🎶','🎮','🎲','♟️','🏋️','🤸','🎨','📚','💻','🔮','🎬','🎤'],
};

let allEmojis = Object.entries(EMOJI_DATA).flatMap(([cat, emojis]) => emojis.map(e => ({ cat, e })));

function initBgButtons() {
  const colorsGrid = document.getElementById('bg-colors-grid');
  bgColors.forEach(({ name, value }) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `bg-option-btn has-tooltip${cardConfig.backgroundType === 'color' && cardConfig.backgroundValue === value ? ' active' : ''}`;
    btn.dataset.bgType = 'color';
    btn.dataset.bgValue = value;
    btn.dataset.name = name;
    btn.style.cssText = `background:${value};${value === '#FFFFFF' ? 'border:1px solid #ddd;' : ''}`;
    btn.onclick = () => setBackground('color', value);
    colorsGrid.appendChild(btn);
  });

  const texturesGrid = document.getElementById('bg-textures-grid');
  Object.entries(backgroundTextures).forEach(([key, tex]) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'bg-option-btn has-tooltip';
    btn.dataset.bgType = 'texture';
    btn.dataset.bgValue = key;
    btn.dataset.name = tex.name;
    btn.style.backgroundColor = tex.bgColor;
    if (tex.bgImage) btn.style.backgroundImage = tex.bgImage;
    if (tex.bgSize) btn.style.backgroundSize = tex.bgSize;
    if (tex.bgPosition) btn.style.backgroundPosition = tex.bgPosition;
    btn.onclick = () => setBackground('texture', key);
    texturesGrid.appendChild(btn);
  });
}

function initEmojiPicker() {
  renderEmojiGrid(EMOJI_DATA);
}

function renderEmojiGrid(data) {
  const container = document.getElementById('emoji-picker-content');
  container.innerHTML = '';
  Object.entries(data).forEach(([cat, emojis]) => {
    const label = document.createElement('div');
    label.className = 'emoji-category-label';
    label.textContent = cat;
    container.appendChild(label);
    const grid = document.createElement('div');
    grid.className = 'emoji-grid';
    emojis.forEach(emoji => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'emoji-option';
      btn.textContent = emoji;
      btn.onclick = () => { setIcon(emoji); closeEmojiPicker(); };
      grid.appendChild(btn);
    });
    container.appendChild(grid);
  });
}

function filterEmojis() {
  const q = document.getElementById('emoji-search').value.toLowerCase();
  if (!q) { renderEmojiGrid(EMOJI_DATA); return; }
  const filtered = allEmojis.filter(({ e }) => e.includes(q));
  const result = { 'Resultados': filtered.map(({ e }) => e) };
  if (!filtered.length) result['Resultados'] = [];
  renderEmojiGrid(result);
}

function toggleEmojiPicker(e) {
  e.stopPropagation();
  document.getElementById('emoji-picker').classList.toggle('open');
}

function closeEmojiPicker() {
  document.getElementById('emoji-picker').classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('from-input').addEventListener('input', updateConfig);
  document.getElementById('to-input').addEventListener('input', updateConfig);
  document.getElementById('title-input').addEventListener('input', updateConfig);
  document.getElementById('message-input').addEventListener('input', updateConfig);
  document.getElementById('signature-input').addEventListener('input', updateConfig);

  initBgButtons();
  initEmojiPicker();

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.emoji-picker-wrapper')) closeEmojiPicker();
  });

  document.getElementById('icon-crop-container').addEventListener('click', () => {
    if (cardConfig.iconImageSrc) {
      cardConfig.iconType = 'image';
      cardConfig.icon = cardConfig.iconImageSrc;
      document.querySelectorAll('.icon-btn').forEach(btn => btn.classList.remove('active'));
      renderPreview();
    }
  });

  renderPreview();
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
    document.getElementById('icon-zoom').value = 100;
    updateIconCrop();

    document.getElementById('icon-upload-area').style.display = 'none';
    document.getElementById('icon-image-preview').style.display = 'block';
    document.querySelectorAll('.icon-btn').forEach(btn => btn.classList.remove('active'));
    renderPreview();
  };
  reader.readAsDataURL(file);
}

function updateIconCrop() {
  const x = document.getElementById('icon-pos-x').value;
  const y = document.getElementById('icon-pos-y').value;
  const zoom = document.getElementById('icon-zoom').value;
  cardConfig.iconPosX = parseInt(x);
  cardConfig.iconPosY = parseInt(y);
  cardConfig.iconZoom = parseInt(zoom);

  const img = document.getElementById('icon-crop-img');
  img.style.objectPosition = `${x}% ${y}%`;
  img.style.transform = `scale(${zoom / 100})`;
  img.style.transformOrigin = `${x}% ${y}%`;

  renderPreview();
}

function removeIconImage() {
  cardConfig.iconType = 'emoji';
  cardConfig.iconImageSrc = '';
  cardConfig.icon = '';
  document.getElementById('icon-image-preview').style.display = 'none';
  document.getElementById('icon-upload-area').style.display = 'block';
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
    const zoom = config.iconZoom || 100;
    const x = config.iconPosX || 50;
    const y = config.iconPosY || 50;
    return `<div class="gift-icon-img-wrap"><img src="${config.iconImageSrc}" style="width:100%;height:100%;object-fit:cover;object-position:${x}% ${y}%;transform:scale(${zoom/100});transform-origin:${x}% ${y}%;" alt=""></div>`;
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
  const textureClass = config.backgroundType === 'texture' ? ' has-texture' : '';

  const textColor = textureTextColors[config.texture] || '#FFFFFF';
  const textStyle = `color: ${textColor};`;

  if (showScratchPreview) {
    return `
      <div class="gift-card-header" style="background: transparent;">
        <h2 style="${textStyle}">${headerText}</h2>
        <p style="${textStyle}">Rasca para descubrir tu sorpresa</p>
      </div>
      <div class="gift-card-content${textureClass}" style="background: transparent;">
        <div class="gift-content" style="visibility: hidden;">
          ${renderIconHTML(config)}
          <h3>${config.title || 'Título del regalo'}</h3>
          <p class="message">${config.message || 'Mensaje del regalo'}</p>
          ${config.signature ? `<p class="signature">${config.signature}</p>` : ''}
        </div>
      </div>
    `;
  }

  return `
    <div class="gift-card-header" style="background: ${headerColor};">
      <h2 style="${textStyle}">${headerText}</h2>
      <p style="${textStyle}">Rasca para descubrir tu sorpresa</p>
    </div>
    <div class="gift-card-content${textureClass}" style="${bgStyle}">
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
  const scratchGradient = textureHeaderColors[cardConfig.texture] || textureHeaderColors.black;
  [document.getElementById('preview-card'), document.getElementById('mobile-preview-card')]
    .filter(Boolean)
    .forEach(card => {
      card.innerHTML = renderCardHTML(cardConfig);
      card.style.background = showScratchPreview ? scratchGradient : '';
    });
}

function setScratchPreview(show) {
  showScratchPreview = show;
  document.querySelectorAll('.scratch-toggle-check').forEach(cb => cb.checked = show);
  renderPreview();
}

// Mobile tabs
function setMobileTab(tab) {
  const isPreview = tab === 'preview';
  document.getElementById('editor-layout').style.display = isPreview ? 'none' : '';
  const previewSection = document.getElementById('mobile-preview-section');
  previewSection.style.display = isPreview ? 'block' : 'none';
  document.querySelectorAll('.mobile-tab').forEach(btn => {
    btn.classList.toggle('active', (btn.textContent.trim() === 'Vista previa') === isPreview);
  });
  if (isPreview) renderPreview();
}

// Generate
async function generateCard() {
  const isMobile = window.innerWidth < 900;
  const btn = (isMobile && document.getElementById('mobile-generate-btn'))
    ? document.getElementById('mobile-generate-btn')
    : document.getElementById('generate-btn');
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

  const isMobile = window.innerWidth < 640;
  const canShare = isMobile && !!navigator.share;
  document.getElementById('share-btn').style.display = canShare ? '' : 'none';
  document.getElementById('email-btn').style.display = canShare ? 'none' : '';

  setTimeout(() => animatePreview(previewCard), 300);
  modal.classList.add('show');
}

async function shareCard() {
  if (!generatedCardData) return;
  try {
    await navigator.share({
      title: 'Tarjeta regalo sorpresa',
      text: '¡Te envío una tarjeta regalo! Ábrela para descubrir tu sorpresa.',
      url: generatedCardData.url
    });
  } catch (err) {
    if (err.name !== 'AbortError') showEmailModal();
  }
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

  const textureGradients = { ...textureHeaderColors };

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
  }
});

document.getElementById('email-modal-overlay').addEventListener('click', (e) => {
  if (e.target.id === 'email-modal-overlay') closeEmailModal();
});
