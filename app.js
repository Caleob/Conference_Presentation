(function(){
'use strict';
var $=function(s){return document.querySelector(s)};
var view=$('#view'),hud=$('#hud');
/* ---------- The safety line & wish starter (copied by buttons on the slides) ---------- */
var SAFETY='Put everything in one single .html file. Don’t use anything from the internet (no outside pictures, fonts, sounds, or websites). Keep anything I type into the tool private on my computer.';
var FORMULA='Make a tool for my [grade] [subject] students.\n[Describe what students see, what they click, and what happens when they do.]\n'+SAFETY;
var sbCode=''; // remembers whatever was pasted into the "See It & Save It" box between slides

function toast(m){var t=$('#toast');t.textContent=m||'Copied ✓';t.classList.add('on');clearTimeout(toast.id);toast.id=setTimeout(function(){t.classList.remove('on')},2200)}
function copy(txt,msg){
  var ok=function(){toast(msg||'✓ Copied! Now paste it into your AI chat.')};
  if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(txt).then(ok,fb)}else fb();
  function fb(){var a=document.createElement('textarea');a.value=txt;document.body.appendChild(a);a.select();try{document.execCommand('copy');ok()}catch(e){toast('Press Ctrl+C to copy')}a.remove()}
}
function saveFile(txt, filename, type){
  var b = new Blob([txt], {type: type || 'text/plain;charset=utf-8'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(b);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(function(){ URL.revokeObjectURL(a.href); }, 1500);
  toast('✓ Saved ' + filename + '. Look in your Downloads folder.');
}

/* ---------- Cave of Wonders: content lives in treasures.js ---------- */
var TREASURES = window.TREASURES || [];
var GROUPS = window.TREASURE_GROUPS || [];

function escapeHTML(s){
  return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function stripTags(s){return (s||'').replace(/<[^>]+>/g,'')}
function groupOf(t){for(var k=0;k<GROUPS.length;k++){if(GROUPS[k].id===t.group)return GROUPS[k]}return {id:'',icon:'',title:'',hue:0}}
function readmeHTML(t){
  return '<h3>What is it?</h3><p>'+t.what+'</p><h4>How you might use it</h4><ul>'+
    t.uses.map(function(u){return '<li><strong>'+u[0]+':</strong> '+u[1]+'</li>'}).join('')+'</ul>';
}
function lessonHTML(t){
  var L=t.lesson;
  return '<h3>'+L.title+'</h3>'+L.points.map(function(p){
    return '<h5>'+p[0]+'</h5><ul>'+p[1].map(function(b){return '<li>'+b+'</li>'}).join('')+'</ul>';
  }).join('');
}
function lessonText(t){
  var L=t.lesson;
  return t.name+': '+L.title+'\n\n'+L.points.map(function(p){
    return stripTags(p[0])+'\n'+p[1].map(function(b){return '  - '+stripTags(b)}).join('\n');
  }).join('\n\n')+'\n';
}
function promptNote(t){
  if(t.promptNote) return t.promptNote;
  if(t.prompt.length>1500) return 'This prompt is long because I wrote it after a lot of practice. <b>Yours doesn’t need to be!</b> A first wish can be two or three plain sentences, like the one above. (Peek at the Water Cycle Memory Match to see a short one.)';
  return '';
}

var GEMDEFS='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="gemg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fef9c3"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#7c3aed"/></linearGradient><symbol id="gem" viewBox="0 0 40 44"><polygon points="20,2 36,14 30,42 10,42 4,14" fill="url(#gemg)" stroke="#fff" stroke-opacity=".55" stroke-width="1.2"/><polygon points="20,2 36,14 20,20" fill="#fff" fill-opacity=".35"/><polygon points="4,14 20,20 10,42" fill="#000" fill-opacity=".18"/></symbol></defs></svg>';
var CAPTION='Point at any gem for a quick peek. Click it to open the tool, see the exact wish, and pick up a tip.';
function gemHTML(t,i,g,k){
  return '<button class="gem" data-i="'+i+'" style="--hue:'+g.hue+'deg;--dur:'+(4.5+k%3*.7)+'s;--delay:'+(k*.35)+'s" aria-label="'+escapeHTML(t.name+': '+t.short+' ('+t.grades+')')+'">'
    +'<svg class="gemi" viewBox="0 0 40 44" aria-hidden="true"><use href="#gem"></use></svg>'
    +'<span class="gname">'+t.name+'</span>'
    +(g.id!=='deep'?'<span class="gshort">'+t.short+'</span>':'')
    +'</button>';
}
function caveHTML(){
  return GEMDEFS+'<div class="cave-groups">'+GROUPS.map(function(g){
    var k=0,gems=TREASURES.map(function(t,i){return t.group===g.id?gemHTML(t,i,g,k++):''}).join('');
    return '<section class="cave-group cg-'+g.id+'" aria-label="'+escapeHTML(g.title)+'">'
      +'<h3><span aria-hidden="true">'+g.icon+'</span> '+g.title+'</h3><p class="gsub">'+g.sub+'</p>'
      +'<div class="gem-row">'+gems+'</div></section>';
  }).join('')+'</div><div id="gemCaption" aria-live="polite">'+CAPTION+'</div>';
}
function setCap(t){
  var c=$('#gemCaption');
  if(c) c.innerHTML='<b>'+t.name+'</b> &mdash; '+t.short+' <span style="color:var(--cyan)">('+t.grades+')</span>';
}
function resetCap(){
  var c=$('#gemCaption');
  if(c) c.textContent=CAPTION;
}
function openModal(i){
  var t=TREASURES[i],m=$('#modal'),g=groupOf(t),note=promptNote(t);
  m.innerHTML='<div class="mback" data-close="1"></div>' +
    '<div class="mdlg" role="dialog" aria-modal="true" aria-labelledby="mtitle">' +
      '<div class="mheader">' +
        '<div class="mtop-row">' +
          '<div class="mbadges"><span class="mbadge">' + g.icon + ' ' + g.title + '</span><span class="mbadge mgrade">' + t.grades + '</span></div>' +
          '<button class="mclose" data-close="1" aria-label="Close">&times;</button>' +
        '</div>' +
        '<h3 id="mtitle">' + t.name + '</h3>' +
        '<p class="mdesc">' + t.short + '</p>' +
      '</div>' +
      '<div class="mtabs" role="tablist">' +
        '<button class="mtab active" data-mtab="result">🚀 What It Does</button>' +
        '<button class="mtab" data-mtab="prompt">🪄 The Wish</button>' +
        '<button class="mtab" data-mtab="lesson">💡 Tips I Learned</button>' +
      '</div>' +
      '<div class="mbody">' +
        '<div class="mpane active" id="mpane-result">' +
          '<div class="mresult-wrap"><div class="mreadme-card">' + readmeHTML(t) + '</div></div>' +
          '<div class="mtab-actions">' +
            '<a class="btn" href="' + encodeURI(t.file) + '" target="_blank" rel="noopener">🚀 Open the tool</a>' +
            '<a class="btn alt" href="' + encodeURI(t.downloadFile || t.file) + '" download="' + (t.downloadName || '') + '" target="_blank" rel="noopener" data-savefiles="' + i + '">💾 Download a copy</a>' +
          '</div>' +
        '</div>' +
        '<div class="mpane" id="mpane-prompt">' +
          '<div class="mprompt-wrap">' +
            '<div class="mwish"><span class="mwish-label">In plain words</span><p>' + t.wish + '</p></div>' +
            '<h4 class="mprompt-h">The exact prompt I used</h4>' +
            (note ? '<p class="mnote">' + note + '</p>' : '') +
            '<pre class="mprompt-code"><code>' + escapeHTML(t.prompt) + '</code></pre>' +
          '</div>' +
          '<div class="mtab-actions">' +
            '<button class="btn" data-copyprompt="' + i + '">📋 Copy the prompt</button>' +
            '<button class="btn alt" data-saveprompt="' + i + '">💾 Save as a text file</button>' +
          '</div>' +
        '</div>' +
        '<div class="mpane" id="mpane-lesson">' +
          '<div class="mlesson-wrap"><div class="mlesson-card">' + lessonHTML(t) + '</div></div>' +
          '<div class="mtab-actions">' +
            '<button class="btn" data-copylesson="' + i + '">📋 Copy the tips</button>' +
            '<button class="btn alt" data-savelesson="' + i + '">💾 Save as a text file</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  m.classList.add('open');
  document.body.style.overflow='hidden';
  var closeBtn=m.querySelector('.mclose');
  if(closeBtn) closeBtn.focus();
}
function closeModal(){
  var m=$('#modal');
  if(!m.classList.contains('open'))return;
  m.classList.remove('open');
  m.innerHTML='';
  document.body.style.overflow='';
}

/* ---------- Slide building blocks ---------- */
function card(icon,title,body,cls){
  return '<div class="card'+(cls?' '+cls:'')+'">'+(icon?'<div class="cicon" aria-hidden="true">'+icon+'</div>':'')+'<h3>'+title+'</h3><p>'+body+'</p></div>';
}
function bubble(who,text,extra){
  return who==='you'
    ? '<div class="card bubble you"><span class="who">You</span><p>'+text+'</p></div>'
    : '<div class="card bubble genie"><span class="who">✨ Genie</span><p>'+text+'</p>'+(extra||'')+'</div>';
}
function phrases(icon,title,list){
  return '<div class="card"><div class="cicon" aria-hidden="true">'+icon+'</div><h3>'+title+'</h3><div class="phrases">'
    +list.map(function(p){return '<span class="phrase">'+p+'</span>'}).join('')+'</div></div>';
}

/* Ready-to-borrow wishes. The safety line is added automatically when copied. */
var WISHES=[
  ['Grades K–2 · Reading','Make a game for my kindergarten students. Show one big letter and three emoji pictures. Students click the picture that starts with that letter’s sound. Cheer when they get it right, and let them try again if they don’t.'],
  ['Grades 3–5 · Math','Make a fraction game for my 4th graders. Show two fraction bars side by side, and students click the bigger fraction. Keep score, and show a new pair after each answer.'],
  ['Grades 6–8 · ELA','Make a sentence unscramble game for my 7th graders. Show the words of a sentence in a mixed-up order. Students drag the words into the right order and click Check. Let me paste in my own sentences.'],
  ['Science','Make a water cycle explorer for my 6th grade science students. Show a simple picture of the water cycle. When students click each stage, play a short animation and show one sentence explaining it.'],
  ['Social Studies','Make a “Who Said It?” game for my 8th graders. Show a famous quote and four names to choose from. Let me paste in my own quotes and names, and show the right answer after each guess.'],
  ['Just for You','Make a group maker for me. I paste in my class list, and it shuffles students into groups of 4. Let me drag names between groups, and add a button that copies the groups so I can paste them into chat.']
];

/* ---------- Slides ---------- */
var SLIDES=[
{t:'The Classroom Genie',h:function(){return '<div class="hero">'
  +'<h1>The Classroom Genie</h1>'
  +'<p class="hero-sub">Make your own classroom tools with AI. No coding required.</p>'
  +'<div class="card glow hero-card"><p>AI is like a genie: it grants your wish <b>exactly</b> the way you say it.</p>'
  +'<p>The good news? <b>This genie gives you unlimited wishes.</b> If the first try isn’t quite right, you just wish again.</p></div>'
  +'<div class="hero-foot"><p class="hero-meta">Pearson Virtual Schools Staff Conference · Caleob King</p>'
  +'<p class="hero-cue">Press Space, the right arrow, or rub the lamp to begin.</p></div>'
  +'</div>'}},

{t:'Sound Familiar?',h:function(){return '<h2>Sound Familiar?</h2>'
  +'<div class="lead">Ready-made classroom websites can be great, until they aren’t.</div>'
  +'<div class="grid g3">'
  +card('🔑','The Login Headache','Another account. Another forgotten password. Another website asking for student names.')
  +card('🧩','The Almost-Right Tool','It’s close, but it doesn’t quite fit your lesson, your students, or your standards.')
  +card('🚧','The Locked Door','The free trial ends, or the school filter blocks the site the morning you need it.')
  +'</div>'
  +'<div class="banner"><b>What if…</b> you could make the exact tool you need in a few minutes, and it simply opened on your computer? No account. No login. No cost. And student names never leave your computer.</div>'}},

{t:'How It Works: The Genie Loop',h:function(){return '<h2>How It Works: The Genie Loop</h2>'
  +'<div class="lead">Making a tool is a conversation, not a test. It goes around and around like this:</div>'
  +'<div class="grid g4 loop">'
  +card('💭','1. Imagine','Think of one small thing that would make your week easier.<em>“I wish I had a fair way to call on students.”</em>')
  +card('🪄','2. Wish','Type it into an AI chat (Gemini, ChatGPT, Copilot, or whichever one your school allows) in plain, everyday words.<em>“Make a spinning wheel that picks a name from my class list.”</em>')
  +card('👀','3. Try','The AI builds it. Open it and click around like a student would.<em>“It works! But it picked the same kid twice.”</em>')
  +card('🔁','4. Tweak','Tell the AI what to change, then try again. Repeat as often as you like.<em>“Take each name off the wheel after it’s picked.”</em>')
  +'</div>'
  +'<div class="banner">You don’t need the perfect wish. <b>You just need a first wish.</b> Most good tools get there one small tweak at a time.</div>'}},

{t:'Watch a Wish Grow',h:function(){return '<h2>Watch a Wish Grow</h2>'
  +'<div class="lead">Here’s what a typical conversation looks like (shortened a bit).</div>'
  +'<div class="chat">'
  +bubble('you','Make a spinning wheel that picks a random name from a class list I paste in.')
  +bubble('genie','Here’s your wheel! Paste your names in the box and click Spin.','<span class="chip">📄 spin-wheel.html</span>')
  +bubble('you','Love it! But it picked Jordan twice in a row. Can you take each name off after it’s picked?')
  +bubble('genie','Done! Picked names now come off the wheel. I added an Undo button too, just in case.','<span class="chip">📄 spin-wheel.html (version 2)</span>')
  +bubble('you','Can it make a ticking sound while it spins? And use brighter colors?')
  +bubble('genie','Ticking sound and brighter colors added. Spin away!','<span class="chip">📄 spin-wheel.html (version 3)</span>')
  +'</div>'
  +'<div class="banner banner-row"><span><b>Three plain-English messages. Zero code.</b> That’s the whole skill.</span>'
  +'<a class="btn" href="Example_1/WheelPicker.html" target="_blank" rel="noopener">🎡 Try a finished wheel</a></div>'}},

{t:'The Cave of Wonders',h:function(){return '<h2>The Cave of Wonders</h2>'
  +'<div class="lead">Twelve real tools, each one made by describing it to AI. The top two rows are for every teacher.</div>'
  +'<div class="cave-wrap static">'+caveHTML()+'</div>'}},

{t:'Three Wishes to Make Every Time',h:function(){return '<h2>Three Wishes to Make Every Time</h2>'
  +'<div class="lead">Add these to every wish, and your tools will be easy to keep, hard to block, and safe for students.</div>'
  +'<div class="grid g2">'
  +card('📄','“Put everything in one file.”','One file is easy to save, email, and open later, just like a document. Double-click it and it opens.')
  +card('📴','“Don’t use anything from the internet.”','The school filter has nothing to block, and your tool still works when the Wi-Fi doesn’t.')
  +card('🔒','“Keep what I type private on my computer.”','Class lists and scores you type into the finished tool stay right on your computer.')
  +card('🙈','And one rule for you: keep real names out of the AI chat.','The chat is where you <em>describe</em> the tool. Add your real class list later, inside the finished tool.','you-rule')
  +'</div>'
  +'<div class="banner">Don’t memorize these. They’re already built into the copy-and-paste wish starter on the next slide.</div>'}},

{t:'Your Wish Starter',h:function(){return '<h2>Your Wish Starter</h2>'
  +'<div class="lead">Fill in the blanks, paste it into your AI chat, and you’ve made your first wish.</div>'
  +'<div class="grid g2">'
  +'<div class="card starter">'
  +'<div class="part"><span class="pill aud">1 · Who it’s for</span><p>Make a tool for my <mark>[grade] [subject]</mark> students.</p></div>'
  +'<div class="part"><span class="pill task">2 · What happens on screen</span><p><mark>[Describe what students see, what they click, and what happens when they do.]</mark></p></div>'
  +'<div class="part"><span class="pill guard">3 · The safety line (same every time)</span><p>'+SAFETY+'</p></div>'
  +'<button class="btn" data-copy="formula">📋 Copy the wish starter</button>'
  +'</div>'
  +'<div class="card example"><span class="pill">Here’s one filled in</span>'
  +'<p>Make a tool for my <b>1st grade reading</b> students. <b>Show a word with one letter missing and three letter buttons underneath. When a student clicks the right letter, the word fills in and a happy sound plays. If they pick the wrong one, the button gives a gentle wiggle so they can try again.</b></p>'
  +'<p class="dim">+ the safety line</p></div>'
  +'</div>'
  +'<div class="banner"><b>Try it right now:</b> copy the starter (or borrow a wish from the next slide), paste it into your AI chat, and press Enter. While it works, we’ll look at how to see it and save it.</div>'}},

{t:'Borrow a Wish',h:function(){return '<h2>Borrow a Wish</h2>'
  +'<div class="lead">Not sure where to start? Copy one of these, paste it into your AI chat, then make it your own. The safety line is added for you when you copy.</div>'
  +'<div class="grid g3 wishbank static">'
  +WISHES.map(function(w){
    return '<div class="card wish"><span class="pill">'+w[0]+'</span><p>'+w[1]+'</p>'
      +'<button class="btn alt" data-copytxt="'+encodeURIComponent(w[1]+'\n\n'+SAFETY)+'">📋 Copy this wish</button></div>';
  }).join('')
  +'</div>'}},

{t:'See It & Save It',h:function(){return '<h2>See It &amp; Save It</h2>'
  +'<div class="lead">The AI will hand you a block of code. You don’t need to read it. Just copy, paste, and look.</div>'
  +'<div class="grid g3 steps">'
  +card('📋','1. Copy','In your AI chat, find the code box and click its <b>Copy</b> button. No need to highlight anything.')
  +card('▶️','2. Paste &amp; look','Paste it into the box below and click <b>Show Me</b>. Your tool appears on the right.')
  +card('💾','3. Save','Like it? Click <b>Save My Tool</b>. You’ll get a file you can double-click anytime, even offline.')
  +'</div>'
  +'<div class="sandbox static">'
  +'<div class="sb-left"><label for="sb-code" class="sb-label">Paste your code here</label>'
  +'<textarea id="sb-code" spellcheck="false" placeholder="Click here, then press Ctrl+V (Windows) or Cmd+V (Mac)"></textarea>'
  +'<div class="sb-row"><label for="sb-name">Name your tool:</label><input id="sb-name" value="my-classroom-tool" autocomplete="off"><span class="dim">.html</span></div>'
  +'<div class="sb-row"><button class="btn" id="sb-run">▶ Show Me</button><button class="btn" id="sb-save">💾 Save My Tool</button><button class="btn alt" id="sb-clear">Clear</button></div></div>'
  +'<div class="sb-right"><span class="sb-label">Your tool</span><iframe id="sb-frame" title="Preview of your tool" sandbox="allow-scripts allow-modals allow-forms allow-popups allow-downloads"></iframe></div>'
  +'</div>'
  +'<div class="tip">💡 <b>Shortcut:</b> many AI chats can show your tool right inside the chat. Look for a <b>Preview</b>, <b>Canvas</b>, or <b>Artifact</b> button.</div>'
  +'<details class="planb static"><summary>No preview box handy? Here’s the Notepad way.</summary><ol>'
  +'<li>Open <b>Notepad</b> (Windows) or <b>TextEdit</b> (Mac). On a Mac, first choose <b>Format → Make Plain Text</b>.</li>'
  +'<li>Paste the code.</li>'
  +'<li>Save it with a name that ends in <b>.html</b>, like <b>quiz.html</b>. In Notepad, set “Save as type” to <b>All files</b> so it doesn’t turn into quiz.html.txt.</li>'
  +'<li>Double-click the saved file. It opens in your web browser.</li></ol></details>'},init:sandboxInit},

{t:'Magic Words for Tweaking',h:function(){return '<h2>Magic Words for Tweaking</h2>'
  +'<div class="lead">Your first version is a rough draft. Talk to the AI like a helpful colleague: say what you see, and what you’d like instead.</div>'
  +'<div class="grid g2">'
  +phrases('🎨','Make it look right',['“Make the words big enough to read on a shared screen.”','“Use bright, cheerful colors.”','“Make it calm and simple, with less on the screen.”'])
  +phrases('🖱️','Make it easier to use',['“Add a Start Over button.”','“Add a mute button.”','“Make the buttons bigger for little hands.”'])
  +phrases('♻️','Make it reusable',['“Let me paste in my own list of words.”','“Add buttons to save my setup to a file and load it again later.”'])
  +phrases('🛠️','When something’s not working',['“When I click Spin, nothing happens. Please fix it.”','“The words run off the edge of the screen.”','Still stuck? “Start over with a simpler version.”'])
  +'</div>'
  +'<div class="banner">Every tweak is just one more message. If a change makes things worse, say <b>“Go back to the last version.”</b></div>'}},

{t:'Tinker Time',h:function(){
  return '<div class="final-stage static">'
    +'<div class="tinker-head"><h2>Tinker Time</h2><p class="tinker-goal">Make one wish. Try it. Tweak it once. <b>That’s a win.</b></p></div>'
    +'<div class="final-timer-card">'
    +'<div class="led final-led" id="led" role="timer" aria-live="off">10:00</div>'
    +'<div class="timer-controls">'
    +'<button class="btn alt timer-btn" id="t-down" aria-label="Decrease by 1 minute" title="Decrease 1 minute">&#9660; &minus;1m</button>'
    +'<button class="btn timer-btn timer-go" id="tgo" aria-label="Play or pause timer">Play</button>'
    +'<button class="btn alt timer-btn" id="trs" aria-label="Reset timer">Reset</button>'
    +'<button class="btn alt timer-btn" id="t-up" aria-label="Increase by 1 minute" title="Increase 1 minute">&#9650; +1m</button>'
    +'</div>'
    +'</div>'
    +'<div class="music-player-card" aria-label="Music Player">'
    +'<div class="music-info">'
    +'<span class="music-icon" aria-hidden="true">&#9835;</span>'
    +'<span class="music-title" id="m-title" title="Current track">Ambient Focus</span>'
    +'<span class="music-loop-badge" title="Playing on loop">&#128257; Loop</span>'
    +'</div>'
    +'<div class="music-controls">'
    +'<button class="m-ctrl-btn" id="m-prev" aria-label="Previous track" title="Previous track">&#9198;</button>'
    +'<button class="m-ctrl-btn m-play-btn" id="m-play" aria-label="Play or pause music" title="Play / Pause">&#9658;</button>'
    +'<button class="m-ctrl-btn" id="m-next" aria-label="Next track" title="Next track">&#9197;</button>'
    +'<div class="music-vol-group">'
    +'<button class="m-ctrl-btn m-mute-btn" id="m-mute" aria-label="Mute / unmute music" title="Mute">&#128266;</button>'
    +'<input type="range" class="vol-slider" id="m-vol" min="0" max="1" step="0.05" value="0.7" aria-label="Volume slider">'
    +'</div>'
    +'</div>'
    +'</div>'
    +'<div class="final-actions-row">'
    +'<button class="btn rounded-action-btn" id="btn-padlet">Ideas Padlet</button>'
    +'<button class="btn alt rounded-action-btn" id="btn-survey">Feedback Survey</button>'
    +'</div>'
    +'</div>';
},init:timerInit}
];
var CAVE_SLIDE=1;
SLIDES.forEach(function(s,i){if(s.t==='The Cave of Wonders')CAVE_SLIDE=i+1});

/* ---------- See It & Save It: paste-and-preview box ---------- */
var SB_EMPTY='<!DOCTYPE html><meta charset="utf-8"><body style="margin:0;height:100vh;display:grid;place-items:center;font:18px system-ui,sans-serif;color:#94a3b8;background:#0b0d18;text-align:center;padding:1rem">Your tool will appear here ✨</body>';
function cleanCode(c){
  // AI chats sometimes include the ``` fences around code; remove them.
  return (c||'').trim().replace(/^```[a-zA-Z]*\s*\n?/,'').replace(/\n?```\s*$/,'').trim();
}
function sandboxInit(){
  var ta=$('#sb-code'),fr=$('#sb-frame'),nm=$('#sb-name');
  if(!ta)return;
  ta.value=sbCode;
  fr.srcdoc=sbCode?cleanCode(sbCode):SB_EMPTY;
  ta.oninput=function(){sbCode=ta.value};
  $('#sb-run').onclick=function(){
    var c=cleanCode(ta.value);
    if(!c){toast('Paste your code into the box first');ta.focus();return}
    fr.srcdoc=c;
  };
  $('#sb-save').onclick=function(){
    var c=cleanCode(ta.value);
    if(!c){toast('Paste your code into the box first');ta.focus();return}
    var n=(nm.value||'').trim().replace(/\.html?$/i,'').replace(/[^\w\- ]+/g,'').replace(/\s+/g,'-')||'my-classroom-tool';
    saveFile(c,n+'.html','text/html;charset=utf-8');
  };
  $('#sb-clear').onclick=function(){ta.value='';sbCode='';fr.srcdoc=SB_EMPTY;ta.focus()};
}

/* ---------- Timer & Music Player ---------- */
var tm={left:600,base:600,run:0,id:null};
function fmt(s){
  if(s<0)s=0;
  return ('0'+Math.floor(s/60)).slice(-2)+':'+('0'+s%60).slice(-2);
}
function chime(){
  try{
    var c=new (window.AudioContext||window.webkitAudioContext)();
    [523.25,659.25,783.99,1046.5].forEach(function(f,i){
      var o=c.createOscillator(),g=c.createGain();
      o.type='sine';o.frequency.value=f;
      o.connect(g);g.connect(c.destination);
      var t=c.currentTime+i*.18;
      g.gain.setValueAtTime(0,t);
      g.gain.linearRampToValueAtTime(.25,t+.03);
      g.gain.exponentialRampToValueAtTime(.001,t+1.6);
      o.start(t);o.stop(t+1.7);
    });
  }catch(e){}
}

/* Music files located in \music folder */
var MUSIC_PLAYLIST=[
  {title:'Ambient Focus',file:'music/Ambient_Focus.mp3'},
  {title:'Upbeat Flow',file:'music/Upbeat_Flow.mp3'},
  {title:'Gentle Chords',file:'music/Gentle_Chords.mp3'},
  {title:'Lofi Pause',file:'music/Lofi_Pause.mp3'},
  {title:'Retro Arcade',file:'music/Retro_Arcade.mp3'}
];

var musicAudio=null;
var musicState={
  idx:0,
  isPlaying:false,
  volume:0.7,
  isMuted:false
};

function getAudio(){
  if(!musicAudio){
    musicAudio=new Audio();
    musicAudio.loop=true;
    musicAudio.volume=musicState.volume;
    musicAudio.muted=musicState.isMuted;
    musicAudio.addEventListener('ended',function(){
      musicAudio.currentTime=0;
      musicAudio.play().catch(function(){});
    });
  }
  return musicAudio;
}

function updateMusicUI(){
  var titleEl=$('#m-title');
  var playBtn=$('#m-play');
  var muteBtn=$('#m-mute');
  var volSlider=$('#m-vol');

  if(titleEl&&MUSIC_PLAYLIST[musicState.idx]){
    titleEl.textContent=MUSIC_PLAYLIST[musicState.idx].title;
  }
  if(playBtn){
    playBtn.innerHTML=musicState.isPlaying?'&#10074;&#10074;':'&#9658;';
    playBtn.setAttribute('title',musicState.isPlaying?'Pause song':'Play song');
  }
  if(muteBtn){
    var isM=musicState.isMuted||musicState.volume===0;
    muteBtn.innerHTML=isM?'&#128263;':(musicState.volume<.5?'&#128265;':'&#128266;');
    muteBtn.setAttribute('title',isM?'Unmute':'Mute');
  }
  if(volSlider){
    volSlider.value=musicState.volume;
  }
}

function loadTrack(idx,autoPlay){
  musicState.idx=(idx+MUSIC_PLAYLIST.length)%MUSIC_PLAYLIST.length;
  var audio=getAudio();
  audio.src=MUSIC_PLAYLIST[musicState.idx].file;
  audio.loop=true;
  if(autoPlay){
    var p=audio.play();
    if(p&&p.then){
      p.then(function(){
        musicState.isPlaying=true;
        updateMusicUI();
      }).catch(function(e){
        musicState.isPlaying=false;
        updateMusicUI();
      });
    }
  }else{
    updateMusicUI();
  }
}

function toggleMusicPlay(){
  var audio=getAudio();
  if(!audio.src||audio.src===''||audio.src===window.location.href){
    loadTrack(musicState.idx,true);
    return;
  }
  if(audio.paused){
    var p=audio.play();
    if(p&&p.then){
      p.then(function(){
        musicState.isPlaying=true;
        updateMusicUI();
      }).catch(function(){});
    }
  }else{
    audio.pause();
    musicState.isPlaying=false;
    updateMusicUI();
  }
}

function prevTrack(){
  var wasPlaying=musicState.isPlaying;
  loadTrack(musicState.idx-1,wasPlaying);
}

function nextTrack(){
  var wasPlaying=musicState.isPlaying;
  loadTrack(musicState.idx+1,wasPlaying);
}

function toggleMute(){
  var audio=getAudio();
  musicState.isMuted=!musicState.isMuted;
  audio.muted=musicState.isMuted;
  updateMusicUI();
}

function setVolume(val){
  var audio=getAudio();
  musicState.volume=val;
  audio.volume=val;
  if(val>0&&musicState.isMuted){
    musicState.isMuted=false;
    audio.muted=false;
  }
  updateMusicUI();
}

function stepMinute(direction){
  var s=tm.left;
  var target;
  if(direction>0){
    target=Math.floor(s/60)*60+60;
    if(target>5940)target=5940;
  }else{
    target=Math.ceil(s/60)*60-60;
    if(target<60)target=60;
  }
  tm.left=target;
  tm.base=target;
  var led=$('#led');
  if(led)led.textContent=fmt(tm.left);
}

function timerInit(){
  var led=$('#led'),go=$('#tgo');
  function draw(){if(led)led.textContent=fmt(tm.left)}
  function stop(){clearInterval(tm.id);tm.run=0;if(go)go.textContent='Play'}
  function setT(s){stop();tm.left=s;tm.base=s;draw()}
  tm.base=tm.base||600;draw();

  var upBtn=$('#t-up');
  if(upBtn)upBtn.onclick=function(){stepMinute(1)};

  var downBtn=$('#t-down');
  if(downBtn)downBtn.onclick=function(){stepMinute(-1)};

  var rsBtn=$('#trs');
  if(rsBtn)rsBtn.onclick=function(){setT(tm.base)};

  if(go){
    go.onclick=function(){
      if(tm.run){stop();return}
      if(tm.left<=0)tm.left=tm.base;
      tm.run=1;go.textContent='Pause';
      tm.id=setInterval(function(){
        tm.left--;draw();
        if(tm.left<=0){stop();chime();toast('Time is up!')}
      },1000);
    };
  }

  // Music Player bindings
  var mPrev=$('#m-prev'),mPlay=$('#m-play'),mNext=$('#m-next'),mMute=$('#m-mute'),mVol=$('#m-vol');
  if(mPrev)mPrev.onclick=function(){prevTrack()};
  if(mPlay)mPlay.onclick=function(){toggleMusicPlay()};
  if(mNext)mNext.onclick=function(){nextTrack()};
  if(mMute)mMute.onclick=function(){toggleMute()};
  if(mVol){
    mVol.oninput=function(e){setVolume(+e.target.value)};
  }

  // Bottom action buttons
  var padletBtn=$('#btn-padlet');
  if(padletBtn)padletBtn.onclick=function(e){
    e.preventDefault();
    toast('Ideas Padlet: Link coming soon');
  };

  var surveyBtn=$('#btn-survey');
  if(surveyBtn)surveyBtn.onclick=function(e){
    e.preventDefault();
    toast('Feedback Survey: Link coming soon');
  };

  updateMusicUI();
}

/* ---------- Views ---------- */
function slideView(n,full){
  if(n!==SLIDES.length&&musicAudio&&!musicAudio.paused){
    musicAudio.pause();
    musicState.isPlaying=false;
    updateMusicUI();
  }
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
  var g=e.target.closest('[data-i]');if(g&&g.classList.contains('gem')){openModal(+g.dataset.i);return}
  var cl=e.target.closest('[data-close]');if(cl){closeModal();return}
  var mt=e.target.closest('[data-mtab]');
  if(mt){
    var tabId=mt.dataset.mtab,dlg=mt.closest('.mdlg');
    if(dlg){
      dlg.querySelectorAll('.mtab').forEach(function(b){b.classList.toggle('active',b===mt)});
      dlg.querySelectorAll('.mpane').forEach(function(p){p.classList.toggle('active',p.id==='mpane-'+tabId)});
      
    }
    return;
  }
  var cp=e.target.closest('[data-copyprompt]');
  if(cp){
    var idx=+cp.dataset.copyprompt;
    if(TREASURES[idx]&&TREASURES[idx].prompt){
      copy(TREASURES[idx].prompt);
      toast('✓ Prompt copied to clipboard!');
    }
    return;
  }
  var sp=e.target.closest('[data-saveprompt]');
  if(sp){
    var idx=+sp.dataset.saveprompt;
    var tr=TREASURES[idx];
    if(tr&&tr.prompt){
      saveTextFile(tr.prompt, tr.name.replace(/[^a-zA-Z0-9_-]/g,'_')+'_Prompt.txt');
    }
    return;
  }
  var clsn=e.target.closest('[data-copylesson]');
  if(clsn){
    var idx=+clsn.dataset.copylesson;
    var tr=TREASURES[idx];
    if(tr&&tr.lessonMd){
      copy(tr.lessonMd);
      toast('✓ Lesson copied to clipboard!');
    }
    return;
  }
  var slsn=e.target.closest('[data-savelesson]');
  if(slsn){
    var idx=+slsn.dataset.savelesson;
    var tr=TREASURES[idx];
    if(tr&&tr.lessonMd){
      saveTextFile(tr.lessonMd, tr.name.replace(/[^a-zA-Z0-9_-]/g,'_')+'_Lesson.md');
    }
    return;
  }
  var sf=e.target.closest('[data-savefiles]');
  if(sf){
    var idx=+sf.dataset.savefiles;
    var tr=TREASURES[idx];
    if(tr){
      toast('✓ Downloading ' + (tr.downloadName || 'file(s)'));
    }
    return;
  }
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
