/* ============================================
   THEME TOGGLE
   ============================================ */
(function(){
  const html=document.documentElement,btn=document.querySelector('[data-theme-toggle]');
  let d=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
  html.setAttribute('data-theme',d);
  const moonSVG='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  const sunSVG='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  if(btn){
    btn.innerHTML=d==='dark'?sunSVG:moonSVG;
    btn.addEventListener('click',()=>{
      d=d==='dark'?'light':'dark';
      html.setAttribute('data-theme',d);
      btn.innerHTML=d==='dark'?sunSVG:moonSVG;
      btn.setAttribute('aria-label','Switch to '+(d==='dark'?'light':'dark')+' mode');
    });
  }
})();

/* ============================================
   NAVBAR SCROLL
   ============================================ */
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>navbar.classList.toggle('scrolled',scrollY>20),{passive:true});

/* ============================================
   SCROLL SPY
   ============================================ */
const navLinks=document.querySelectorAll('.nav-link');
window.addEventListener('scroll',()=>{
  const scrollY=window.scrollY+80;
  document.querySelectorAll('section[id]').forEach(s=>{
    if(s.offsetTop<=scrollY && s.offsetTop+s.offsetHeight>scrollY){
      navLinks.forEach(l=>l.classList.remove('active'));
      const a=document.querySelector(`.nav-link[href="#${s.id}"]`);
      if(a)a.classList.add('active');
    }
  });
},{passive:true});

/* ============================================
   MOBILE MENU
   ============================================ */
const menuToggle=document.getElementById('menuToggle'),mobileNav=document.getElementById('mobileNav');
menuToggle.addEventListener('click',()=>{
  const open=mobileNav.classList.toggle('open');
  menuToggle.classList.toggle('open',open);
  menuToggle.setAttribute('aria-expanded',open);
});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  mobileNav.classList.remove('open');
  menuToggle.classList.remove('open');
  menuToggle.setAttribute('aria-expanded','false');
}));

/* ============================================
   STYLE PILLS
   ============================================ */
const pills=document.querySelectorAll('.style-pill'),promptTA=document.getElementById('decoration_prompt');
pills.forEach(pill=>pill.addEventListener('click',()=>{
  pills.forEach(p=>p.classList.remove('selected'));
  pill.classList.add('selected');
  promptTA.value=pill.dataset.prompt;
}));

/* ============================================
   ASPECT RATIO SYNC
   ============================================ */
const ratioSelect=document.getElementById('aspect_ratio');
let currentRatio='16/9';
function updateResultAspect(){
  const map={'16:9':'16/9','1:1':'1/1','9:16':'9/16'};
  currentRatio=map[ratioSelect.value]||'16/9';
  document.getElementById('resultPlaceholder').style.aspectRatio=currentRatio;
  const loaderBox=document.querySelector('#loadingPanel .loader-container');
  if(loaderBox) loaderBox.style.aspectRatio=currentRatio;
  // update live panels if already rendered
  document.querySelectorAll('.ba-img,.ba-slider-wrap').forEach(el=>el.style.aspectRatio=currentRatio);
}
ratioSelect.addEventListener('change',updateResultAspect);
updateResultAspect();

/* ============================================
   TOAST
   ============================================ */
function showToast(msg,isError=false){
  const t=document.getElementById('toast');
  t.textContent=msg;
  t.classList.toggle('toast-error',isError);
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),4500);
}

/* ============================================
   BEFORE / AFTER — render result UI
   ============================================ */
let _beforeURL=null;

function showBeforeAfter(afterURL){
  const resultArea=document.getElementById('resultArea');
  const wrap=document.querySelector('.result-image-wrap');

  wrap.innerHTML=`
    <div class="ba-tabs" role="tablist" aria-label="View mode">
      <button class="ba-tab active" role="tab" aria-selected="true"  data-panel="after"   id="tab-after">After</button>
      <button class="ba-tab"        role="tab" aria-selected="false" data-panel="before"  id="tab-before">Before</button>
      <button class="ba-tab"        role="tab" aria-selected="false" data-panel="compare" id="tab-compare">Compare</button>
    </div>

    <div class="ba-panel active" id="panel-after" role="tabpanel">
      <span class="ba-badge ba-badge--after">After</span>
      <img class="ba-img" src="${afterURL}" alt="AI-generated room design" style="aspect-ratio:${currentRatio}">
    </div>

    <div class="ba-panel" id="panel-before" role="tabpanel">
      <span class="ba-badge">Before</span>
      ${_beforeURL
        ? `<img class="ba-img" src="${_beforeURL}" alt="Original room" style="aspect-ratio:${currentRatio}">`
        : `<div class="ba-img" style="aspect-ratio:${currentRatio};display:flex;align-items:center;justify-content:center;background:var(--color-surface-offset);color:var(--color-text-faint);font-size:var(--text-sm)">No original photo</div>`
      }
    </div>

    <div class="ba-panel" id="panel-compare" role="tabpanel">
      <div class="ba-slider-wrap" id="baSlider" style="aspect-ratio:${currentRatio}">
        <img class="ba-slider-after" src="${afterURL}" alt="After" draggable="false">
        <div class="ba-slider-before-clip" id="baClip">
          ${_beforeURL ? `<img class="ba-slider-before" src="${_beforeURL}" alt="Before" draggable="false">` : ''}
        </div>
        <div class="ba-divider" id="baDivider" role="slider" tabindex="0"
             aria-label="Drag to compare" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
          <div class="ba-handle">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M8 9l-4 3 4 3M16 9l4 3-4 3"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  `;

  resultArea.style.display='block';

  // Tab switching
  wrap.querySelectorAll('.ba-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      wrap.querySelectorAll('.ba-tab').forEach(t=>{t.classList.remove('active');t.setAttribute('aria-selected','false');});
      wrap.querySelectorAll('.ba-panel').forEach(p=>p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      document.getElementById('panel-'+tab.dataset.panel).classList.add('active');
      if(tab.dataset.panel==='compare') initSlider();
    });
  });
}

/* ============================================
   DRAG SLIDER
   ============================================ */
function initSlider(){
  const sliderWrap=document.getElementById('baSlider');
  const clip=document.getElementById('baClip');
  const divider=document.getElementById('baDivider');
  if(!sliderWrap||!clip||!divider||divider._init) return;
  divider._init=true;

  let dragging=false;

  function setPos(pct){
    pct=Math.max(0,Math.min(100,pct));
    clip.style.width=pct+'%';
    divider.style.left=pct+'%';
    divider.setAttribute('aria-valuenow',Math.round(pct));
  }
  function getPct(clientX){
    const r=sliderWrap.getBoundingClientRect();
    return ((clientX-r.left)/r.width)*100;
  }

  sliderWrap.addEventListener('mousedown',e=>{dragging=true;setPos(getPct(e.clientX));e.preventDefault();});
  sliderWrap.addEventListener('touchstart',e=>{dragging=true;setPos(getPct(e.touches[0].clientX));},{passive:true});
  window.addEventListener('mousemove',e=>{if(dragging)setPos(getPct(e.clientX));});
  window.addEventListener('touchmove',e=>{if(dragging)setPos(getPct(e.touches[0].clientX));},{passive:true});
  window.addEventListener('mouseup',()=>dragging=false);
  window.addEventListener('touchend',()=>dragging=false);
  divider.addEventListener('keydown',e=>{
    const v=+divider.getAttribute('aria-valuenow');
    if(e.key==='ArrowLeft'){setPos(v-2);e.preventDefault();}
    if(e.key==='ArrowRight'){setPos(v+2);e.preventDefault();}
  });

  setPos(50);
}

/* ============================================
   FORM — GENERATE DESIGN
   ============================================ */
const form=document.getElementById('aiDesignForm');
const submitBtn=document.getElementById('submitBtn');
const placeholder=document.getElementById('resultPlaceholder');
const loadingPanel=document.getElementById('loadingPanel');
const resultArea=document.getElementById('resultArea');

function resetBtn(){
  submitBtn.disabled=false;
  submitBtn.classList.remove('success','error');
  submitBtn.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Generate Design';
}

async function pollJob(jobId){
  const maxWait=120000,interval=3000;
  let elapsed=0;
  return new Promise((resolve,reject)=>{
    const timer=setInterval(async()=>{
      elapsed+=interval;
      try{
        const res=await fetch('/status/'+jobId);
        const data=await res.json();
        if(data.status==='done'){clearInterval(timer);resolve(jobId);}
        else if(data.status==='error'){clearInterval(timer);reject(new Error(data.error||'Generation failed'));}
        else if(elapsed>=maxWait){clearInterval(timer);reject(new Error('Timed out waiting for result'));}
      }catch(e){clearInterval(timer);reject(e);}
    },interval);
  });
}

form.addEventListener('submit',async(e)=>{
  e.preventDefault();
  const fileInput=document.getElementById('room_image');
  const file=fileInput.files[0];
  if(!file){showToast('Please upload a room photo first.',true);return;}
  if(file.size>5*1024*1024) showToast('Large image detected — resizing for best results…');

  const prompt=promptTA.value.trim();
  if(!prompt){showToast('Please select or describe a style.',true);return;}

  // Capture before URL
  if(_beforeURL) URL.revokeObjectURL(_beforeURL);
  _beforeURL=URL.createObjectURL(file);

  submitBtn.disabled=true;
  submitBtn.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> Generating…';
  placeholder.style.display='none';
  resultArea.style.display='none';
  loadingPanel.style.display='block';
  const bar=document.getElementById('loadingBar');
  bar.style.animation='none';bar.offsetHeight;bar.style.animation='';

  const formData=new FormData(form);
  try{
    const res=await fetch('/decorate-room',{method:'POST',body:formData});
    if(!res.ok){
      let err='Failed to start generation';
      try{const d=await res.json();err=d.error||err;}catch(_){}
      throw new Error(err);
    }
    const {job_id}=await res.json();
    await pollJob(job_id);

    const imgRes=await fetch('/result/'+job_id);
    if(!imgRes.ok) throw new Error('Failed to retrieve result image');
    const blob=await imgRes.blob();
    const afterURL=URL.createObjectURL(blob);

    loadingPanel.style.display='none';
    showBeforeAfter(afterURL);

    submitBtn.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Generation Complete';
    submitBtn.classList.add('success');
    showToast('Your room has been transformed!');

    // Download button
    const downloadCheck=document.getElementById('downloadCheck');
    downloadCheck.checked=false;
    downloadCheck.onchange=null;
    downloadCheck.addEventListener('change',function handler(){
      if(this.checked){
        const a=document.createElement('a');
        a.href=afterURL;
        a.download='decogen-room.jpg';
        a.click();
      }
      downloadCheck.removeEventListener('change',handler);
    },{once:true});

  }catch(err){
    loadingPanel.style.display='none';
    placeholder.style.display='flex';
    submitBtn.classList.add('error');
    submitBtn.innerHTML='Try Again';
    showToast('Error: '+err.message,true);
  }finally{
    setTimeout(resetBtn,5000);
  }
});

/* ============================================
   KEEP ANIMATIONS ALIVE
   ============================================ */
(function keepAnimationsAlive(){
  let id;
  function tick(){id=requestAnimationFrame(tick);}
  tick();
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden)cancelAnimationFrame(id);
    else tick();
  });
})();
