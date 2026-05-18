'use strict';

// ── TRANSLATIONS ──────────────────────────────────────────────
const translations = {
  en: {
    'nav.home': 'Home', 'nav.design': 'Design Room',
    'nav.gallery': 'Gallery', 'nav.about': 'About',
    'nav.reviews': 'Reviews', 'nav.designs': 'My Designs',
    'hero.eyebrow': 'AI-Powered Interior Design',
    'hero.h1': 'Design Your <em>Dream</em> Space',
    'hero.desc': 'Upload a photo of your room and let our AI reimagine it in seconds — any style, any mood.',
    'hero.cta': 'Start Designing',
    'auth.signin': 'Sign In', 'auth.signout': 'Sign Out',
    'generate.eyebrow': 'Transform',
    'generate.heading': 'Design Your Room',
    'generate.subhead': 'Upload a photo and describe the style — our AI handles the rest.',
    'generate.step1': 'Upload Room Photo',
    'generate.step2': 'Choose a Style',
    'generate.step3': 'Aspect Ratio',
    'generate.placeholder': 'Or describe your own style… e.g. Scandinavian with warm oak and linen.',
    'generate.submit': 'Generate Design',
    'generate.viewsaved': 'View My Saved Designs',
    'pill.modern': 'Modern Minimalist',
    'result.placeholder': 'Your transformed room appears here',
    'result.loading': 'AI is reimagining your room — usually 10–25 seconds…',
    'result.before': 'Before', 'result.after': 'After', 'result.compare': 'Compare',
    'result.saveImage': 'Save Image', 'result.saved': 'Saved ✓',
    'upload.idle': 'Click to upload image',
    'upload.done': '✓ Image uploaded — ready to generate!',
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
    'nav.reviews': 'Avis', 'nav.designs': 'Mes designs',
    'hero.eyebrow': "Design d'intérieur par IA",
    'hero.h1': 'Concevez votre espace <em>de rêve</em>',
    'hero.desc': 'Téléchargez une photo de votre pièce et laissez notre IA la réimaginer en quelques secondes.',
    'hero.cta': 'Commencer',
    'auth.signin': 'Se connecter', 'auth.signout': 'Déconnexion',
    'generate.eyebrow': 'Transformer',
    'generate.heading': 'Concevez votre pièce',
    'generate.subhead': 'Téléchargez une photo et décrivez le style — notre IA fait le reste.',
    'generate.step1': 'Photo de la pièce',
    'generate.step2': 'Choisir un style',
    'generate.step3': "Format d'image",
    'generate.placeholder': 'Décrivez votre style… ex : Scandinave avec chêne et lin.',
    'generate.submit': 'Générer le design',
    'generate.viewsaved': 'Voir mes designs sauvegardés',
    'pill.modern': 'Moderne',
    'result.placeholder': 'Votre pièce transformée apparaît ici',
    'result.loading': "L'IA réimagine votre pièce — environ 10–25 secondes…",
    'result.before': 'Avant', 'result.after': 'Après', 'result.compare': 'Comparer',
    'result.saveImage': "Enregistrer l'image", 'result.saved': 'Enregistré ✓',
    'upload.idle': 'Cliquez pour uploader une image',
    'upload.done': '✓ Image chargée — prête à générer !',
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
    'nav.reviews': 'التقييمات', 'nav.designs': 'تصاميمي',
    'hero.eyebrow': 'تصميم داخلي بالذكاء الاصطناعي',
    'hero.h1': 'صمّم مساحتك <em>المثالية</em>',
    'hero.desc': 'ارفع صورة غرفتك ودع الذكاء الاصطناعي يعيد تخيّلها في ثوانٍ — أي أسلوب، أي مزاج.',
    'hero.cta': 'ابدأ التصميم',
    'auth.signin': 'تسجيل الدخول', 'auth.signout': 'تسجيل الخروج',
    'generate.eyebrow': 'حوّل',
    'generate.heading': 'صمّم غرفتك',
    'generate.subhead': 'ارفع صورة وصف الأسلوب — الذكاء الاصطناعي يتولى الباقي.',
    'generate.step1': 'رفع صورة الغرفة',
    'generate.step2': 'اختر أسلوباً',
    'generate.step3': 'نسبة الأبعاد',
    'generate.placeholder': 'صف أسلوبك الخاص… مثلاً: نمط اسكندنافي بخشب البلوط.',
    'generate.submit': 'توليد التصميم',
    'generate.viewsaved': 'عرض تصاميمي المحفوظة',
    'pill.modern': 'عصري',
    'result.placeholder': 'غرفتك المحوّلة ستظهر هنا',
    'result.loading': 'الذكاء الاصطناعي يعيد تخيّل غرفتك — عادةً 10–25 ثانية…',
    'result.before': 'قبل', 'result.after': 'بعد', 'result.compare': 'مقارنة',
    'result.saveImage': 'حفظ الصورة', 'result.saved': 'تم الحفظ ✓',
    'upload.idle': 'انقر لرفع صورة',
    'upload.done': '✓ تم رفع الصورة — جاهز للتوليد!',
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

// ── APPLY LANGUAGE ────────────────────────────────────────────
function applyLang(lang) {
  const t = translations[lang] || translations['en'];
  const root = document.documentElement;
  root.setAttribute('data-lang', lang);
  root.setAttribute('lang', lang);
  root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

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
    if (t[key] !== undefined) el.setAttribute('placeholder', t[key]);
  });
  document.querySelectorAll('.lang-opt').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  const current = document.querySelector('.lang-current');
  if (current) current.textContent = lang.toUpperCase();

  const dlTitles = document.querySelectorAll('.dl-title');
  if (dlTitles[0]) dlTitles[0].textContent = t['result.saveImage'] || 'Save Image';
  if (dlTitles[1]) dlTitles[1].textContent = t['result.saved']    || 'Saved ✓';

  const tabBefore = document.getElementById('tabBefore');
  const tabAfter  = document.getElementById('tabAfter');
  const tabSlider = document.getElementById('tabSlider');
  if (tabBefore) tabBefore.textContent = t['result.before'] || 'Before';
  if (tabAfter)  tabAfter.textContent  = t['result.after']  || 'After';
  if (tabSlider) tabSlider.textContent = t['result.compare'] || 'Compare';
}

// ── LANG SWITCHER ─────────────────────────────────────────────
(function () {
  let currentLang = localStorage.getItem('lang') || 'en';
  applyLang(currentLang);

  const toggle   = document.getElementById('langToggle');
  const dropdown = document.getElementById('langDropdown');

  toggle && toggle.addEventListener('click', e => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  document.querySelectorAll('.lang-opt').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const lang = btn.getAttribute('data-lang');
      if (!lang) return;
      currentLang = lang;
      localStorage.setItem('lang', lang);
      applyLang(lang);
      dropdown && dropdown.classList.remove('open');
    });
  });

  document.addEventListener('click', () => {
    dropdown && dropdown.classList.remove('open');
  });
})();

// ── THEME TOGGLE ──────────────────────────────────────────────
(function () {
  const input = document.getElementById('input');
  const root  = document.documentElement;
  let theme   = localStorage.getItem('theme');
  if (!theme || (theme !== 'dark' && theme !== 'light')) {
    theme = 'dark';
    localStorage.setItem('theme', 'dark');
  }
  root.setAttribute('data-theme', theme);
  if (input) input.checked = (theme === 'light');
  input && input.addEventListener('change', () => {
    const next = input.checked ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

// ── NAVBAR SCROLL ─────────────────────────────────────────────
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
})();

// ── MOBILE MENU ───────────────────────────────────────────────
(function () {
  const toggle = document.getElementById('menuToggle');
  const nav    = document.getElementById('mobileNav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    });
  });
})();

// ── ACTIVE NAV LINK ON SCROLL ─────────────────────────────────
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));
})();

// ── FILE UPLOAD PREVIEW ───────────────────────────────────────
(function () {
  const input      = document.getElementById('roomimage');
  const label      = document.getElementById('uploadLabel');
  const uploadText = document.getElementById('uploadText');
  if (!input || !label) return;
  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file) return;
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    const t    = translations[lang] || translations['en'];
    if (uploadText) uploadText.textContent = t['upload.done'] || '✓ Image uploaded — ready to generate!';
    const reader = new FileReader();
    reader.onload = ev => {
      label.querySelectorAll('div').forEach(d => d.style.display = 'none');
      const oldPreview = label.querySelector('img.preview-img');
      if (oldPreview) oldPreview.remove();
      const img         = document.createElement('img');
      img.src           = ev.target.result;
      img.className     = 'preview-img';
      img.alt           = 'Room preview';
      img.style.cssText = 'width:100%;height:auto;max-height:240px;object-fit:cover;border-radius:calc(var(--radius-lg) - 2px);display:block;pointer-events:none;';
      label.style.height      = 'auto';
      label.style.minHeight   = '160px';
      label.style.padding     = '0';
      label.style.borderStyle = 'solid';
      label.style.borderColor = 'var(--color-accent)';
      const fileInput = label.querySelector('input[type="file"]');
      fileInput ? label.insertBefore(img, fileInput) : label.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
})();

// ── STYLE CARDS ───────────────────────────────────────────────
(function () {
  const grid     = document.getElementById('styleGrid');
  const textarea = document.getElementById('decorationprompt');
  const hint     = document.getElementById('promptHint');
  if (!grid || !textarea) return;
  grid.addEventListener('click', e => {
    const card = e.target.closest('.style-card');
    if (!card) return;
    grid.querySelectorAll('.style-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    const prompt = card.getAttribute('data-prompt');
    if (prompt) {
      textarea.value = prompt;
      if (hint) {
        hint.textContent   = `Style selected: ${card.textContent.trim()}`;
        hint.style.display = 'block';
      }
    }
  });
})();

// ── BEFORE / AFTER TABS ───────────────────────────────────────
(function () {
  const tabs   = document.querySelectorAll('.ba-tab');
  const panels = document.querySelectorAll('.ba-panel');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const target = document.getElementById(tab.getAttribute('aria-controls'));
      if (target) target.classList.add('active');
    });
  });
})();

// ── BEFORE / AFTER SLIDER ─────────────────────────────────────
(function () {
  function initSlider() {
    const wrap    = document.getElementById('baSliderWrap');
    const divider = document.getElementById('baDivider');
    const clip    = document.getElementById('baClip');
    if (!wrap || !divider || !clip) return;

    let dragging = false;
    const isRTL = () => document.documentElement.getAttribute('dir') === 'rtl';

    divider.style.left = '50%';
    clip.style.width   = '50%';

    function setPosition(x) {
      const rect = wrap.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.max(2, Math.min(98, pct));
      if (isRTL()) pct = 100 - pct;
      divider.style.left = pct + '%';
      clip.style.width   = pct + '%';
      divider.setAttribute('aria-valuenow', Math.round(pct));
    }

    divider.addEventListener('mousedown',  () => dragging = true);
    divider.addEventListener('touchstart', () => dragging = true, { passive: true });
    window.addEventListener('mouseup',  () => dragging = false);
    window.addEventListener('touchend', () => dragging = false);
    window.addEventListener('mousemove', e => { if (dragging) setPosition(e.clientX); });
    window.addEventListener('touchmove', e => {
      if (dragging && e.touches[0]) setPosition(e.touches[0].clientX);
    }, { passive: true });

    divider.addEventListener('keydown', e => {
      const rect = wrap.getBoundingClientRect();
      const cur  = parseFloat(divider.style.left) || 50;
      if (e.key === 'ArrowLeft')  setPosition(rect.left + (cur - 5) / 100 * rect.width);
      if (e.key === 'ArrowRight') setPosition(rect.left + (cur + 5) / 100 * rect.width);
    });
  }

  initSlider();
  document.addEventListener('click', e => {
    const tab = e.target.closest('.ba-tab');
    if (tab && tab.getAttribute('aria-controls') === 'panelSlider') setTimeout(initSlider, 50);
  });
})();

// ── GENERATE FORM ─────────────────────────────────────────────
(function () {
  const form         = document.getElementById('aiDesignForm');
  const submitBtn    = document.getElementById('submitBtn');
  const placeholder  = document.getElementById('resultPlaceholder');
  const loadingPanel = document.getElementById('loadingPanel');
  const resultArea   = document.getElementById('resultArea');
  const resultImage  = document.getElementById('resultImage');
  const beforeImage  = document.getElementById('beforeImage');
  const sliderBefore = document.getElementById('sliderBefore');
  const sliderAfter  = document.getElementById('sliderAfter');
  const loadingBar   = document.getElementById('loadingBar');
  if (!form) return;

  let downloadCheck = document.getElementById('downloadCheck');
  let _lastPrompt = '';
  let _lastImageFile = null;
  const regenBtn = document.getElementById('regenerateBtn');
  let progressTimer = null;

  function startProgress() {
    let pct = 0;
    if (loadingBar) loadingBar.style.width = '0%';
    progressTimer = setInterval(() => {
      pct += Math.random() * 4;
      if (pct > 90) pct = 90;
      if (loadingBar) loadingBar.style.width = pct + '%';
    }, 600);
  }

  function finishProgress() {
    clearInterval(progressTimer);
    if (loadingBar) {
      loadingBar.style.width = '100%';
      setTimeout(() => { if (loadingBar) loadingBar.style.width = '0%'; }, 600);
    }
  }

  function showLoading() {
    if (placeholder)  placeholder.style.display  = 'none';
    if (resultArea)   resultArea.style.display    = 'none';
    if (loadingPanel) loadingPanel.style.display  = 'block';
    if (submitBtn)    { submitBtn.classList.add('is-generating'); submitBtn.disabled = true; }
  }

  function showResult(resultUrl, beforeUrl) {
    if (loadingPanel) loadingPanel.style.display = 'none';
    if (resultArea)   resultArea.style.display   = 'block';
    if (resultImage)  resultImage.src  = resultUrl;
    if (beforeImage)  beforeImage.src  = beforeUrl;
    if (sliderBefore) sliderBefore.src = beforeUrl;
    if (sliderAfter)  sliderAfter.src  = resultUrl;

    document.querySelectorAll('.ba-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.ba-panel').forEach(p => p.classList.remove('active'));
    const tabAfter   = document.getElementById('tabAfter');
    const panelAfter = document.getElementById('panelAfter');
    if (tabAfter)   { tabAfter.classList.add('active'); tabAfter.setAttribute('aria-selected', 'true'); }
    if (panelAfter)   panelAfter.classList.add('active');

    if (submitBtn) { submitBtn.classList.remove('is-generating'); submitBtn.disabled = false; }

    downloadCheck = document.getElementById('downloadCheck');
    if (downloadCheck) {
      downloadCheck.checked = false;
      const newCheck = downloadCheck.cloneNode(true);
      downloadCheck.parentNode.replaceChild(newCheck, downloadCheck);
      downloadCheck = newCheck;
      newCheck.addEventListener('change', function () {
        if (this.checked) {
          const a    = document.createElement('a');
          a.href     = resultUrl;
          a.download = 'decogen-design.jpg';
          a.click();
        }
      });
    }

    const viewSavedBtn = document.getElementById('viewSavedBtn');
    if (viewSavedBtn) viewSavedBtn.style.display = 'inline-flex';
    if (regenBtn) regenBtn.style.display = 'inline-flex';

    // Refresh stats after a new generation
    loadStats();

    resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    applyLang(localStorage.getItem('lang') || 'en');
  }

  function showError(msg) {
    if (loadingPanel) loadingPanel.style.display = 'none';
    if (placeholder)  placeholder.style.display  = 'flex';
    if (submitBtn)    { submitBtn.classList.remove('is-generating'); submitBtn.disabled = false; }
    showToast(msg || 'Something went wrong. Please try again.', 'error');
  }

  function pollStatus(jobId, beforeUrl) {
    const interval = setInterval(async () => {
      try {
        const res  = await fetch(`/status/${jobId}`);
        const data = await res.json();
        if (data.status === 'done') {
          clearInterval(interval);
          finishProgress();
          showResult(`/result/${jobId}`, beforeUrl);
        } else if (data.status === 'error') {
          clearInterval(interval);
          finishProgress();
          showError(data.error || 'Generation failed.');
        }
      } catch (e) {
        clearInterval(interval);
        finishProgress();
        showError('Network error. Please try again.');
      }
    }, 2500);
  }


  // ── REGENERATE BUTTON ─────────────────────────────────────────
  if (regenBtn) {
    regenBtn.addEventListener('click', () => {
      if (!_lastPrompt && !_lastImageFile) return;
      // Pre-fill the prompt textarea with the last used prompt
      const promptInput = document.getElementById('decorationprompt');
      if (promptInput && _lastPrompt) {
        promptInput.value = _lastPrompt;
        const hint = document.getElementById('promptHint');
        if (hint) {
          hint.textContent = 'Edit the prompt below, then generate again.';
          hint.style.display = 'block';
        }
      }
      // Scroll up to the generate section smoothly
      const generateSection = document.getElementById('generate');
      if (generateSection) {
        generateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Focus the prompt textarea so user can start editing immediately
      setTimeout(() => { if (promptInput) promptInput.focus(); }, 600);
    });
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const imageInput  = document.getElementById('roomimage');
    const promptInput = document.getElementById('decorationprompt');
    if (!imageInput?.files[0]) {
      showToast('Please upload a room photo first.', 'error');
      return;
    }
    if (!promptInput?.value.trim()) {
      showToast('Please describe a style or select one above.', 'error');
      return;
    }
    const formData = new FormData(form);
    _lastPrompt = promptInput.value.trim();
    _lastImageFile = imageInput.files[0];
    showLoading();
    startProgress();
    try {
      const res  = await fetch('/decorate-room', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok || data.error) { showError(data.error || 'Server error.'); return; }
      pollStatus(data.job_id, `/before/${data.job_id}`);
    } catch (err) {
      showError('Could not reach server. Check your connection.');
    }
  });
})();

// ── TOAST ─────────────────────────────────────────────────────
function showToast(msg, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className   = `toast toast--${type} show`;
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ── REACTION BUTTONS ──────────────────────────────────────────
(function () {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.reaction-btn');
    if (!btn) return;
    const emoji       = btn.getAttribute('data-emoji');
    btn.classList.toggle('reacted');
    const burst       = document.createElement('span');
    burst.className   = 'emoji-burst';
    burst.textContent = emoji;
    burst.style.cssText = `position:fixed;left:${e.clientX - 12}px;top:${e.clientY - 12}px;pointer-events:none;font-size:1.5rem;z-index:9999;`;
    document.body.appendChild(burst);
    burst.addEventListener('animationend', () => burst.remove());
  });
})();

// ── REVIEWS ───────────────────────────────────────────────────
(function () {
  const grid      = document.getElementById('reviewsGrid');
  const empty     = document.getElementById('reviewsEmpty');
  const form      = document.getElementById('reviewForm');
  const nameEl    = document.getElementById('reviewName');
  const commEl    = document.getElementById('reviewComment');
  const submitBtn = document.getElementById('reviewSubmitBtn');
  const starInput = document.getElementById('starInput');
  let selectedRating = 0;

  starInput && starInput.querySelectorAll('.star-btn').forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.getAttribute('data-val'));
      starInput.querySelectorAll('.star-btn').forEach((s, i) => {
        s.classList.toggle('active', i < selectedRating);
      });
    });
    star.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') star.click();
    });
  });

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function renderReviews(reviews) {
    if (!grid) return;
    grid.querySelectorAll('.review-card').forEach(c => c.remove());
    if (!reviews.length) {
      if (empty) empty.style.display = 'block';
      return;
    }
    if (empty) empty.style.display = 'none';
    reviews.forEach(r => {
      const card     = document.createElement('div');
      card.className = 'review-card';
      const stars    = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
      const date     = r.created_at ? r.created_at.slice(0, 10) : '';
      card.innerHTML = `
        <div class="review-header">
          <span class="review-name">${escapeHtml(r.name)}</span>
          <span class="review-stars">${stars}</span>
        </div>
        <p class="review-comment">${escapeHtml(r.comment)}</p>
        <span class="review-date">${date}</span>`;
      grid.appendChild(card);
    });
  }

  async function loadReviews() {
    try {
      const res  = await fetch('/get-reviews');
      const data = await res.json();
      if (data.reviews) renderReviews(data.reviews);
    } catch (e) {
      console.warn('Could not load reviews', e);
    }
  }

  form && form.addEventListener('submit', async e => {
    e.preventDefault();
    const name    = nameEl?.value.trim();
    const comment = commEl?.value.trim();
    if (!selectedRating) { showToast('Please select a star rating.', 'error'); return; }
    if (!name)            { showToast('Please enter your name.', 'error'); return; }
    if (!comment)         { showToast('Please write a comment.', 'error'); return; }
    if (submitBtn) { submitBtn.disabled = true; submitBtn.style.opacity = '.6'; }
    try {
      const res  = await fetch('/submit-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating: selectedRating, comment })
      });
      const data = await res.json();
      if (data.success) {
        showToast('Review submitted — thank you! 🎉', 'success');
        form.reset();
        selectedRating = 0;
        starInput && starInput.querySelectorAll('.star-btn').forEach(s => s.classList.remove('active'));
        await loadReviews();
      } else {
        showToast(data.error || 'Could not submit review.', 'error');
      }
    } catch (err) {
      showToast('Network error. Please try again.', 'error');
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.style.opacity = '1'; }
    }
  });

  loadReviews();
})();

// ── VOICE INPUT ───────────────────────────────────────────────
(function () {
  const micBtn     = document.getElementById('micBtn');
  const overlay    = document.getElementById('voiceOverlay');
  const label      = document.getElementById('voiceLabel');
  const transcript = document.getElementById('voiceTranscript');
  const confirm    = document.getElementById('voiceConfirm');
  const cancel     = document.getElementById('voiceCancel');
  const textarea   = document.getElementById('decorationprompt');
  if (!micBtn || !overlay) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) { micBtn.style.display = 'none'; return; }

  const recognition          = new SpeechRecognition();
  recognition.continuous     = false;
  recognition.interimResults = true;

  function getRecognitionLang() {
    const lang = localStorage.getItem('lang') || 'en';
    if (lang === 'ar') return 'ar-MA';
    if (lang === 'fr') return 'fr-FR';
    return 'en-US';
  }

  function getVoiceLabels() {
    const lang = localStorage.getItem('lang') || 'en';
    return {
      listening: lang === 'ar' ? 'جاري الاستماع…'             : lang === 'fr' ? 'Écoute en cours…'            : 'Listening…',
      done:      lang === 'ar' ? 'تم! هل تستخدم هذا النص؟'    : lang === 'fr' ? 'Terminé ! Utiliser ce texte ?' : 'Done! Use this text?',
      nothing:   lang === 'ar' ? 'لم يُسمع شيء. حاول مجددًا.' : lang === 'fr' ? 'Rien entendu. Réessayez.'      : 'Nothing heard. Try again.',
      error:     lang === 'ar' ? 'خطأ. حاول مجددًا.'           : lang === 'fr' ? 'Erreur. Réessayez.'            : 'Error. Please try again.'
    };
  }

  let finalText = '';

  micBtn.addEventListener('click', () => {
    // Only request mic permission when user explicitly clicks the mic button
    navigator.permissions && navigator.permissions.query({ name: 'microphone' }).then(result => {
      if (result.state === 'denied') {
        showToast('Microphone access is blocked. Please allow it in your browser settings.', 'error');
        return;
      }
      startListening();
    }).catch(() => startListening()); // fallback if permissions API not supported
  });

  function startListening() {
    finalText = '';
    recognition.lang = getRecognitionLang();
    if (transcript) transcript.textContent = '';
    if (label)      label.textContent      = getVoiceLabels().listening;
    overlay.classList.add('active');
    micBtn.classList.add('listening');
    try { recognition.start(); } catch (err) { /* already started */ }
  }

  recognition.onresult = e => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const txt = e.results[i][0].transcript;
      if (e.results[i].isFinal) finalText += txt;
      else interim += txt;
    }
    if (transcript) transcript.textContent = finalText + interim;
  };

  recognition.onend = () => {
    micBtn.classList.remove('listening');
    if (label) label.textContent = finalText ? getVoiceLabels().done : getVoiceLabels().nothing;
  };

  recognition.onerror = () => {
    micBtn.classList.remove('listening');
    if (label) label.textContent = getVoiceLabels().error;
  };

  confirm && confirm.addEventListener('click', () => {
    if (textarea && finalText.trim()) textarea.value = finalText.trim();
    overlay.classList.remove('active');
    micBtn.classList.remove('listening');
  });

  cancel && cancel.addEventListener('click', () => {
    recognition.abort();
    overlay.classList.remove('active');
    micBtn.classList.remove('listening');
  });
})();

// ── STATS BAR ─────────────────────────────────────────────────
// ── STATS BAR ─────────────────────────────────────────────────
function loadStats() {
  fetch('/stats')
    .then(r => r.json())
    .then(data => {
      const sec = document.getElementById('statsSection');
      const genEl = document.getElementById('statGenerated');
      const savedEl = document.getElementById('statSaved');
      const activityEl = document.getElementById('statActivity');
      const statusEl = document.getElementById('statStatus');
      if (!sec) return;
      if (genEl) genEl.textContent = data.generated_rooms || 0;
      if (savedEl) savedEl.textContent = data.signed_in_users || 0;
      if (activityEl) activityEl.textContent = data.last_activity ? new Date(data.last_activity).toLocaleDateString() : '—';
      if (statusEl) statusEl.textContent = data.signed_in_users > 0 ? 'Live' : 'Offline';
      sec.style.display = 'block';
    })
    .catch(() => {});
}

// ── AUTH STATE ────────────────────────────────────────────────
(function () {
  fetch('/auth/me')
    .then(r => r.json())
    .then(data => {
      const heroSignInBtn = document.getElementById('heroSignInBtn');
      const authIconBtn   = document.getElementById('authIconBtn');
      const authAvatar    = document.getElementById('authAvatar');
      const authAvatarImg = document.getElementById('authAvatarImg');
      const authUserName  = document.getElementById('authUserName');
      const navDesigns    = document.getElementById('navDesigns');
      const mobileDesigns = document.getElementById('mobileDesignsLink');
      const mobileSignIn  = document.getElementById('mobileSignIn');
      const viewSavedBtn  = document.getElementById('viewSavedBtn');

      if (data.loggedin) {
        if (authIconBtn)   authIconBtn.style.display   = 'none';
        if (authAvatar)    authAvatar.style.display     = 'flex';
        if (authAvatarImg) authAvatarImg.src            = data.avatar;
        if (authUserName)  authUserName.textContent     = data.name;
        if (navDesigns)    navDesigns.style.display     = 'inline-flex';
        if (mobileDesigns) mobileDesigns.style.display  = 'block';
        if (heroSignInBtn) heroSignInBtn.style.display  = 'none';
        if (mobileSignIn)  mobileSignIn.style.display   = 'none';
        if (viewSavedBtn)  viewSavedBtn.style.display   = 'inline-flex';
      } else {
        if (authIconBtn)   authIconBtn.style.display   = 'flex';
        if (authAvatar)    authAvatar.style.display     = 'none';
        if (navDesigns)    navDesigns.style.display     = 'none';
        if (mobileDesigns) mobileDesigns.style.display  = 'none';
        if (heroSignInBtn) heroSignInBtn.style.display  = 'inline-flex';
        if (mobileSignIn)  mobileSignIn.style.display   = 'block';
        if (viewSavedBtn)  viewSavedBtn.style.display   = 'none';
      }
      loadStats();
    })
    .catch(() => {});

  const avatarImg = document.getElementById('authAvatarImg');
  const dropdown  = document.getElementById('authDropdown');

  avatarImg && avatarImg.addEventListener('click', () => {
    dropdown && dropdown.classList.toggle('open');
  });

  document.getElementById('authSignOut')?.addEventListener('click', () => {
    window.location.href = '/auth/logout';
  });

  document.addEventListener('click', e => {
    const avatar = document.getElementById('authAvatar');
    if (avatar && !avatar.contains(e.target)) dropdown && dropdown.classList.remove('open');
  });

  document.getElementById('authIconBtn')?.addEventListener('click', () => {
    window.location.href = '/auth/login';
  });
})();
