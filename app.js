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

/* ---------- App data ---------- */
var APPS=[
{n:1,name:'EduSpin',full:'EduSpin Wheel Picker',slide:4,file:'Example_1/WheelPicker.html',
 what:'A colorful digital spinning wheel that runs in your browser. Use one wheel to pick at random, or two side by side to pair or compare ideas.',
 use:['Random Student Caller: paste your roster and spin.','Fair Turns: remove names after they are picked.','Side-by-Side Compare: figures on Wheel 1, events on Wheel 2.','100% Privacy: no account, and the roster never leaves your computer.'],
 learn:['Your browser is a free player: a .html file opens and works instantly.','No missing parts: sounds and shapes are generated, not downloaded.','You can change how it works: ask in plain English for two wheels.'],
 prompt:'Act as an educational web tool maker.\nBuild a random name picker for my virtual classroom students.\nA spinning wheel with tick sounds, an option to remove names after they are picked, and a two-wheel side-by-side mode.\nKeep everything in one .html file. Make sounds with the browser, draw with code, no downloads.\nKeep the roster private on my computer.',
 tree:[['WheelPicker.html','The whole app in one file'],['WheelPicker_Prompt.txt','The wish that built it'],['README.md','Teacher-friendly guide']]},
{n:2,name:'Elastic Timeline',full:'Elastic Timeline',slide:5,file:'Example_3/Elastic_Timeline.html',
 what:'Cards float at the bottom of the screen. Drag them onto a timeline bar and they slide apart to make room. "Check Timeline" lights them up.',
 use:['Chronology review during screen shares.','Wordle-style feedback: green is correct, yellow is out of order.','Edit List: paste any ordered events for an instant new game.','Confetti when the sequence is solved.'],
 learn:['Describe movement in normal words: "float gently like in water".','Say "one standalone file, no outside links" so school filters cannot break it.','Borrow familiar game rules, like Wordle colors.'],
 prompt:'Act as an educational web tool maker.\nBuild a timeline game for my history students.\nUnplaced cards float gently like they are in water. Students drag cards onto a timeline bar and neighbors slide apart to make room. A Check button turns correct cards green and misplaced cards yellow. Confetti on a full solve. An Edit List button accepts pasted events.\nKeep everything in one standalone .html file with no outside links.',
 tree:[['Elastic_Timeline.html','One file: cards, physics, confetti'],['Elastic_Timeline_Prompt.txt','The wish'],['README.md','Guide']]},
{n:3,name:'Vocabulary Codenames',full:'Vocabulary Codenames',slide:6,file:'Example_4/CodeNames.html',
 what:'A vocabulary review game based on Codenames. Paste 16 or more words and get a 4-by-4 grid with hidden team assignments.',
 use:['Red Team vs Blue Team in a live class or breakout rooms.','Copy Red Key / Copy Blue Key buttons for Spymaster chat messages.','Click cards to reveal Red, Blue, Neutral, or the Black trap card.','Teacher Peek mode shows subtle borders.'],
 learn:['Tell the AI about your real virtual teaching annoyances; it builds the shortcut.','No images needed: cards and glows come from code.','No accounts or logins. Paste, generate, play.'],
 prompt:'Act as an educational web tool maker.\nBuild a Codenames-style vocabulary game for my class.\nI paste 16+ words and get a 4x4 grid with red, blue, neutral, and one black card. Add a button to copy each team\'s secret words for pasting in Zoom or Teams chat, and a teacher peek toggle.\nOne .html file, no outside resources, no data leaves my computer.',
 tree:[['CodeNames.html','One file: grid, keys, peek mode'],['CodeNames_Prompt.txt','The wish'],['README.md','Guide']]},
{n:4,name:'Rotate & Relate',full:'Rotate & Relate (Geometry Sandbox)',slide:7,file:'Example_5/Elements_On_Screen.html',
 what:'A geometry manipulative for similar right triangles. Connect matching sides with colored cords, then watch the triangles lift, flip, and rotate to line up.',
 use:['Make invisible math visible on a shared screen.','Drag red, blue, and yellow cords between corresponding sides.','The "Aha!" animation shows whether cords match or clash.','New Triangle gives endless randomized practice.'],
 learn:['A clear blueprint (draw, wire, animate) gives commercial-looking results.','Web pages have 3 pieces: Skeleton (.html), Clothes (.css), Brain (.js).','You do not have to settle for locked-down textbook sites.'],
 prompt:'See Example_5/PRD.md. This app was built from a Product Requirements Document: a step-by-step blueprint (draw the triangle, give me 3 colored cords, animate the rotation) rather than a single paragraph.',
 tree:[['Elements_On_Screen.html','The Skeleton: words, buttons, shapes'],['How_It_Looks.css','The Clothes: colors, fonts, dark theme'],['What_It_Does.js','The Brain: math, dragging, animation'],['PRD.md','The blueprint given to the AI']]},
{n:5,name:'FeedbackFlow',full:'FeedbackFlow (Grading Feedback Builder)',slide:8,file:'Example_2/FeedbackFlow_2.html',note:'Version 1 is FeedbackFlow_1.html.',
 what:'A point-and-click grading assistant. Click rubric levels and quick notes; it writes a warm feedback paragraph you copy in one touch.',
 use:['Speed up grading without sounding like a robot.','One-click common notes like "Please check office hours".','Version 2 totals scores, like 10/12.','Save your rubric to a backup file for next term.'],
 learn:['Apps evolve in stages: V1 was a 0 to 4 rating; V2 came from one follow-up request.','Ask in plain words: "When I click level 3, write this sentence."','Grades never travel over the internet.'],
 prompt:'Wish 1:\nAct as an educational web tool maker. Build a grading tool for my teachers where clicking rubric levels (0 to 4) builds a warm feedback paragraph with a Copy button. One .html file, fully private.\n\nWish 2 (keep everything from Wish 1):\nCan I also change the score numbers, add custom levels, and show a total like Score: 10/12 at the bottom?',
 tree:[['FeedbackFlow_1.html','Version 1: simple 0 to 4 rating'],['FeedbackFlow_2.html','Version 2: custom levels and totals'],['FeedbackFlow_Prompt.txt','Both wishes'],['README.md','Guide']]}
];
function appForSlide(s){return APPS.filter(function(a){return a.slide===s})[0]}

/* ---------- Slides ---------- */
var LAMP='<svg viewBox="0 0 200 140" aria-hidden="true"><defs><radialGradient id="g"><stop offset="0" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b" stop-opacity="0"/></radialGradient></defs><circle cx="150" cy="40" r="36" fill="url(#g)" opacity=".7"/><path d="M40 100c0-24 24-34 56-34s50 8 56 20l22-26-8 36c-6 14-24 22-70 22-34 0-56-4-56-18z" fill="#f59e0b" stroke="#fbbf24" stroke-width="3"/><rect x="60" y="110" width="80" height="10" rx="4" fill="#b45309"/><g fill="#2dd4bf"><rect x="150" y="14" width="10" height="14" rx="2" transform="rotate(-12 155 21)"/><rect x="172" y="30" width="10" height="14" rx="2" transform="rotate(14 177 37)"/></g><g fill="#a855f7"><rect x="132" y="6" width="9" height="12" rx="2" transform="rotate(8 136 12)"/></g></svg>';
function showcase(s,title,left,right){
  var a=appForSlide(s);
  return '<h2>'+title+'</h2><div class="grid g2"><div class="card"><h3>Classroom Magic</h3><ul>'+left.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></div><div class="card glow"><h3>The Genie Lesson</h3>'+right+'<p><a class="btn" href="#app-'+a.n+'">Inspect Blueprint &amp; Prompt</a></p></div></div>';
}
var SLIDES=[
{t:'The Wish and the Lamp',h:function(){return '<div class="hero"><h1>The Classroom Genie: Building Custom Tools Without Code</h1><p>Pearson Virtual Schools Staff Conference. Presenter: Caleob King.</p><div class="card glow" style="max-width:52rem;margin:1.2rem auto"><p>AI is a <b>powerful but overly literal Genie</b>. It can build any educational manipulative you imagine, but it takes every word literally, so you must state your wish clearly.</p></div><p style="color:var(--gold)">Press Space or the right arrow to begin.</p></div>'}},
{t:'The Three Curses of Ready-Made EdTech',h:function(){return '<h2>The Three Curses of Ready-Made EdTech</h2><div class="grid g3"><div class="card"><h3>The Login Nightmare</h3><p>Lost passwords, account limits, student privacy risks.</p></div><div class="card"><h3>The Cookie-Cutter Trap</h3><p>Generic tools never fit your exact lesson or state standard.</p></div><div class="card"><h3>The Paywall &amp; Firewall</h3><p>Subscriptions expire and school security blocks outside sites.</p></div></div><div class="banner"><b>The Genie\'s Secret:</b> your web browser is already a free, offline projector. Works from your desktop with zero logins, zero accounts, and 100% privacy.</div>'}},
{t:'Meeting the Genie',h:function(){return '<h2>Meeting the Genie</h2><p>The Genie does not read minds. It executes your exact words.</p><div class="grid g3">'+[['1. Keep it in one house','Everything inside a single standalone .html file.'],['2. No phantom files','Browser-made sounds and code-drawn shapes instead of downloads.'],['3. Protect student privacy','Everything stays in your browser. Nothing goes to outside servers.']].map(function(r){return '<div class="card glow" tabindex="0"><h3>'+r[0]+'</h3><p>'+r[1]+'</p></div>'}).join('')+'</div>'}},
{t:'App 1: The Spinning Wheel',h:function(){return showcase(4,'App 1: The Spinning Wheel (EduSpin)',['Spin for random student turns with tick sounds.','Dual wheels pair students or compare two ideas.','Names are removed after picking; the roster stays on your computer.'],'<p>Double-clicking an <code>.html</code> file opens it in Chrome or Edge with no internet. You just made your first piece of classroom software.</p>')}},
{t:'App 2: The Elastic Timeline',h:function(){return showcase(5,'App 2: The Elastic Timeline',['Cards bob at the bottom; drag them onto the timeline and neighbors slide apart.','Check Timeline: green is correct, yellow is misplaced.','Confetti on a full solve.'],'<p>Describe physical sensations in everyday language: <i>"make unplaced cards float gently like they are in water."</i></p>')}},
{t:'App 3: Vocabulary Codenames',h:function(){return showcase(6,'App 3: Vocabulary Codenames',['Paste 16 terms into a 4x4 grid: Red, Blue, Bystanders, one trap card.','One-click copy of each team\'s secret list for Zoom, Teams, or Meet chat.','Teacher Peek mode.'],'<p>Tell the Genie your real teaching hurdles. Asking for <i>"a button to copy secret words for chat"</i> builds the exact shortcut.</p>')}},
{t:'App 4: Rotate & Relate',h:function(){return showcase(7,'App 4: Rotate &amp; Relate (Geometry)',['Students connect matching sides of nested triangles with red, blue, and yellow cords.','Check triggers lift, flip, rotate so the match is visible.'],'<p>Every web app has three pieces:</p><ul><li><b>Skeleton</b> (.html): what you see.</li><li><b>Clothes</b> (.css): colors and fonts.</li><li><b>Brain</b> (.js): math, dragging, animation.</li></ul>')}},
{t:'App 5: FeedbackFlow',h:function(){return showcase(8,'App 5: FeedbackFlow (Grading Assistant)',['Rubric clicks and quick notes become a warm feedback paragraph.','Paste it straight into your gradebook.'],'<p><b>Wishes in stages.</b> Wish 1: build the rubric tool. Wish 2: add custom point values and a <code>Score: 10/12</code> summary.</p><p>Tell the Genie what to keep before asking for changes. Loop: prompt, build, test, refine.</p>')}},
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
  hud.innerHTML='<button data-nav="-1" aria-label="Previous">&#8249;</button>'+SLIDES.map(function(x,i){return '<button class="dot'+(i+1===n?' on':'')+'" title="'+(i+1)+'. '+x.t+'" aria-label="Slide '+(i+1)+': '+x.t+'" data-go="'+(i+1)+'"></button>'}).join('')+'<button data-nav="1" aria-label="Next">&#8250;</button><span>Slide '+n+' of 12</span><span id="cnt"></span><a href="#app-1">App Hub</a>';
  hudCount();document.title=s.t+' | The Classroom Genie';
}
function li(a){return '<ul>'+a.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul>'}
function annotate(t){
  var lines=t.split('\n');
  return lines.map(function(l){
    var e=l.replace(/&/g,'&amp;').replace(/</g,'&lt;');
    if(/^Act as/.test(l))return '<span class="pill role">Role</span>'+e;
    if(/^Build|^Wish/.test(l))return '<span class="pill aud">Audience</span>'+e;
    if(/one|single|no outside|private|no downloads/i.test(l)&&/\.html|private|download|outside/i.test(l))return '<span class="pill guard">Guardrails</span>'+e;
    if(l.trim())return '<span class="pill task">Task</span>'+e;
    return e}).join('\n');
}
function appView(n,tab){
  var a=APPS[n-1];tab=tab||'readme';hud.classList.add('hide');
  var body='';
  if(tab==='readme')body='<div class="card"><h3>What is this app?</h3><p>'+a.what+'</p><h3>How to use it in a virtual K-12 classroom</h3>'+li(a.use)+'<h3>What a non-coder learns from prompting it</h3>'+li(a.learn)+'</div>';
  if(tab==='prompt')body='<div class="card"><p>Color badges mark the four Golden Formula pieces. Edit the text in <code>app.js</code> to match your <code>_Prompt.txt</code> file exactly.</p><pre id="pt">'+annotate(a.prompt)+'</pre><button class="btn" data-copytxt="'+encodeURIComponent(a.prompt)+'">Copy Prompt</button></div>';
  if(tab==='files')body='<div class="card"><h3>File Blueprint</h3><div class="tree">'+a.tree.map(function(f){return '&#9500; <b>'+f[0]+'</b> <span style="color:var(--mute)">- '+f[1]+'</span>'}).join('<br>')+'</div><p>Simple apps live in one <code>.html</code> file so nothing gets lost or blocked. Bigger apps split into Skeleton (.html), Clothes (.css), Brain (.js), plus a PRD.md blueprint.</p></div>';
  view.style.padding='0';
  view.innerHTML='<div class="top"><a class="btn alt" href="#slide-'+a.slide+'">&larr; Return to Slide '+a.slide+'</a>'+APPS.map(function(x){return '<a class="p'+(x.n===n?' on':'')+'" href="#app-'+x.n+'">App '+x.n+': '+x.name+'</a>'}).join('')+'<span class="sp"></span><a class="btn" href="'+a.file+'" target="_blank" rel="noopener">&#128640; Launch Live App in New Tab</a></div><div style="padding:1.5rem clamp(1rem,5vw,5rem) 9rem"><h2>'+a.full+'</h2>'+(a.note?'<p>'+a.note+'</p>':'')+'<div class="tabs" role="tablist">'+[['readme','Classroom Readme'],['prompt','The Exact Wish Prompt'],['files','File Blueprint']].map(function(t){return '<button class="tab" role="tab" aria-selected="'+(t[0]===tab)+'" data-tab="'+t[0]+'">'+t[1]+'</button>'}).join('')+'</div>'+body+'</div>';
  document.querySelectorAll('[data-tab]').forEach(function(b){b.onclick=function(){appView(n,b.dataset.tab)}});
  document.title=a.name+' | The Classroom Genie';
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
  if(busy||/^app-/.test(location.hash.slice(1)))return;
  if(d>0){if(st.i<st.u.length){st.u[st.i++].classList.add('in');hudCount()}else if(cur<12)go(cur+1)}
  else{if(st.i>0){st.u[--st.i].classList.remove('in');hudCount()}else if(cur>1){full=true;go(cur-1)}}
}

/* ---------- Lamp and smoke transition ---------- */
var LAMPSVG='<svg viewBox="0 0 200 120" aria-hidden="true" style="overflow:visible"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fde68a"/><stop offset=".55" stop-color="#f59e0b"/><stop offset="1" stop-color="#92400e"/></linearGradient><filter id="bl"><feGaussianBlur stdDeviation="1.6"/></filter></defs><g fill="none" stroke-linecap="round" filter="url(#bl)"><path class="w w1" stroke="#c4b5fd" stroke-width="4" d="M20 30C4 16 34 6 16-8S30-32 14-48"/><path class="w w2" stroke="#67e8f9" stroke-width="3" d="M22 28C36 14 6 4 24-10S8-34 26-50"/><path class="w w3" stroke="#f0abfc" stroke-width="3" d="M18 32C0 22 26 12 10 0S28-24 12-38"/></g><path d="M52 66C36 62 30 50 18 34L27 29C40 43 50 49 62 53Z" fill="url(#lg)"/><path d="M46 78C46 58 72 50 100 50S154 58 154 78 128 106 100 106 46 98 46 78Z" fill="url(#lg)" stroke="#fde68a" stroke-width="2"/><path d="M150 66C178 62 184 92 158 98" fill="none" stroke="#f59e0b" stroke-width="8" stroke-linecap="round"/><path d="M84 52C88 40 112 40 116 52Z" fill="#d97706"/><circle cx="100" cy="38" r="5" fill="#fde68a"/><rect x="78" y="104" width="44" height="8" rx="3" fill="#92400e"/><path d="M62 70C70 62 90 60 104 62" stroke="#fff" stroke-opacity=".5" stroke-width="3" fill="none" stroke-linecap="round"/></svg>';
var lamp=document.createElement('button');lamp.id='lamp';lamp.setAttribute('data-nav','1');lamp.setAttribute('aria-label','Rub the lamp: next point');lamp.innerHTML=LAMPSVG;document.body.appendChild(lamp);
var cv=document.createElement('canvas');cv.id='smoke';document.body.appendChild(cv);var cx=cv.getContext('2d');
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
  var h=location.hash.replace('#',''),m;
  view.style.padding='';window.scrollTo(0,0);
  if((m=/^app-([1-5])$/.exec(h)))return appView(+m[1]);
  m=/^slide-(\d+)$/.exec(h);cur=m?Math.min(12,Math.max(1,+m[1])):1;
  var f=full;full=false;slideView(cur,f);
}
function route(){if(first){first=false;render()}else transition(render)}
function go(n){n=Math.min(12,Math.max(1,n));location.hash='#slide-'+n}
document.addEventListener('click',function(e){
  var t=e.target.closest('[data-nav],[data-go],[data-copy],[data-copytxt],[data-dl]');
  if(!t){if(!e.target.closest('button,a,input,textarea,summary,pre,.drawer,.top'))step(1);return}
  if(t.dataset.nav)step(+t.dataset.nav);
  if(t.dataset.go&&!busy)go(+t.dataset.go);
  if(t.dataset.copy)copy(FORMULA);
  if(t.dataset.copytxt)copy(decodeURIComponent(t.dataset.copytxt));
  if(t.dataset.dl){var b=new Blob(['<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>My Classroom Tool</title>\n</head>\n<body>\n<!-- Paste the code from your AI chat here, replacing this whole file. -->\n</body>\n</html>\n'],{type:'text/html'});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='tool.html';document.body.appendChild(a);a.click();a.remove();toast('tool.html downloaded')}
});
document.addEventListener('keydown',function(e){
  if(/^app-/.test(location.hash.slice(1))||/INPUT|TEXTAREA/.test(e.target.tagName))return;
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
