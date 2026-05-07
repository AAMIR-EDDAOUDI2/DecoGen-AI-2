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
  const sy=window.scrollY+80;
  document.querySelectorAll('section[id]').forEach(s=>{
    if(s.offsetTop<=sy&&s.offsetTop+s.offsetHeight>sy){
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
const pills=document.querySelectorAll('.style-pill');
const promptTA=document.getElementById('decoration_prompt');
pills.forEach(pill=>pill.addEventListener('click',()=>{
  pills.forEach(p=>p.classList.remove('selected'));
  pill.classList.add('selected');
  promptTA.value=pill.dataset.prompt;
}));

/* ============================================
   ASPECT RATIO
   ============================================ */
const ratioSelect=document.getElementById('aspect_ratio');
const RATIO_MAP={'16:9':'16/9','1:1':'1/1','9:16':'9/16'};
function getAspect(){return RATIO_MAP[ratioSelect.value]||'16/9';}
ratioSelect.addEventListener('change',()=>{
  const r=getAspect();
  document.getElementById('resultPlaceholder').style.aspectRatio=r;
  const lc=document.querySelector('#loadingPanel .loader-container');
  if(lc)lc.style.aspectRatio=r;
  document.querySelectorAll('.ba-img,.ba-slider-wrap,.result-image-wrap img').forEach(el=>el.style.aspectRatio=r);
});

/* ============================================
   TABS  (tabs already exist in HTML, just wire them up)
   ============================================ */
function switchTab(tabId){
  // tabs
  document.querySelectorAll('.ba-tab').forEach(t=>{
    const active=t.id===tabId;
    t.classList.toggle('active',active);
    t.setAttribute('aria-selected',active);
  });
  // panels
  const panelMap={tabBefore:'panelBefore',tabAfter:'panelAfter',tabSlider:'panelSlider'};
  Object.entries(panelMap).forEach(([tid,pid])=>{
    const panel=document.getElementById(pid);
    if(!panel)return;
    if(tid===tabId){
      panel.classList.add('active');
      panel.removeAttribute('hidden');
    }else{
      panel.classList.remove('active');
      panel.setAttribute('hidden','');
    }
  });
  if(tabId==='tabSlider')initSlider();
}

document.getElementById('tabBefore').addEventListener('click',()=>switchTab('tabBefore'));
document.getElementById('tabAfter').addEventListener('click',()=>switchTab('tabAfter'));
document.getElementById('tabSlider').addEventListener('click',()=>switchTab('tabSlider'));

/* ============================================
   COMPARE SLIDER
   ============================================ */
function initSlider(){
  const wrap=document.getElementById('baSliderWrap');
  const clip=document.getElementById('baClip');
  const divider=document.getElementById('baDivider');
  if(!wrap||!clip||!divider||divider._init)return;
  divider._init=true;
  let dragging=false;

  function setPos(pct){
    pct=Math.max(0,Math.min(100,pct));
    clip.style.width=pct+'%';
    divider.style.left=pct+'%';
  }
  function getPct(clientX){
    const r=wrap.getBoundingClientRect();
    return((clientX-r.left)/r.width)*100;
  }

  wrap.addEventListener('mousedown',e=>{dragging=true;setPos(getPct(e.clientX));e.preventDefault();});
  wrap.addEventListener('touchstart',e=>{dragging=true;setPos(getPct(e.touches[0].clientX));},{passive:true});
  window.addEventListener('mousemove',e=>{if(dragging)setPos(getPct(e.clientX));});
  window.addEventListener('touchmove',e=>{if(dragging)setPos(getPct(e.touches[0].clientX));},{passive:true});
  window.addEventListener('mouseup',()=>dragging=false);
  window.addEventListener('touchend',()=>dragging=false);
  setPos(50);
}

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
   SHOW RESULTS  — sets src on existing <img> tags
   ============================================ */
function showResult(afterURL,beforeURL){
  // Set image sources on the existing HTML elements
  const resultImg=document.getElementById('resultImage');
  const beforeImg=document.getElementById('beforeImage');
  const sliderAfter=document.getElementById('sliderAfter');
  const sliderBefore=document.getElementById('sliderBefore');

  if(resultImg) resultImg.src=afterURL;
  if(sliderAfter) sliderAfter.src=afterURL;
  if(beforeURL){
    if(beforeImg) beforeImg.src=beforeURL;
    if(sliderBefore) sliderBefore.src=beforeURL;
  }

  // Show the result area, hide placeholder
  document.getElementById('resultPlaceholder').style.display='none';
  document.getElementById('loadingPanel').style.display='none';
  document.getElementById('resultArea').style.display='block';

  // Default to After tab
  switchTab('tabAfter');
}

/* ============================================
   FORM SUBMIT
   ============================================ */
const form=document.getElementById('aiDesignForm');
const submitBtn=document.getElementById('submitBtn');

function resetBtn(){
  submitBtn.disabled=false;
  submitBtn.classList.remove('success','error');
  submitBtn.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Generate Design';
}

let _beforeURL=null;

form.addEventListener('submit',async(e)=>{
  e.preventDefault();
  const fileInput=document.getElementById('room_image');
  const file=fileInput.files[0];
  if(!file){showToast('Please upload a room photo first.',true);return;}

  const prompt=promptTA.value.trim();
  if(!prompt){showToast('Please select or describe a style.',true);return;}

  // Capture before URL
  if(_beforeURL)URL.revokeObjectURL(_beforeURL);
  _beforeURL=URL.createObjectURL(file);

  submitBtn.disabled=true;
  submitBtn.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> Generating…';

  document.getElementById('resultPlaceholder').style.display='none';
  document.getElementById('resultArea').style.display='none';
  document.getElementById('loadingPanel').style.display='block';

  const bar=document.getElementById('loadingBar');
  if(bar){bar.style.animation='none';bar.offsetHeight;bar.style.animation='';}

  try{
    const res=await fetch('/decorate-room',{method:'POST',body:new FormData(form)});
    if(!res.ok){
      let err='Failed to start generation';
      try{const d=await res.json();err=d.error||err;}catch(_){}
      throw new Error(err);
    }
    const {job_id}=await res.json();

    // Poll status
    await new Promise((resolve,reject)=>{
      let elapsed=0;
      const timer=setInterval(async()=>{
        elapsed+=3000;
        try{
          const sr=await fetch('/status/'+job_id);
          const sd=await sr.json();
          if(sd.status==='done'){clearInterval(timer);resolve();}
          else if(sd.status==='error'){clearInterval(timer);reject(new Error(sd.error||'Generation failed'));}
          else if(elapsed>=120000){clearInterval(timer);reject(new Error('Timed out'));}
        }catch(err){clearInterval(timer);reject(err);}
      },3000);
    });

    // Get result image
    const imgRes=await fetch('/result/'+job_id);
    if(!imgRes.ok)throw new Error('Failed to retrieve result image');
    const blob=await imgRes.blob();
    const afterURL=URL.createObjectURL(blob);

    showResult(afterURL,_beforeURL);

    submitBtn.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Done!';
    submitBtn.classList.add('success');
    showToast('Your room has been transformed!');

    // Download button
    const downloadCheck=document.getElementById('downloadCheck');
    if(downloadCheck){
      downloadCheck.checked=false;
      downloadCheck.addEventListener('change',function(){
        if(this.checked){
          const a=document.createElement('a');
          a.href=afterURL;
          a.download='decogen-room.jpg';
          a.click();
        }
      },{once:true});
    }

  }catch(err){
    document.getElementById('loadingPanel').style.display='none';
    document.getElementById('resultPlaceholder').style.display='flex';
    submitBtn.classList.add('error');
    submitBtn.innerHTML='Try Again';
    showToast('Error: '+err.message,true);
  }finally{
    setTimeout(resetBtn,5000);
  }
});
