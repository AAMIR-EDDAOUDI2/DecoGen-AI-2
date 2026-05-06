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
function updateResultAspect(){
  const map={'16:9':'16/9','1:1':'1/1','9:16':'9/16'};
  const val=map[ratioSelect.value]||'16/9';
  document.querySelector('.result-image-wrap').style.aspectRatio=val;
  document.getElementById('resultPlaceholder').style.aspectRatio=val;
  document.querySelector('#loadingPanel > div:last-child').style.aspectRatio=val;
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
   FORM — GENERATE DESIGN
   ============================================ */
const form=document.getElementById('aiDesignForm');
const submitBtn=document.getElementById('submitBtn');
const placeholder=document.getElementById('resultPlaceholder');
const loadingPanel=document.getElementById('loadingPanel');
const resultArea=document.getElementById('resultArea');
const resultImage=document.getElementById('resultImage');
const downloadBtn=document.getElementById('downloadBtn');

function resetBtn(){
  submitBtn.disabled=false;
  submitBtn.classList.remove('success','error');
  submitBtn.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Generate Design';
}

async function pollJob(jobId){
  const maxWait=120000;
  const interval=3000;
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
  const file=document.getElementById('room_image').files[0];
  if(!file){showToast('Please upload a room photo first.',true);return;}

  // 👇 FILE SIZE WARNING — only new line added
  if(file.size > 5 * 1024 * 1024) showToast('Large image detected — resizing for best results…');

  const prompt=promptTA.value.trim();
  if(!prompt){showToast('Please select or describe a style.',true);return;}

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
    const url=URL.createObjectURL(blob);

    resultImage.src=url;
    downloadBtn.href=url;
    loadingPanel.style.display='none';
    resultArea.style.display='block';
    submitBtn.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Generation Complete';
    submitBtn.classList.add('success');
    showToast('Your room has been transformed!');

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
   KEEP ANIMATIONS ALIVE (prevents browser throttling)
   ============================================ */
(function keepAnimationsAlive(){
  let id;
  function tick(){
    id = requestAnimationFrame(tick);
  }
  tick();
  document.addEventListener('visibilitychange', () => {
    if(document.hidden){ cancelAnimationFrame(id); }
    else { tick(); }
  });
})();
