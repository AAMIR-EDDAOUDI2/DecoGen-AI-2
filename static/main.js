// ── I18N / LANGUAGE SWITCHER ──────────────────────────────────
const translations = {
  en: {
    'nav.home': 'Home', 'nav.design': 'Design Room',
    'nav.gallery': 'Gallery', 'nav.about': 'About',
    'hero.eyebrow': 'AI-Powered Interior Design',
    'hero.h1': 'Design Your <em>Dream</em> Space',
    'hero.desc': 'Upload a photo of your room and let our AI reimagine it in seconds — any style, any mood.',
    'hero.cta': 'Start Designing',
    'generate.eyebrow': 'Transform', 'generate.heading': 'Design Your Room',
    'generate.subhead': 'Upload a photo and describe the style — our AI handles the rest.',
    'generate.step1': 'Upload Room Photo', 'generate.step2': 'Choose a Style',
    'generate.step3': 'Aspect Ratio',
    'generate.placeholder': 'Or describe your own style… e.g. Scandinavian with warm oak and linen.',
    'generate.submit': 'Generate Design',
    'pill.modern': 'Modern', 'pill.cozy': 'Cozy', 'pill.office': 'Office',
    'pill.natural': 'Natural', 'pill.creative': 'Creative',
    'result.placeholder': 'Your transformed room appears here',
    'result.loading': 'AI is reimagining your room — usually 10–25 seconds…',
    'result.before': 'Before', 'result.after': 'After', 'result.compare': 'Compare',
    'ar.landscape': '16:9 — Landscape', 'ar.square': '1:1 — Square', 'ar.portrait': '9:16 — Portrait',
  },
  fr: {
    'nav.home': 'Accueil', 'nav.design': 'Créer',
    'nav.gallery': 'Galerie', 'nav.about': 'À propos',
    'hero.eyebrow': 'Design d\'intérieur par IA',
    'hero.h1': 'Concevez votre espace <em>de rêve</em>',
    'hero.desc': 'Téléchargez une photo de votre pièce et laissez notre IA la réimaginer en quelques secondes.',
    'hero.cta': 'Commencer',
    'generate.eyebrow': 'Transformer', 'generate.heading': 'Concevez votre pièce',
    'generate.subhead': 'Téléchargez une photo et décrivez le style — notre IA fait le reste.',
    'generate.step1': 'Photo de la pièce', 'generate.step2': 'Choisir un style',
    'generate.step3': 'Format d\'image',
    'generate.placeholder': 'Décrivez votre style… ex : Scandinave avec chêne et lin.',
    'generate.submit': 'Générer le design',
    'pill.modern': 'Moderne', 'pill.cozy': 'Cosy', 'pill.office': 'Bureau',
    'pill.natural': 'Naturel', 'pill.creative': 'Créatif',
    'result.placeholder': 'Votre pièce transformée apparaît ici',
    'result.loading': 'L\'IA réimagine votre pièce — environ 10–25 secondes…',
    'result.before': 'Avant', 'result.after': 'Après', 'result.compare': 'Comparer',
    'ar.landscape': '16:9 — Paysage', 'ar.square': '1:1 — Carré', 'ar.portrait': '9:16 — Portrait',
  },
  ar: {
    'nav.home': 'الرئيسية', 'nav.design': 'تصميم الغرفة',
    'nav.gallery': 'المعرض', 'nav.about': 'حول',
    'hero.eyebrow': 'تصميم داخلي بالذكاء الاصطناعي',
    'hero.h1': 'صمّم مساحتك <em>المثالية</em>',
    'hero.desc': 'ارفع صورة غرفتك ودع الذكاء الاصطناعي يعيد تخيّلها في ثوانٍ — أي أسلوب، أي مزاج.',
    'hero.cta': 'ابدأ التصميم',
    'generate.eyebrow': 'حوّل', 'generate.heading': 'صمّم غرفتك',
    'generate.subhead': 'ارفع صورة وصف الأسلوب — الذكاء الاصطناعي يتولى الباقي.',
    'generate.step1': 'رفع صورة الغرفة', 'generate.step2': 'اختر أسلوباً',
    'generate.step3': 'نسبة الأبعاد',
    'generate.placeholder': 'صف أسلوبك الخاص… مثلاً: نمط اسكندنافي بخشب البلوط.',
    'generate.submit': 'توليد التصميم',
    'pill.modern': 'عصري', 'pill.cozy': 'دافئ', 'pill.office': 'مكتبي',
    'pill.natural': 'طبيعي', 'pill.creative': 'إبداعي',
    'result.placeholder': 'غرفتك المحوّلة ستظهر هنا',
    'result.loading': 'الذكاء الاصطناعي يعيد تخيّل غرفتك — عادةً 10–25 ثانية…',
    'result.before': 'قبل', 'result.after': 'بعد', 'result.compare': 'مقارنة',
    'ar.landscape': '16:9 — أفقي', 'ar.square': '1:1 — مربع', 'ar.portrait': '9:16 — عمودي',
  }
};

function applyLang(lang) {
  const html = document.documentElement;
  html.setAttribute('data-lang', lang);
  html.setAttribute('lang', lang);
  // RTL for Arabic
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  const t = translations[lang];

  // Translate all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });

  // Translate innerHTML (for elements with <em> tags etc.)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key]) el.innerHTML = t[key];
  });

  // Translate placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) el.placeholder = t[key];
  });

  // Translate <option> elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (el.tagName === 'OPTION') {
      const key = el.getAttribute('data-i18n');
      if (t[key]) el.textContent = t[key];
    }
  });

  // Update active lang button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

// Init lang switcher
(function() {
  let currentLang = 'en';
  applyLang(currentLang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentLang = btn.getAttribute('data-lang');
      applyLang(currentLang);
    });
  });
})();

// ── THEME TOGGLE ──────────────────────────────────────────────
(function () {
  const html = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');
  let theme = html.getAttribute('data-theme') ||
    (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');

  function applyTheme(t) {
    html.setAttribute('data-theme', t);
    if (toggle) toggle.innerHTML = t === 'dark'
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }

  applyTheme(theme);
  toggle && toggle.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
  });
})();

// ── NAVBAR SCROLL ─────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── ACTIVE NAV LINK ON SCROLL ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => observer.observe(s));

// ── MOBILE NAV ────────────────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const mobileNav  = document.getElementById('mobileNav');
menuToggle && menuToggle.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuToggle.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', open);
});
mobileNav && mobileNav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  })
);

// ── STYLE PILLS ───────────────────────────────────────────────
const promptTA = document.getElementById('decoration_prompt');
document.querySelectorAll('.style-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.style-pill').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    if (promptTA) promptTA.value = btn.dataset.prompt;
  });
});

// ── TOAST ─────────────────────────────────────────────────────
const toastEl = document.getElementById('toast');
let toastTimer;
function showToast(msg, type = '') {
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.className = 'toast show' + (type ? ' toast-' + type : '');
  toastTimer = setTimeout(() => toastEl.className = 'toast', 3500);
}

// ── BEFORE / AFTER SHOW ───────────────────────────────────────
let capturedBeforeURL = '';

function showBeforeAfter(afterURL) {
  const resultArea        = document.getElementById('resultArea');
  const resultPlaceholder = document.getElementById('resultPlaceholder');
  const loadingPanel      = document.getElementById('loadingPanel');

  document.getElementById('resultImage').src  = afterURL;
  document.getElementById('beforeImage').src  = capturedBeforeURL;
  document.getElementById('sliderAfter').src  = afterURL;
  document.getElementById('sliderBefore').src = capturedBeforeURL;

  loadingPanel.style.display      = 'none';
  resultPlaceholder.style.display = 'none';
  resultArea.style.display        = 'block';

  switchTab('after');
}

// ── TAB SWITCHING ─────────────────────────────────────────────
function switchTab(name) {
  const tabs   = { before: 'tabBefore',  after: 'tabAfter',  slider: 'tabSlider'  };
  const panels = { before: 'panelBefore', after: 'panelAfter', slider: 'panelSlider' };

  Object.keys(tabs).forEach(key => {
    const tab   = document.getElementById(tabs[key]);
    const panel = document.getElementById(panels[key]);
    const active = key === name;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', active);
    panel.classList.toggle('active', active);
    if (active) panel.removeAttribute('hidden');
    else panel.setAttribute('hidden', '');
  });

  if (name === 'slider') initSlider();
}

document.getElementById('tabBefore')?.addEventListener('click', () => switchTab('before'));
document.getElementById('tabAfter')?.addEventListener('click',  () => switchTab('after'));
document.getElementById('tabSlider')?.addEventListener('click', () => switchTab('slider'));

// ── COMPARE SLIDER ────────────────────────────────────────────
function initSlider() {
  const wrap    = document.getElementById('baSliderWrap');
  const clip    = document.getElementById('baClip');
  const divider = document.getElementById('baDivider');
  if (!wrap || !clip || !divider) return;

  let dragging = false;

  function setPos(clientX) {
    const rect = wrap.getBoundingClientRect();
    let pct = (clientX - rect.left) / rect.width;
    pct = Math.min(1, Math.max(0, pct));
    const perc = pct * 100;
    clip.style.width   = perc + '%';
    divider.style.left = perc + '%';
    divider.setAttribute('aria-valuenow', Math.round(perc));
  }

  wrap.addEventListener('mousedown',   e => { dragging = true; setPos(e.clientX); });
  window.addEventListener('mousemove', e => { if (dragging) setPos(e.clientX); });
  window.addEventListener('mouseup',   () => { dragging = false; });

  wrap.addEventListener('touchstart',  e => { dragging = true; setPos(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('touchmove', e => { if (dragging) setPos(e.touches[0].clientX); },   { passive: true });
  window.addEventListener('touchend',  () => { dragging = false; });

  divider.addEventListener('keydown', e => {
    const rect = wrap.getBoundingClientRect();
    const cur  = parseFloat(clip.style.width) || 50;
    if (e.key === 'ArrowLeft')  setPos(rect.left + (cur - 5) / 100 * rect.width);
    if (e.key === 'ArrowRight') setPos(rect.left + (cur + 5) / 100 * rect.width);
  });
}

// ── DOWNLOAD BUTTON ───────────────────────────────────────────
const downloadCheck = document.getElementById('downloadCheck');
downloadCheck && downloadCheck.addEventListener('change', function () {
  if (!this.checked) return;
  const src = document.getElementById('resultImage')?.src;
  if (!src) return;
  fetch(src)
    .then(r => r.blob())
    .then(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'decogen-design.jpg';
      a.click();
      URL.revokeObjectURL(a.href);
    })
    .catch(() => showToast('Download failed', 'error'));
});

// ── MIC / VOICE INPUT ─────────────────────────────────────────
const micBtn          = document.getElementById('micBtn');
const voiceOverlay    = document.getElementById('voiceOverlay');
const voiceCancel     = document.getElementById('voiceCancel');
const voiceConfirm    = document.getElementById('voiceConfirm');
const voiceLabel      = document.getElementById('voiceLabel');
const voiceTranscript = document.getElementById('voiceTranscript');

let recognition = null;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition && micBtn) {
  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.continuous = false;

  recognition.onstart = () => {
    micBtn.classList.add('listening');
    voiceOverlay.classList.add('active');
    voiceLabel.textContent = 'Listening…';
    voiceTranscript.textContent = '';
  };

  recognition.onresult = e => {
    const transcript = Array.from(e.results)
      .map(r => r[0].transcript).join('');
    voiceTranscript.textContent = transcript;
    if (e.results[e.results.length - 1].isFinal) {
      if (promptTA) promptTA.value = transcript;
      stopVoice();
    }
  };

  recognition.onerror = e => {
    voiceLabel.textContent = 'Error: ' + e.error;
    setTimeout(stopVoice, 1500);
  };

  recognition.onend = () => stopVoice();

  micBtn.addEventListener('click', () => {
    try { recognition.start(); }
    catch { /* already running */ }
  });
} else if (micBtn) {
  micBtn.title = 'Voice input not supported in this browser';
  micBtn.style.opacity = '0.4';
  micBtn.style.cursor  = 'not-allowed';
}

function stopVoice() {
  recognition && recognition.abort();
  micBtn && micBtn.classList.remove('listening');
  voiceOverlay && voiceOverlay.classList.remove('active');
}

voiceCancel  && voiceCancel.addEventListener('click', stopVoice);
voiceConfirm && voiceConfirm.addEventListener('click', () => {
  if (promptTA && voiceTranscript.textContent) {
    promptTA.value = voiceTranscript.textContent;
  }
  stopVoice();
});

// ── POLL JOB STATUS ───────────────────────────────────────────
function pollStatus(jobId) {
  return new Promise((resolve, reject) => {
    const MAX_WAIT = 120000;
    const INTERVAL = 2500;
    let elapsed = 0;

    const timer = setInterval(async () => {
      elapsed += INTERVAL;
      if (elapsed > MAX_WAIT) {
        clearInterval(timer);
        reject(new Error('Generation timed out. Please try again.'));
        return;
      }

      try {
        const res  = await fetch(`/status/${jobId}`);
        const data = await res.json();

        if (data.status === 'done') {
          clearInterval(timer);
          resolve(`/result/${jobId}`);
        } else if (data.status === 'error') {
          clearInterval(timer);
          reject(new Error(data.error || 'Generation failed'));
        }
      } catch (err) {
        clearInterval(timer);
        reject(err);
      }
    }, INTERVAL);
  });
}

// ── FORM SUBMIT ───────────────────────────────────────────────
const form              = document.getElementById('aiDesignForm');
const submitBtn         = document.getElementById('submitBtn');
const loadingPanel      = document.getElementById('loadingPanel');
const resultPlaceholder = document.getElementById('resultPlaceholder');

form && form.addEventListener('submit', async e => {
  e.preventDefault();

  const fileInput = document.getElementById('room_image');
  const prompt    = promptTA?.value.trim();

  if (!fileInput?.files[0]) { showToast('Please upload a room photo.', 'error'); return; }
  if (!prompt)              { showToast('Please enter or choose a style.', 'error'); return; }

  capturedBeforeURL = URL.createObjectURL(fileInput.files[0]);

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Generating…`;

  document.getElementById('resultArea').style.display = 'none';
  resultPlaceholder.style.display = 'none';
  loadingPanel.style.display      = 'block';

  const bar = document.getElementById('loadingBar');
  bar.style.animation = 'none';
  bar.offsetHeight;
  bar.style.animation = 'loadProgress 20s ease forwards';

  const formData = new FormData(form);

  try {
    const res = await fetch('/decorate-room', {
      method: 'POST',
      body: formData
    });

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await res.text();
      console.error('Non-JSON response:', text);
      throw new Error('Server error — check deployment logs');
    }

    const data = await res.json();
    if (!res.ok || data.error) throw new Error(data.error || 'Request failed');

    const jobId = data.job_id;
    if (!jobId) throw new Error('No job ID returned from server');

    const resultURL = await pollStatus(jobId);

    showBeforeAfter(resultURL);
    submitBtn.classList.add('success');
    submitBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Design Ready!`;
    showToast('Your room has been redesigned ✨');

  } catch (err) {
    loadingPanel.style.display      = 'none';
    resultPlaceholder.style.display = 'flex';
    submitBtn.classList.add('error');
    submitBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> Try Again`;
    showToast(err.message || 'Something went wrong', 'error');
    console.error('[DecoGen Error]', err);

  } finally {
    submitBtn.disabled = false;
    setTimeout(() => {
      submitBtn.classList.remove('success', 'error');
      submitBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Generate Design`;
    }, 4000);
  }
});

// ── SPIN KEYFRAME ─────────────────────────────────────────────
const styleTag = document.createElement('style');
styleTag.textContent = `@keyframes spin{to{transform:rotate(360deg)}}`;
document.head.appendChild(styleTag);

// ── REACTION PANEL ────────────────────────────────────────────
document.querySelectorAll('.reaction-btn').forEach(btn => {
  btn.addEventListener('click', function () {

    /* toggle reacted state — only one active at a time */
    const wasReacted = this.classList.contains('reacted');
    document.querySelectorAll('.reaction-btn').forEach(b => b.classList.remove('reacted'));
    if (!wasReacted) this.classList.add('reacted');

    /* burst — 6 emoji particles fan upward from click point */
    const emoji = this.dataset.emoji;
    const rect  = this.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const count = 6;

    for (let i = 0; i < count; i++) {
      const el     = document.createElement('span');
      el.className = 'emoji-burst';
      el.textContent = emoji;

      const spread = (i - (count - 1) / 2) * 22;
      const delay  = i * 55;

      el.style.cssText = `
        left: ${cx + spread}px;
        top:  ${cy}px;
        animation-delay: ${delay}ms;
        transform-origin: center bottom;
      `;

      document.body.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }
  });
});
