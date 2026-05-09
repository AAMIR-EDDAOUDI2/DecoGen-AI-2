// ── I18N / LANGUAGE SWITCHER ──────────────────────────────────
const translations = {
  en: {
    'nav.home': 'Home', 'nav.design': 'Design Room',
    'nav.gallery': 'Gallery', 'nav.about': 'About',
    'nav.reviews': 'Reviews',
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
    'upload.idle': 'Click to upload image',
    'upload.done': '✓ Image uploaded — ready to generate!',
    'lang.label': 'Language',
    'gallery.eyebrow': 'Showcase', 'gallery.heading': 'AI Design Gallery',
    'gallery.subhead': 'Rooms reimagined by DecoGen AI.',
    'gallery.item1': 'Modern Minimal', 'gallery.item2': 'Cozy Retreat',
    'gallery.item3': 'Home Office', 'gallery.item4': 'Natural Warmth',
    'gallery.item5': 'Creative Studio', 'gallery.item6': 'Luxury Interior',
    'about.eyebrow': 'About the Project',
    'about.heading': 'Where AI Meets <em>Interior Design</em>',
    'about.desc': 'DecoGen AI uses advanced deep learning to reimagine living spaces. Upload a photo, choose a style, and receive a realistic concept render in seconds — powered by FLUX Kontext image models from Black Forest Labs.',
    'about.stat1': 'Model Engine', 'about.stat2': 'Design Styles',
    'about.stat3': 'Generation Time', 'about.stat4': 'PFE Project 2026',
    'ar.landscape': '16:9 — Landscape', 'ar.square': '1:1 — Square', 'ar.portrait': '9:16 — Portrait',
    'reviews.eyebrow': 'Community', 'reviews.heading': 'What Users Say',
    'reviews.subhead': 'Real feedback from people who used DecoGen AI.',
    'reviews.formTitle': 'Leave a Review',
    'reviews.namePlaceholder': 'Your name',
    'reviews.commentPlaceholder': 'Share your experience…',
    'reviews.submit': 'Submit Review',
    'reviews.empty': 'No reviews yet — be the first!',
  },
  fr: {
    'nav.home': 'Accueil', 'nav.design': 'Créer',
    'nav.gallery': 'Galerie', 'nav.about': 'À propos',
    'nav.reviews': 'Avis',
    'hero.eyebrow': "Design d'intérieur par IA",
    'hero.h1': 'Concevez votre espace <em>de rêve</em>',
    'hero.desc': 'Téléchargez une photo de votre pièce et laissez notre IA la réimaginer en quelques secondes.',
    'hero.cta': 'Commencer',
    'generate.eyebrow': 'Transformer', 'generate.heading': 'Concevez votre pièce',
    'generate.subhead': 'Téléchargez une photo et décrivez le style — notre IA fait le reste.',
    'generate.step1': 'Photo de la pièce', 'generate.step2': 'Choisir un style',
    'generate.step3': "Format d'image",
    'generate.placeholder': 'Décrivez votre style… ex : Scandinave avec chêne et lin.',
    'generate.submit': 'Générer le design',
    'pill.modern': 'Moderne', 'pill.cozy': 'Cosy', 'pill.office': 'Bureau',
    'pill.natural': 'Naturel', 'pill.creative': 'Créatif',
    'result.placeholder': 'Votre pièce transformée apparaît ici',
    'result.loading': "L'IA réimagine votre pièce — environ 10–25 secondes…",
    'result.before': 'Avant', 'result.after': 'Après', 'result.compare': 'Comparer',
    'upload.idle': 'Cliquez pour uploader une image',
    'upload.done': '✓ Image chargée — prête à générer !',
    'lang.label': 'Langue',
    'gallery.eyebrow': 'Vitrine', 'gallery.heading': 'Galerie IA',
    'gallery.subhead': 'Pièces réimaginées par DecoGen AI.',
    'gallery.item1': 'Minimal Moderne', 'gallery.item2': 'Retraite Cosy',
    'gallery.item3': 'Bureau à domicile', 'gallery.item4': 'Chaleur Naturelle',
    'gallery.item5': 'Studio Créatif', 'gallery.item6': 'Intérieur Luxe',
    'about.eyebrow': 'À propos du projet',
    'about.heading': "Quand l'IA rencontre le <em>Design d'intérieur</em>",
    'about.desc': 'DecoGen AI utilise le deep learning pour réimaginer les espaces de vie. Téléchargez une photo, choisissez un style, et recevez un rendu réaliste en quelques secondes.',
    'about.stat1': 'Moteur IA', 'about.stat2': 'Styles de design',
    'about.stat3': 'Temps de génération', 'about.stat4': 'Projet PFE 2026',
    'ar.landscape': '16:9 — Paysage', 'ar.square': '1:1 — Carré', 'ar.portrait': '9:16 — Portrait',
    'reviews.eyebrow': 'Communauté', 'reviews.heading': 'Avis des utilisateurs',
    'reviews.subhead': 'Retours réels de personnes ayant utilisé DecoGen AI.',
    'reviews.formTitle': 'Laisser un avis',
    'reviews.namePlaceholder': 'Votre nom',
    'reviews.commentPlaceholder': 'Partagez votre expérience…',
    'reviews.submit': 'Soumettre',
    'reviews.empty': "Aucun avis pour l'instant — soyez le premier !",
  },
  ar: {
    'nav.home': 'الرئيسية', 'nav.design': 'تصميم الغرفة',
    'nav.gallery': 'المعرض', 'nav.about': 'حول',
    'nav.reviews': 'التقييمات',
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
    'upload.idle': 'انقر لرفع صورة',
    'upload.done': '✓ تم رفع الصورة — جاهز للتوليد!',
    'lang.label': 'اللغة',
    'gallery.eyebrow': 'معرض الأعمال', 'gallery.heading': 'معرض تصاميم الذكاء الاصطناعي',
    'gallery.subhead': 'غرف أعاد تخيّلها DecoGen AI.',
    'gallery.item1': 'عصري بسيط', 'gallery.item2': 'مريح ودافئ',
    'gallery.item3': 'مكتب منزلي', 'gallery.item4': 'دفء طبيعي',
    'gallery.item5': 'استوديو إبداعي', 'gallery.item6': 'ديكور فاخر',
    'about.eyebrow': 'عن المشروع',
    'about.heading': 'حين يلتقي الذكاء الاصطناعي بـ<em>التصميم الداخلي</em>',
    'about.desc': 'يستخدم DecoGen AI التعلم العميق لإعادة تخيّل المساحات. ارفع صورة، اختر أسلوباً، واحصل على تصور واقعي في ثوانٍ.',
    'about.stat1': 'محرك الذكاء الاصطناعي', 'about.stat2': 'أنماط التصميم',
    'about.stat3': 'وقت التوليد', 'about.stat4': 'مشروع PFE 2026',
    'ar.landscape': '16:9 — أفقي', 'ar.square': '1:1 — مربع', 'ar.portrait': '9:16 — عمودي',
    'reviews.eyebrow': 'المجتمع', 'reviews.heading': 'آراء المستخدمين',
    'reviews.subhead': 'تقييمات حقيقية من مستخدمي DecoGen AI.',
    'reviews.formTitle': 'اترك تقييماً',
    'reviews.namePlaceholder': 'اسمك',
    'reviews.commentPlaceholder': 'شاركنا تجربتك…',
    'reviews.submit': 'إرسال التقييم',
    'reviews.empty': 'لا توجد تقييمات بعد — كن الأول!',
  }
};

// ── HELPERS: set button state ─────────────────────────────────
function setBtnDefault(btn, lang) {
  const t = translations[lang] || translations['en'];
  btn.classList.remove('success', 'error', 'is-generating');
  btn.innerHTML = `
    <span class="btn-default-content">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
      <span data-i18n="generate.submit">${t['generate.submit']}</span>
    </span>
    <span class="btn-generating-content">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="opacity:.6">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
      <span class="btn-loader">
        <span class="btn-loader-static">Generating</span>
        <div class="btn-loader-words" aria-hidden="true">
          <span class="btn-loader-word">style…</span>
          <span class="btn-loader-word">layout…</span>
          <span class="btn-loader-word">colors…</span>
          <span class="btn-loader-word">details…</span>
          <span class="btn-loader-word">style…</span>
        </div>
      </span>
    </span>`;
}

function setBtnGenerating(btn) {
  btn.classList.add('is-generating');
}

function setBtnSuccess(btn, lang) {
  btn.classList.remove('is-generating');
  btn.classList.add('success');
  const msg = lang === 'fr' ? 'Design prêt !' : lang === 'ar' ? '!التصميم جاهز' : 'Design Ready!';
  btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> ${msg}`;
}

function setBtnError(btn, lang) {
  btn.classList.remove('is-generating');
  btn.classList.add('error');
  const msg = lang === 'fr' ? 'Réessayer' : lang === 'ar' ? 'حاول مجدداً' : 'Try Again';
  btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> ${msg}`;
}

// ── applyLang ─────────────────────────────────────────────────
function applyLang(lang) {
  const html = document.documentElement;
  html.setAttribute('data-lang', lang);
  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  const t = translations[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  document.querySelectorAll('.lang-opt').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  const hint = document.getElementById('promptHint');
  if (hint) {
    if (lang === 'en') {
      hint.style.display = 'none';
    } else {
      hint.style.display = 'block';
      hint.textContent = lang === 'fr'
        ? '💡 Pour de meilleurs résultats, décrivez en anglais.'
        : '💡 للحصول على أفضل النتائج، صِف بالإنجليزية.';
    }
  }

  const uploadText = document.getElementById('uploadText');
  const roomInput  = document.getElementById('room_image');
  if (uploadText) {
    const hasFile = roomInput && roomInput.files && roomInput.files.length > 0;
    uploadText.textContent = hasFile ? t['upload.done'] : t['upload.idle'];
  }

  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn && !submitBtn.disabled
      && !submitBtn.classList.contains('success')
      && !submitBtn.classList.contains('error')
      && !submitBtn.classList.contains('is-generating')) {
    setBtnDefault(submitBtn, lang);
  }
}

// ── Lang switcher init ────────────────────────────────────────
(function () {
  let currentLang = 'en';
  applyLang(currentLang);
  document.querySelectorAll('#langSwitcher .lang-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      currentLang = btn.getAttribute('data-lang');
      applyLang(currentLang);
    });
  });
})();

// ── Upload feedback ───────────────────────────────────────────
(function () {
  const input       = document.getElementById('room_image');
  const uploadText  = document.getElementById('uploadText');
  const uploadLabel = document.getElementById('uploadLabel');
  if (!input || !uploadText || !uploadLabel) return;

  input.addEventListener('change', () => {
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    const t = translations[lang];
    if (input.files && input.files.length > 0) {
      const reader = new FileReader();
      reader.onload = e => {
        let prev = uploadLabel.querySelector('.preview-img');
        if (!prev) {
          prev = document.createElement('img');
          prev.className = 'preview-img';
          prev.alt = 'Room preview';
          uploadLabel.prepend(prev);
        }
        prev.src = e.target.result;
        uploadLabel.classList.add('has-preview');
      };
      reader.readAsDataURL(input.files[0]);
      uploadText.textContent = t['upload.done'];
      uploadLabel.style.borderColor = 'var(--color-accent)';
      uploadLabel.style.borderStyle = 'solid';
      const iconSvg = uploadLabel.querySelector('.icon svg');
      if (iconSvg) iconSvg.style.fill = 'var(--color-accent)';
    } else {
      uploadText.textContent = t['upload.idle'];
      uploadLabel.style.borderColor = '';
      uploadLabel.style.borderStyle = '';
      uploadLabel.classList.remove('has-preview');
      const prev = uploadLabel.querySelector('.preview-img');
      if (prev) prev.remove();
      const iconSvg = uploadLabel.querySelector('.icon svg');
      if (iconSvg) iconSvg.style.fill = '';
    }
  });
})();

// ── THEME TOGGLE ──────────────────────────────────────────────
(function () {
  const html  = document.documentElement;
  const input = document.getElementById('themeInput');

  let theme = html.getAttribute('data-theme') ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  function applyTheme(t) {
    html.setAttribute('data-theme', t);
    if (input) input.checked = (t === 'dark');
  }

  applyTheme(theme);

  if (input) {
    input.addEventListener('change', () => {
      theme = input.checked ? 'dark' : 'light';
      applyTheme(theme);
    });
  }
})();

// ── NAVBAR SCROLL ─────────────────────────────────────────────
const navbar = document.getElementById('navbar');
let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
      scrollTicking = false;
    });
    scrollTicking = true;
  }
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

// ── STYLE CARD SELECTION ──────────────────────────────────────
document.querySelectorAll('.style-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.style-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    const prompt = card.getAttribute('data-prompt');
    if (prompt) document.getElementById('decoration_prompt').value = prompt;
  });
});

// ── TOAST ─────────────────────────────────────────────────────
const toastEl = document.getElementById('toast');
let toastTimer;
function showToast(msg, type = '') {
  if (!toastEl) return;
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
  const tabs   = { before: 'tabBefore',   after: 'tabAfter',   slider: 'tabSlider'   };
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
const promptTA        = document.getElementById('decoration_prompt');

let recognition = null;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition && micBtn) {
  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.continuous = false;

  recognition.onstart = () => {
    micBtn.classList.add('listening');
    if (voiceOverlay) voiceOverlay.classList.add('active');
    if (voiceLabel) voiceLabel.textContent = 'Listening…';
    if (voiceTranscript) voiceTranscript.textContent = '';
  };

  recognition.onresult = e => {
    const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
    if (voiceTranscript) voiceTranscript.textContent = transcript;
    if (e.results[e.results.length - 1].isFinal) {
      if (promptTA) promptTA.value = transcript;
      stopVoice();
    }
  };

  recognition.onerror = e => {
    if (voiceLabel) voiceLabel.textContent = 'Error: ' + e.error;
    setTimeout(stopVoice, 1500);
  };

  recognition.onend = () => stopVoice();

  micBtn.addEventListener('click', () => {
    try { recognition.start(); } catch { /* already running */ }
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
  if (promptTA && voiceTranscript?.textContent) promptTA.value = voiceTranscript.textContent;
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

// ── FORM ELEMENTS ─────────────────────────────────────────────
const form              = document.getElementById('aiDesignForm');
const submitBtn         = document.getElementById('submitBtn');
const loadingPanel      = document.getElementById('loadingPanel');
const resultPlaceholder = document.getElementById('resultPlaceholder');

// ── FORM SUBMIT ───────────────────────────────────────────────
form && form.addEventListener('submit', async e => {
  e.preventDefault();

  const fileInput = document.getElementById('room_image');
  const prompt    = promptTA?.value.trim();
  const lang      = document.documentElement.getAttribute('data-lang') || 'en';

  if (!fileInput?.files[0]) { showToast('Please upload a room photo.', 'error'); return; }
  if (!prompt)               { showToast('Please enter or choose a style.', 'error'); return; }

  capturedBeforeURL = URL.createObjectURL(fileInput.files[0]);

  submitBtn.disabled = true;
  setBtnGenerating(submitBtn);

  document.getElementById('resultArea').style.display = 'none';
  resultPlaceholder.style.display = 'none';
  loadingPanel.style.display      = 'block';

  const bar = document.getElementById('loadingBar');
  bar.style.animation = 'none';
  bar.offsetHeight;
  bar.style.animation = 'loadProgress 20s ease forwards';

  const formData = new FormData(form);

  try {
    const res = await fetch('/decorate-room', { method: 'POST', body: formData });

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

    setBtnSuccess(submitBtn, lang);
    showToast(lang === 'fr' ? 'Votre pièce a été redesignée ✨' : lang === 'ar' ? '✨ تم إعادة تصميم غرفتك' : 'Your room has been redesigned ✨');

  } catch (err) {
    loadingPanel.style.display      = 'none';
    resultPlaceholder.style.display = 'flex';
    setBtnError(submitBtn, lang);
    showToast(err.message || 'Something went wrong', 'error');
    console.error('[DecoGen Error]', err);

  } finally {
    submitBtn.disabled = false;
    setTimeout(() => setBtnDefault(submitBtn, lang), 4000);
  }
});

// ── SPIN KEYFRAME ─────────────────────────────────────────────
const styleTag = document.createElement('style');
styleTag.textContent = `@keyframes spin{to{transform:rotate(360deg)}}`;
document.head.appendChild(styleTag);

// ── REACTION PANEL ────────────────────────────────────────────
document.querySelectorAll('.reaction-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const wasReacted = this.classList.contains('reacted');
    document.querySelectorAll('.reaction-btn').forEach(b => b.classList.remove('reacted'));
    if (!wasReacted) this.classList.add('reacted');

    const emoji = this.dataset.emoji;
    const rect  = this.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const count = 6;

    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
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

// ── REVIEWS ───────────────────────────────────────────────────
(function () {
  const grid      = document.getElementById('reviewsGrid');
  const emptyMsg  = document.getElementById('reviewsEmpty');
  const form      = document.getElementById('reviewForm');
  const nameInput = document.getElementById('reviewName');
  const commentEl = document.getElementById('reviewComment');
  const submitBtn = document.getElementById('reviewSubmitBtn');
  const starBtns  = document.querySelectorAll('.star-btn');
  let selectedRating = 0;

  // ── Star interaction ──
  starBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedRating = parseInt(btn.dataset.val);
      starBtns.forEach(s => {
        s.classList.toggle('active', parseInt(s.dataset.val) <= selectedRating);
      });
    });
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') btn.click();
    });
  });

  // ── Escape HTML ──
  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ── Render single card ──
  function createCard(r) {
    const card  = document.createElement('div');
    card.className = 'review-card';
    const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
    const date  = new Date(r.created_at).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
    card.innerHTML = `
      <div class="review-card-header">
        <span class="review-card-name">${escapeHtml(r.name)}</span>
        <span class="review-card-stars" aria-label="${r.rating} out of 5 stars">${stars}</span>
      </div>
      <p class="review-card-comment">${escapeHtml(r.comment)}</p>
      <span class="review-card-date">${date}</span>`;
    return card;
  }

  // ── Load reviews from backend ──
  async function loadReviews() {
    try {
      const res  = await fetch('/get-reviews');
      const data = await res.json();
      if (!data.reviews || data.reviews.length === 0) {
        if (emptyMsg) emptyMsg.style.display = 'block';
        return;
      }
      if (emptyMsg) emptyMsg.style.display = 'none';
      if (grid) {
        grid.innerHTML = '';
        data.reviews.forEach(r => grid.appendChild(createCard(r)));
      }
    } catch (e) {
      console.error('[Reviews] load failed', e);
    }
  }

  // ── Submit review ──
  form && form.addEventListener('submit', async e => {
    e.preventDefault();
    const lang = document.documentElement.getAttribute('data-lang') || 'en';

    const name    = nameInput?.value.trim();
    const comment = commentEl?.value.trim();

    if (!name)           { showToast('Please enter your name.', 'error'); return; }
    if (!selectedRating) { showToast('Please select a star rating.', 'error'); return; }
    if (!comment)        { showToast('Please write a comment.', 'error'); return; }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
           style="animation:spin 1s linear infinite">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg> ${lang === 'fr' ? 'Envoi…' : lang === 'ar' ? '…إرسال' : 'Sending…'}`;

    try {
      const res = await fetch('/submit-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating: selectedRating, comment })
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error);

      submitBtn.classList.add('success');
      submitBtn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg> ${lang === 'fr' ? 'Envoyé !' : lang === 'ar' ? '!تم الإرسال' : 'Submitted!'}`;

      showToast(lang === 'fr' ? 'Merci pour votre avis ! ✨' : lang === 'ar' ? '✨ شكراً على تقييمك' : 'Thanks for your review! ✨');

      nameInput.value = '';
      commentEl.value = '';
      selectedRating  = 0;
      starBtns.forEach(s => s.classList.remove('active'));

      await loadReviews();

    } catch (err) {
      submitBtn.classList.add('error');
      submitBtn.innerHTML = lang === 'fr' ? 'Réessayer' : lang === 'ar' ? 'حاول مجدداً' : 'Try Again';
      showToast(err.message || 'Failed to submit review', 'error');
    } finally {
      submitBtn.disabled = false;
      setTimeout(() => {
        submitBtn.classList.remove('success', 'error');
        const t = translations[lang] || translations['en'];
        submitBtn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
          </svg>
          <span data-i18n="reviews.submit">${t['reviews.submit']}</span>`;
      }, 3000);
    }
  });

  loadReviews();
})();

// ── AUTH STATE ────────────────────────────────────────────────
(function () {
  fetch('/auth/me')
    .then(r => r.json())
    .then(data => {
      const heroSignIn     = document.getElementById('heroSignInBtn');
      const authIconBtn    = document.getElementById('authIconBtn');
      const authAvatar     = document.getElementById('authAvatar');
      const authAvatarImg  = document.getElementById('authAvatarImg');
      const authUserName   = document.getElementById('authUserName');
      const navDesigns     = document.getElementById('navDesigns');
      const mobileDesigns  = document.getElementById('mobileDesignsLink');
      const mobileSignIn   = document.getElementById('mobileSignIn');

      if (data.logged_in) {
        // Show avatar, hide icon button
        if (authIconBtn)   authIconBtn.style.display   = 'none';
        if (authAvatar)    authAvatar.style.display     = 'flex';
        if (authAvatarImg) authAvatarImg.src            = data.avatar;
        if (authUserName)  authUserName.textContent     = data.name;
        if (navDesigns)    navDesigns.style.display     = 'inline-flex';
        if (mobileDesigns) mobileDesigns.style.display  = 'block';
        if (heroSignIn)    heroSignIn.style.display     = 'none';
        if (mobileSignIn)  mobileSignIn.style.display   = 'none';
      } else {
        if (authIconBtn)   authIconBtn.style.display   = 'flex';
        if (authAvatar)    authAvatar.style.display     = 'none';
        if (navDesigns)    navDesigns.style.display     = 'none';
        if (mobileDesigns) mobileDesigns.style.display  = 'none';
        if (heroSignIn)    heroSignIn.style.display     = 'inline-flex';
        if (mobileSignIn)  mobileSignIn.style.display   = 'block';
      }
    });

  // Avatar dropdown toggle
  const avatarImg = document.getElementById('authAvatarImg');
  const dropdown  = document.getElementById('authDropdown');
  avatarImg && avatarImg.addEventListener('click', () => {
    dropdown && dropdown.classList.toggle('open');
  });

  document.getElementById('authSignOut')?.addEventListener('click', () => {
    window.location.href = '/auth/logout';
  });

  // Close dropdown on outside click
  document.addEventListener('click', e => {
    const avatar = document.getElementById('authAvatar');
    if (avatar && !avatar.contains(e.target)) {
      dropdown && dropdown.classList.remove('open');
    }
  });

  // Auth icon button — redirect to login
  document.getElementById('authIconBtn')?.addEventListener('click', () => {
    window.location.href = '/auth/login';
  });
})();
