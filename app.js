(function(){
'use strict';
var $=function(s){return document.querySelector(s)};
var view=$('#view'),hud=$('#hud');
var FORMULA='Act as an educational web tool maker.\nBuild a tool for my [grade + subject] students.\n[Describe what students click/see and what the tool does.]\nKeep everything inside one single file that ends in .html.\nDo not use outside websites, image links, or sound downloads.\nKeep student information 100% private on my computer.';

function toast(m){var t=$('#toast');t.textContent=m||'Copied ✓';t.classList.add('on');setTimeout(function(){t.classList.remove('on')},1600)}
function copy(txt){
  var ok=function(){toast('✓ Copied to clipboard')};
  if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(txt).then(ok,fb)}else fb();
  function fb(){var a=document.createElement('textarea');a.value=txt;document.body.appendChild(a);a.select();try{document.execCommand('copy');ok()}catch(e){toast('Press Ctrl+C to copy')}a.remove()}
}

/* ---------- Cave of Wonders: treasure data ----------
   PROMPT and LESSON actions are switched off site-wide until the
   per-app prompt/lesson files exist. Flip these two booleans when ready. */
var PROMPTS_READY=false, LESSONS_READY=false;
var TREASURES=[
{name:'EduSpin Wheel Picker',short:'Random name & pairing wheel',
 desc:'A colorful spinning wheel for random student calls, or two wheels side by side for compare-and-contrast pairing. Names can be removed after picking, and the roster never leaves your computer.',
 file:'Example_1/WheelPicker.html'},
{name:'FeedbackFlow',short:'Click-to-build grading feedback',
 desc:'A point-and-click rubric tool that turns clicks into a warm feedback paragraph, with an optional score summary. This launches Version 2; Version 1 is FeedbackFlow_1.html.',
 file:'Example_2/FeedbackFlow_2.html'},
{name:'Elastic Timeline',short:'Drag-to-order chronology game',
 desc:'Floating cards drag onto a timeline bar and glow green or yellow to show correct and misplaced events, with confetti on a full solve.',
 file:'Example_3/Elastic_Timeline.html'},
{name:'Vocabulary Codenames',short:'Team vocabulary review game',
 desc:'A Codenames-style 4x4 word grid for Red vs. Blue vocabulary review, with one-click secret-key copying for remote team leaders.',
 file:'Example_4/CodeNames.html'},
{name:'Rotate & Relate',short:'Similar-triangles geometry sandbox',
 desc:'A geometry manipulative where students connect matching triangle sides with colored cords, then watch the triangles lift, flip, and rotate into place.',
 file:'Example_5/Elements_On_Screen.html'},
{name:'Transversal Angles',short:'New build — placeholder text',
 desc:'PLACEHOLDER: guessed only from file names (transversal_angles.html and a PRD) as a draggable practice tool for angles formed by a transversal line. Replace this once the README is written.',
 file:'Example 6/transversal_angles.html'},
{name:'Example 7 (untitled game)',short:'New build — placeholder text',
 desc:'PLACEHOLDER: file names (turret and enemy sound effects, win and pause music) suggest a turret-defense style review game. Replace this once the README is written.',
 file:'Example 7/index.html'},
{name:'Hypothesis Testing Tool',short:'New build — placeholder text',
 desc:'PLACEHOLDER: this folder has several builds of the same tool (React, Tailwind, and plain Vanilla). This treasure launches the Vanilla version since it runs with no build step — edit the file path below if you would rather launch a different variant.',
 file:'Example 8/Vanilla/index.html'},
{name:'Example 9',short:'New build — placeholder text',
 desc:'PLACEHOLDER: only an index.html exists so far, with no README yet. Replace this once you have written it up.',
 file:'Example 9/index.html'}
];
var GEMDEFS='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="gemg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fef9c3"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#7c3aed"/></linearGradient><symbol id="gem" viewBox="0 0 40 44"><polygon points="20,2 36,14 30,42 10,42 4,14" fill="url(#gemg)" stroke="#fff" stroke-opacity=".55" stroke-width="1.2"/><polygon points="20,2 36,14 20,20" fill="#fff" fill-opacity=".35"/><polygon points="4,14 20,20 10,42" fill="#000" fill-opacity=".18"/></symbol></defs></svg>';
function caveHTML(){
  return GEMDEFS+'<div class="cave-stage">'+TREASURES.map(function(t,i){
    return '<button class="gem" data-i="'+i+'" style="--hue:'+(i*40)+'deg;--dur:'+(4.5+i%3*.7)+'s;--delay:'+(i*.3)+'s" aria-label="'+t.name+': '+t.short+'"><svg class="gemi" viewBox="0 0 40 44"><use href="#gem"></use></svg><span class="gname">'+t.name+'</span></button>';
  }).join('')+'</div><div id="gemCaption" aria-live="polite">Hover or focus a treasure to hear its secret&hellip;</div>';
}
function setCap(t){var c=$('#gemCaption');if(c)c.innerHTML='<b>'+t.name+'</b> &mdash; '+t.short}
function resetCap(){var c=$('#gemCaption');if(c)c.textContent='Hover or focus a treasure to hear its secret\u2026'}
function lockBtn(label,why){return '<button class="btn" disabled title="'+why+'">&#128274; '+label+'</button>'}
function openModal(i){
  var t=TREASURES[i],m=$('#modal');
  var promptBtn=PROMPTS_READY?'<button class="btn" data-copytxt="'+encodeURIComponent(t.prompt||'')+'">&#128203; View &amp; Copy Prompt</button>':lockBtn('View &amp; Copy Prompt','Coming soon — the prompt file has not been added yet');
  var lessonBtn=LESSONS_READY?'<button class="btn alt" data-lesson="'+i+'">&#128161; Genie\u2019s Lesson</button>':lockBtn('Genie\u2019s Lesson','Coming soon');
  m.innerHTML='<div class="mback" data-close="1"></div><div class="mdlg" role="dialog" aria-modal="true" aria-labelledby="mtitle"><div class="mtop"><button class="btn alt" data-close="1">&larr; Back to the Cave</button></div><h3 id="mtitle">'+t.name+'</h3><p>'+t.desc+'</p><div class="mrow">'+promptBtn+'<a class="btn" href="'+encodeURI(t.file)+'" target="_blank" rel="noopener">&#128640; Launch Demo App</a>'+lessonBtn+'</div></div>';
  m.classList.add('open');document.body.style.overflow='hidden';
  var back=m.querySelector('.mdlg > *');if(back)back.focus&&back.focus();
}
function closeModal(){var m=$('#modal');if(!m.classList.contains('open'))return;m.classList.remove('open');m.innerHTML='';document.body.style.overflow=''}

/* ---------- Slides ---------- */
var SLIDES=[
{t:'The Wish and the Lamp',h:function(){return '<div class="hero"><h1>The Classroom Genie: Building Custom Tools Without Code</h1><p>Pearson Virtual Schools Staff Conference. Presenter: Caleob King.</p><div class="card glow" style="max-width:52rem;margin:1.2rem auto"><p>AI is a <b>powerful but overly literal Genie</b>. It can build any educational manipulative you imagine, but it takes every word literally, so you must state your wish clearly.</p></div><p style="color:var(--gold)">Press Space or the right arrow to begin.</p></div>'}},
{t:'The Three Curses of Ready-Made EdTech',h:function(){return '<h2>The Three Curses of Ready-Made EdTech</h2><div class="grid g3"><div class="card"><h3>The Login Nightmare</h3><p>Lost passwords, account limits, student privacy risks.</p></div><div class="card"><h3>The Cookie-Cutter Trap</h3><p>Generic tools never fit your exact lesson or state standard.</p></div><div class="card"><h3>The Paywall &amp; Firewall</h3><p>Subscriptions expire and school security blocks outside sites.</p></div></div><div class="banner"><b>The Genie\'s Secret:</b> your web browser is already a free, offline projector. Works from your desktop with zero logins, zero accounts, and 100% privacy.</div>'}},
{t:'Meeting the Genie',h:function(){return '<h2>Meeting the Genie</h2><p>The Genie does not read minds. It executes your exact words.</p><div class="grid g3">'+[['1. Keep it in one house','Everything inside a single standalone .html file.'],['2. No phantom files','Browser-made sounds and code-drawn shapes instead of downloads.'],['3. Protect student privacy','Everything stays in your browser. Nothing goes to outside servers.']].map(function(r){return '<div class="card glow" tabindex="0"><h3>'+r[0]+'</h3><p>'+r[1]+'</p></div>'}).join('')+'</div>'}},
{t:'The Cave of Wonders',h:function(){return '<h2>The Cave of Wonders</h2><p style="color:var(--mute);margin-top:-.4rem">Nine builds are hidden here. Hover or focus a gem to hear its secret. Click to open it.</p><div class="cave-wrap static">'+caveHTML()+'</div>'}},
{t:'The Golden Prompt Formula',h:function(){return '<h2>The Teacher\'s Golden Prompt Formula</h2><div class="grid g2"><div class="card"><span class="pill role">Role</span> <b>Who the Genie is</b><p>"Act as an educational web tool maker."</p></div><div class="card"><span class="pill aud">Audience</span> <b>Who it is for</b><p>"Build a tool for my 6th-grade Earth Science students."</p></div><div class="card"><span class="pill task">Function</span> <b>What it does</b><p>"Students click steps of the water cycle to see an animation."</p></div><div class="card"><span class="pill guard">Guardrails</span> <b>Safety &amp; portability</b><ul><li>Single standalone .html file.</li><li>No external image, font, or audio downloads.</li><li>100% student data privacy offline.</li></ul></div></div><p><button class="btn" data-copy="formula">Copy formula template</button></p>'}},
{t:'Step-by-Step Guide',h:function(){return '<h2>Step-by-Step Hands-On Guide</h2><div class="grid g2">'+[['Copy the code','Click "Copy code" in your AI chat. Never drag-highlight hundreds of lines.'],['Open your starter file','Open the pre-made tool.html in Notepad or TextEdit.'],['Paste and save','Ctrl+S on Windows, Cmd+S on Mac.'],['Double-click to run','It opens in Chrome, Edge, or Safari, offline.']].map(function(s,i){return '<div class="card"><h3>Step '+(i+1)+': '+s[0]+'</h3><p>'+s[1]+'</p></div>'}).join('')+'</div>'}},
{t:'Tinker Time',h:function(){return '<h2>Tinker Time</h2><div class="grid g2"><div class="static"><div class="led" id="led" role="timer">10:00</div><p style="text-align:center"><button class="btn alt" data-t="420">7 Min</button> <button class="btn alt" data-t="600">10 Min</button> <button class="btn" id="tgo">Play</button> <button class="btn alt" id="trs">Reset</button></p><p style="text-align:center"><button class="btn alt" id="dopen">View Prompting DO\'s &amp; DON\'Ts</button></p></div><div><div class="card"><h3>Emergency Troubleshooting</h3><p>Genie stopped typing? Type: <i>"Please keep going from where you stopped."</i></p><p>Use the "Copy code" button; you do not need to understand the code. Just test the buttons.</p></div><div class="card" style="margin-top:1rem"><h3>Debrief (last 3 to 5 minutes)</h3><ul><li>What did you ask the Genie to make?</li><li>Any surprises or misinterpretations?</li><li>How does it feel to build a tool in under 10 minutes?</li></ul></div></div></div><aside class="drawer" id="drawer" aria-label="Prompting tips"><button class="btn alt" id="dclose">Close</button><h3>DO</h3><ul class="do"><li>Be specific about screen size and buttons.</li><li>Ask for built-in sound effects from the computer\'s sound card.</li></ul><h3>DON\'T</h3><ul class="dont"><li>Say "make it pretty" without naming colors.</li><li>Panic if the Genie stops mid-code. Prompt: "Please continue from where you stopped."</li></ul></aside>'},init:timerInit},
{t:'Go Forth and Make Wishes!',h:function(){return '<h2>Go Forth and Make Wishes!</h2><div class="grid g3"><div class="card glow"><h3>Blank tool.html</h3><p>A clean HTML5 starter for your first paste.</p><button class="btn" data-dl="1">Download tool.html</button></div><div class="card"><h3>Master Prompt Bank</h3>'+PB()+'</div><div class="card"><h3>Presenter</h3><p>Caleob King<br>Pearson Virtual Schools Staff Conference</p><div style="border:2px dashed var(--mute);border-radius:12px;padding:1.5rem;text-align:center;color:var(--mute)">QR code placeholder<br>(session downloads link)</div></div></div>'}}
];
function PB(){
  var P={Math:'Build a fraction-comparison game for my 4th graders: two fraction bars, students click which is larger, with a score.',ELA:'Build a sentence-unscramble tool for my 7th graders: shuffled words, drag to order, Check button.',Science:'Build a water cycle explorer for 6th-grade Earth Science: click each stage to see an animation.','Social Studies':'Build a map-labeling quiz for my 8th graders using shapes drawn in code, no images.'};
  var G=' Keep everything in one single .html file, no outside links or downloads, keep student data private on my computer.';
  return Object.keys(P).map(function(k){return '<details><summary>'+k+'</summary><pre>Act as an educational web tool maker. '+P[k]+G+'</pre><button class="btn alt" data-copytxt="'+encodeURIComponent('Act as an educational web tool maker. '+P[k]+G)+'">Copy</button></details>'}).join('')}

/* ---------- Timer ---------- */
var tm={left:600,run:0,id:null};
function fmt(s){return ('0'+Math.floor(s/60)).slice(-2)+':'+('0'+s%60).slice(-2)}
function chime(){try{var c=new (window.AudioContext||window.webkitAudioContext)();[523.25,659.25,783.99,1046.5].forEach(function(f,i){var o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=f;o.connect(g);g.connect(c.destination);var t=c.currentTime+i*.18;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.25,t+.03);g.gain.exponentialRampToValueAtTime(.001,t+1.6);o.start(t);o.stop(t+1.7)})}catch(e){}}
function timerInit(){
  var led=$('#led'),go=$('#tgo');
  function draw(){led.textContent=fmt(tm.left)}
  function stop(){clearInterval(tm.id);tm.run=0;go.textContent='Play'}
  function setT(s){stop();tm.left=s;tm.base=s;draw()}
  tm.base=tm.base||600;draw();
  document.querySelectorAll('[data-t]').forEach(function(b){b.onclick=function(){setT(+b.dataset.t)}});
  $('#trs').onclick=function(){setT(tm.base)};
  go.onclick=function(){
    if(tm.run){stop();return}
    if(tm.left<=0)tm.left=tm.base;
    tm.run=1;go.textContent='Pause';
    tm.id=setInterval(function(){tm.left--;draw();if(tm.left<=0){stop();chime();toast('Time is up!')}},1000)};
  $('#dopen').onclick=function(){$('#drawer').classList.add('open')};
  $('#dclose').onclick=function(){$('#drawer').classList.remove('open')};
}

/* ---------- Views ---------- */
function slideView(n,full){
  var s=SLIDES[n-1];hud.classList.remove('hide');
  view.innerHTML='<section aria-label="Slide '+n+'">'+s.h()+'</section>';
  arm(view.firstChild,full);
  if(s.init)s.init();
  hud.innerHTML='<button data-nav="-1" aria-label="Previous">&#8249;</button>'+SLIDES.map(function(x,i){return '<button class="dot'+(i+1===n?' on':'')+'" title="'+(i+1)+'. '+x.t+'" aria-label="Slide '+(i+1)+': '+x.t+'" data-go="'+(i+1)+'"></button>'}).join('')+'<button data-nav="1" aria-label="Next">&#8250;</button><span>Slide '+n+' of '+SLIDES.length+'</span><span id="cnt"></span><a href="#slide-4">Cave of Wonders</a>';
  hudCount();document.title=s.t+' | The Classroom Genie';
}

/* ---------- Reveal engine: one talking point per click ---------- */
var st={u:[],i:0},full=false,busy=false,first=true;
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function arm(sec,all){
  st.u=[].filter.call(sec.querySelectorAll('.card,.banner,li,:scope>p,.card>p,.hero>p'),function(e){
    if(e.closest('.static,.drawer'))return false;
    if(e.matches('.hero>p:first-of-type'))return false;
    if(e.matches('.card')&&e.querySelector('li'))return false;
    if(e.matches('.card>p')&&!e.parentNode.querySelector('li'))return false;
    return true});
  st.i=all?st.u.length:0;
  st.u.forEach(function(e,k){e.classList.add('rv');e.style.setProperty('--dx',(k%2?'':'-')+'120px');if(all)e.classList.add('in','nt')});
  setTimeout(function(){st.u.forEach(function(e){e.classList.remove('nt')})},60);
}
function hudCount(){var c=$('#cnt');if(c)c.textContent=st.u.length?'· '+st.i+'/'+st.u.length:''}
function step(d){
  if(busy||$('#modal').classList.contains('open'))return;
  if(d>0){if(st.i<st.u.length){st.u[st.i++].classList.add('in');hudCount()}else if(cur<SLIDES.length)go(cur+1)}
  else{if(st.i>0){st.u[--st.i].classList.remove('in');hudCount()}else if(cur>1){full=true;go(cur-1)}}
}

/* ---------- Lamp and smoke transition ---------- */
var LAMPSVG='<svg viewBox="0 0 200 120" aria-hidden="true" style="overflow:visible"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fde68a"/><stop offset=".55" stop-color="#f59e0b"/><stop offset="1" stop-color="#92400e"/></linearGradient><filter id="bl"><feGaussianBlur stdDeviation="1.6"/></filter></defs><g fill="none" stroke-linecap="round" filter="url(#bl)"><path class="w w1" stroke="#c4b5fd" stroke-width="4" d="M20 30C4 16 34 6 16-8S30-32 14-48"/><path class="w w2" stroke="#67e8f9" stroke-width="3" d="M22 28C36 14 6 4 24-10S8-34 26-50"/><path class="w w3" stroke="#f0abfc" stroke-width="3" d="M18 32C0 22 26 12 10 0S28-24 12-38"/></g><path d="M52 66C36 62 30 50 18 34L27 29C40 43 50 49 62 53Z" fill="url(#lg)"/><path d="M46 78C46 58 72 50 100 50S154 58 154 78 128 106 100 106 46 98 46 78Z" fill="url(#lg)" stroke="#fde68a" stroke-width="2"/><path d="M150 66C178 62 184 92 158 98" fill="none" stroke="#f59e0b" stroke-width="8" stroke-linecap="round"/><path d="M84 52C88 40 112 40 116 52Z" fill="#d97706"/><circle cx="100" cy="38" r="5" fill="#fde68a"/><rect x="78" y="104" width="44" height="8" rx="3" fill="#92400e"/><path d="M62 70C70 62 90 60 104 62" stroke="#fff" stroke-opacity=".5" stroke-width="3" fill="none" stroke-linecap="round"/></svg>';
/* ---------- Procedural dune scape (bottom fifth of every screen) ---------- */
function duneLayer(w,h,base,amp,color,seed){
  var n=7,pts=[];
  for(var i=0;i<=n;i++){
    var x=i/n*w,y=base-Math.sin(i*1.7+seed)*amp*.4-Math.abs(Math.sin(seed*3+i*2.3))*amp*.6;
    pts.push([x,y]);
  }
  var d='M0,'+h+' L'+pts[0][0]+','+pts[0][1];
  for(var i=0;i<pts.length-1;i++){
    var mx=(pts[i][0]+pts[i+1][0])/2,my=(pts[i][1]+pts[i+1][1])/2;
    d+=' Q'+pts[i][0]+','+pts[i][1]+' '+mx+','+my;
  }
  d+=' L'+w+','+pts[pts.length-1][1]+' L'+w+','+h+' Z';
  return '<path d="'+d+'" fill="'+color+'"/>';
}
function buildDunes(){
  var w=1600,h=260,seed=Math.random()*10;
  var svg='<svg viewBox="0 0 '+w+' '+h+'" preserveAspectRatio="none" aria-hidden="true">'
    +duneLayer(w,h,h*.42,30,'rgba(46,16,101,.55)',seed)
    +duneLayer(w,h,h*.62,34,'rgba(30,27,75,.72)',seed+2.1)
    +duneLayer(w,h,h*.82,30,'rgba(9,10,16,.96)',seed+4.4)
    +'</svg>';
  var d=document.createElement('div');d.id='dunes';d.innerHTML=svg;document.body.appendChild(d);
}
buildDunes();
var lamp=document.createElement('button');lamp.id='lamp';lamp.setAttribute('data-nav','1');lamp.setAttribute('aria-label','Rub the lamp: next point');lamp.innerHTML=LAMPSVG;document.body.appendChild(lamp);
var cv=document.createElement('canvas');cv.id='smoke';document.body.appendChild(cv);var cx=cv.getContext('2d');
var modal=document.createElement('div');modal.id='modal';document.body.appendChild(modal);
var PAL=['46,16,101','30,27,75','88,28,135','109,40,217','22,18,60','14,116,144'];
function build(){
  var W=cv.width=innerWidth,H=cv.height=innerHeight,R=Math.max(W,H)/5,r=lamp.getBoundingClientRect(),sp={x:r.left+r.width*.1,y:r.top+r.height*.27},ps=[];
  for(var gx=-R*.3;gx<W+R*.6;gx+=R*.85)for(var gy=-R*.3;gy<H+R*.6;gy+=R*.85){
    var tx=gx+(Math.random()-.5)*R*.5,ty=gy+(Math.random()-.5)*R*.5;
    ps.push({tx:tx,ty:ty,r:R*(1+Math.random()*.5),c:PAL[Math.random()*PAL.length|0],d:Math.hypot(tx-sp.x,ty-sp.y)/Math.hypot(W,H),sw:(Math.random()<.5?-1:1)*(1+Math.random()*1.5)})}
  return{ps:ps,sp:sp,W:W,H:H};
}
function draw(S,t){
  cx.clearRect(0,0,S.W,S.H);
  S.ps.forEach(function(p){
    var q=Math.min(1,Math.max(0,(t-p.d*.45)/.55));if(q<=0)return;
    var e=1-Math.pow(1-q,3),vx=p.tx-S.sp.x,vy=p.ty-S.sp.y,a=(1-e)*p.sw,c=Math.cos(a),s=Math.sin(a);
    var x=S.sp.x+(vx*c-vy*s)*e,y=S.sp.y+(vx*s+vy*c)*e,r=Math.max(8,p.r*e),g=cx.createRadialGradient(x,y,0,x,y,r);
    g.addColorStop(0,'rgba('+p.c+',.95)');g.addColorStop(.6,'rgba('+p.c+',.6)');g.addColorStop(1,'rgba('+p.c+',0)');
    cx.fillStyle=g;cx.beginPath();cx.arc(x,y,r,0,7);cx.fill()});
  var f=Math.max(0,(t-.85)/.15);if(f>0){cx.fillStyle='rgba(20,12,48,'+f*.96+')';cx.fillRect(0,0,S.W,S.H)}
}
function ease(k){return k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2}
function anim(S,a,b,ms){return new Promise(function(res){var t0=performance.now();(function f(n){var k=Math.min(1,(n-t0)/ms);draw(S,a+(b-a)*ease(k));k<1?requestAnimationFrame(f):res()})(t0)})}
function pause(ms){return new Promise(function(r){setTimeout(r,ms)})}
function transition(swap){
  if(reduce||busy){swap();return}
  busy=true;cv.style.display='block';lamp.classList.add('rub');
  var S=build();
  anim(S,0,1,1000).then(function(){swap();return pause(140)}).then(function(){return anim(S,1,0,1100)}).then(function(){cv.style.display='none';lamp.classList.remove('rub');busy=false});
}

/* ---------- Routing & events ---------- */
var cur=1;
function render(){
  var h=location.hash.replace('#',''),m=/^slide-(\d+)$/.exec(h);
  view.style.padding='';window.scrollTo(0,0);
  cur=m?Math.min(SLIDES.length,Math.max(1,+m[1])):1;
  var f=full;full=false;slideView(cur,f);
}
function route(){if(first){first=false;render()}else transition(render)}
function go(n){n=Math.min(SLIDES.length,Math.max(1,n));location.hash='#slide-'+n}
document.addEventListener('mouseover',function(e){var g=e.target.closest('.gem');if(g)setCap(TREASURES[+g.dataset.i])});
document.addEventListener('mouseout',function(e){var g=e.target.closest('.gem');if(g)resetCap()});
document.addEventListener('focusin',function(e){var g=e.target.closest('.gem');if(g)setCap(TREASURES[+g.dataset.i])});
document.addEventListener('focusout',function(e){var g=e.target.closest('.gem');if(g)resetCap()});
document.addEventListener('click',function(e){
  var g=e.target.closest('.gem');if(g){openModal(+g.dataset.i);return}
  var cl=e.target.closest('[data-close]');if(cl){closeModal();return}
  var t=e.target.closest('[data-nav],[data-go],[data-copy],[data-copytxt],[data-dl]');
  if(!t){if(!e.target.closest('button,a,input,textarea,summary,pre,.drawer,.top'))step(1);return}
  if(t.dataset.nav)step(+t.dataset.nav);
  if(t.dataset.go&&!busy)go(+t.dataset.go);
  if(t.dataset.copy)copy(FORMULA);
  if(t.dataset.copytxt)copy(decodeURIComponent(t.dataset.copytxt));
  if(t.dataset.dl){var b=new Blob(['<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>My Classroom Tool</title>\n</head>\n<body>\n<!-- Paste the code from your AI chat here, replacing this whole file. -->\n</body>\n</html>\n'],{type:'text/html'});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='tool.html';document.body.appendChild(a);a.click();a.remove();toast('tool.html downloaded')}
});
document.addEventListener('keydown',function(e){
  if(/INPUT|TEXTAREA/.test(e.target.tagName))return;
  if($('#modal').classList.contains('open')){if(e.key==='Escape')closeModal();return}
  if(e.target.tagName==='BUTTON'&&(e.key===' '||e.key==='Enter'))return;
  var k=e.key;
  if(k==='ArrowRight'||k===' '||k==='PageDown'){e.preventDefault();step(1)}
  else if(k==='ArrowLeft'||k==='PageUp'){e.preventDefault();step(-1)}
  else if(k==='Escape'){var d=$('#drawer');if(d)d.classList.remove('open')}
});
var sx=null;
document.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
document.addEventListener('touchend',function(e){if(sx===null)return;var d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>60)step(d<0?1:-1);sx=null});
window.addEventListener('hashchange',route);
route();
})();
