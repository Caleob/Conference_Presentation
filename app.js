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
function saveTextFile(txt, filename){
  var b = new Blob([txt], {type: 'text/plain;charset=utf-8'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(b);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(function(){ URL.revokeObjectURL(a.href); }, 1500);
  toast('✓ ' + filename + ' downloaded');
}

/* ---------- Cave of Wonders: treasure data ---------- */
var TREASURES = [
  {
    "level": "Level 1: Foundations",
    "name": "EduSpin Wheel Picker",
    "short": "Random student & pair picker",
    "desc": "A colorful spinning wheel for random student calls, or two wheels side by side for compare-and-contrast pairing. Names can be removed after picking, and the roster never leaves your computer.",
    "lessonTitle": "The Browser Engine & Self-Contained Files",
    "file": "Example_1/WheelPicker.html",
    "promptFile": "Example_1/Prompt.txt",
    "lessonFile": "Example_1/Lesson.md",
    "readmeFile": "Example_1/README.md",
    "downloadFile": "Example_1/EduSpin_Wheel_Picker.zip",
    "downloadName": "EduSpin_Wheel_Picker.zip",
    "prompt": "Act as an expert educational front-end developer. Build a safe, versatile, single-file HTML/CSS/JavaScript web app featuring a dynamic wheel picker system that supports either a single wheel (for student picking or quick draws) or two side-by-side wheels (for compare/contrast discussions and pairings).\n\nStrict Technical Guardrails:\n1. Zero Dependencies: Use pure vanilla JavaScript and standard HTML5 Canvas only. Do not reference external CDNs, frameworks, stylesheets, remote fonts, or external image/audio files.\n2. Self-Contained Output: Return all HTML, CSS, and JavaScript in one continuous code block inside a single file.\n\nInterface & Setup Panel:\n- Design a modern, distraction-free, high-contrast dark theme optimized for virtual screen sharing.\n- At the top, include a collapsible \"Setup & Settings\" drawer:\n  * Mode Selector Toggle: \"Single Wheel\" vs. \"Dual Wheels\". Switching modes dynamically toggles the visible inputs and display layout.\n  * In \"Single Wheel\" mode: Show one <textarea> for List 1 (e.g., student roster or prompt bank).\n  * In \"Dual Wheels\" mode: Show two side-by-side <textareas> for List 1 and List 2 (e.g., Vocab Set A vs. Set B, or Students vs. Tasks).\n  * Options: A checkbox for \"Remove selected item(s) after spin\" (default: checked).\n  * An \"Update Wheels\" button to parse lists and refresh the canvas.\n\nWheel & Canvas Behavior:\n- Main Display:\n  * Single Wheel Mode: Centered large canvas with a fixed indicator arrow at the top and a prominent \"Spin Wheel\" button.\n  * Dual Wheels Mode: Two equal-sized side-by-side canvases (\"Wheel 1\" and \"Wheel 2\"), each with its own top indicator arrow and distinct header, controlled by a shared \"Spin Both Wheels\" button.\n- Parsing & Sanitization:\n  * When \"Update Wheels\" is clicked, clean each list (strip empty lines, trim extra whitespace, eliminate internal duplicates).\n  * Dynamically calculate slice angles (2π / N) for each wheel. Render alternating, vibrant, high-contrast slice colors with clean, radially rotated text labels centered in each slice.\n- Spin Physics & Fair Removal:\n  * Spinning must use realistic deceleration (physics easing) with randomized duration and rotation velocity.\n  * In Dual Wheel mode, ensure both wheels spin independently and never land on identical items if the two lists share terms.\n  * If \"Remove selected item after spin\" is active: When a wheel lands on an item, remove that winning item from that wheel's active pool. Crucially, if that same item exists in the other wheel's active list, remove it from there as well so it cannot appear again in either wheel. Update both wheels immediately.\n\nAudio & Result Reveal:\n- Web Audio Synthesis: Use the native browser Web Audio API to procedurally generate a subtle, mechanical tick as slices pass the top pointer, and a pleasant completion chime when the wheel(s) stop.\n- Dynamic Result Banner:\n  * Single Wheel: Display \"Selected: [Winning Item]\" with an option to manually undo removal if needed.\n  * Dual Wheels: Display \"Compare & Contrast: Identify one critical similarity and one fundamental difference between [Item 1] and [Item 2].\"",
    "lessonMd": "# Lesson 1: The Browser Engine & Self-Contained Files\n\n### 1. The Browser is an App Player (Not Just an Internet Window)\n* A web browser (Chrome, Edge, Safari) is not just a viewer for websites—it is a powerful, offline software player already installed on your computer.\n* HTML (`.html`) files are simply documents that tell this player what to display and run.\n* **Built-in Security & Privacy:** Opening a local `.html` file stored on your computer runs entirely in your machine's private memory. No student data, rosters, or inputs ever leave your computer or touch an outside cloud server.\n\n### 2. Keep Everything Self-Contained\n* Professional websites usually pull images, sounds, and fonts from dozens of different servers across the web.\n* External links can break, get blocked by school district firewalls, or fail when Wi-Fi drops.\n* For our early tools, we prompt the AI to make everything 100% self-contained inside one single file:\n  * **Visuals:** Drawn with code (HTML5 Canvas or SVG).\n  * **Sounds:** Generated on the fly by your computer's audio chip (Web Audio API).",
    "lessonHTML": "<h3>Lesson 1: The Browser Engine &amp; Self-Contained Files</h3><h5>1. The Browser is an App Player (Not Just an Internet Window)</h5><ul><li>A web browser (Chrome, Edge, Safari) is not just a viewer for websites—it is a powerful, offline software player already installed on your computer.</li><li>HTML (<code>.html</code>) files are simply documents that tell this player what to display and run.</li><li><strong>Built-in Security &amp; Privacy:</strong> Opening a local <code>.html</code> file stored on your computer runs entirely in your machine's private memory. No student data, rosters, or inputs ever leave your computer or touch an outside cloud server.</li></ul><h5>2. Keep Everything Self-Contained</h5><ul><li>Professional websites usually pull images, sounds, and fonts from dozens of different servers across the web.</li><li>External links can break, get blocked by school district firewalls, or fail when Wi-Fi drops.</li><li>For our early tools, we prompt the AI to make everything 100% self-contained inside one single file:</li><li><strong>Visuals:</strong> Drawn with code (HTML5 Canvas or SVG).</li><li><strong>Sounds:</strong> Generated on the fly by your computer's audio chip (Web Audio API).</li></ul>",
    "readmeHTML": "<h3>Example 1: EduSpin Wheel Picker</h3><h4>What is this app?</h4><p>This is a fun, colorful digital spinning wheel that runs right inside your internet browser. You can use it as a single wheel to pick one thing at random, or put two wheels side-by-side to pair things up or compare ideas.</p><h4>How to use it in a virtual K-12 classroom</h4><ul><li><strong>Random Student Caller:</strong> Paste your student roster into the wheel. When it is time to answer questions or read aloud, give it a spin. The exciting tick sounds and visual spin keep every student watching their screen.</li><li><strong>Fair Turns:</strong> Turn on the setting to remove names after they are picked so nobody gets picked twice in a row.</li><li><strong>Side-by-Side Compare &amp; Contrast:</strong> Put historical figures on Wheel 1 and scientific events on Wheel 2, or characters on one and story conflicts on the other. Spin both and have students explain how the two items connect.</li><li><strong>100% Student Privacy:</strong> You do not need to create an account, log in, or upload student names to the cloud. Your class roster stays safely on your own computer.</li></ul>"
  },
  {
    "level": "Level 2: Evolution",
    "name": "FeedbackFlow",
    "short": "Click-to-build grading feedback assistant",
    "desc": "A point-and-click rubric tool that turns clicks into a warm feedback paragraph, with an optional score summary. Demonstrates evolving a prototype into an advanced version via conversational prompting.",
    "lessonTitle": "Iterative Prompting & Local Data",
    "file": "Example_2/FeedbackFlow_2.html",
    "promptFile": "Example_2/Prompt.txt",
    "lessonFile": "Example_2/Lesson.md",
    "readmeFile": "Example_2/README.md",
    "downloadFile": "Example_2/FeedbackFlow.zip",
    "downloadName": "FeedbackFlow.zip",
    "prompt": "Act as an expert educational productivity tool developer. Build a flexible, safe, single-file HTML/CSS/JavaScript web application that turns rubric tier selections and quick-insert buttons into a cohesive, professional feedback paragraph for grading virtual student submissions.\n\nStrict Technical Guardrails:\n1. Zero Dependencies: Use vanilla JavaScript and standard browser DOM APIs only. No external CSS frameworks, CDN scripts, fonts, or server calls.\n2. Complete Standalone File: Deliver everything in a single, continuous code block containing all HTML, CSS, and JS.\n3. Zero-PII by Design: Do not store or ask for student names or IDs. The tool operates strictly as an in-memory text synthesizer.\n\nInterface & Workflow Layout:\n- Visual Design: Clean, high-contrast, modern layout optimized for split-screen grading next to an LMS or gradebook.\n- Configuration Panel (Collapsible Drawer):\n  * Dynamic Rubric Builder: Allow the teacher to add, edit, or delete rubric criteria (e.g., \"Thesis\", \"Evidence\", \"Conventions\"). For each criterion, provide editable feedback text fields corresponding to proficiency levels (0, 1, 2, 3, and 4).\n  * Quick-Insert / Hot-Key Button Manager: Allow teachers to add custom one-click phrase buttons (e.g., \"Wrong assignment submitted\", \"Resubmit by Friday\", or teacher contact info/office hours). Each item has a button label and the corresponding text snippet it injects.\n  * Template Import / Export: Provide two buttons:\n    - \"Export Configuration (.json)\": Downloads the active rubric criteria, tier statements, and quick-insert buttons as a local JSON file.\n    - \"Import Configuration (.json)\": Allows uploading a previously saved JSON file to instantly restore all categories and custom snippets without retyping.\n- Daily Grading Interface (Main View):\n  * Criteria Selectors: Render each configured rubric category with interactive radio buttons or slider steps for levels 0 through 4. Selecting a tier highlights the choice and updates the text generator immediately.\n  * Quick-Insert Action Bar: Display the custom hot-key buttons in a visible toolbar above the feedback box. Clicking a button appends that pre-set phrase directly to the feedback output.\n  * Live Feedback Preview Box: A dynamic <textarea> showing the assembled, polished feedback paragraph in real time. The teacher can directly edit or type in this box if manual personalization is needed.\n  * Copy Actions: A prominent, primary \"Copy Feedback to Clipboard\" button with temporary visual confirmation (e.g., green checkmark / \"Copied!\"), plus a \"Reset / Clear Form\" button to prep for the next submission.\n\nBehavior & Text Assembly Logic:\n- As the teacher clicks tier ratings, the app joins the active tier phrases into a smooth, natural narrative with appropriate spacing and punctuation.\n- If a criterion is left unselected, simply skip it without breaking or displaying \"undefined\".\n- Quick-insert snippets append to the end of the text as distinct sentences.\n\n**Refinement Prompt**\n0-4 for a score is a good default but I want the flexibility to grade 0-6 on a criterion or give a 0/2/4/6/8 score...\n\nIn the  Rubric & Snippet Configuration maybe include a \"Score\" input field next to the level (initially showing 0,1,2,3, and 4 and then include an option to add level or remove level. I'm not sure how to handle the word descriptor (i.e . emerging, developing, etc) maybe make that editable as well? Add this increased flexibility to the tool.\nAlso allow the user to select \"Include score in text\". Do not add the score inline add a rubric summary at the end that looks like this:\n\nScore 10/12\n------\nThesis        3/4\nStyle           4/4\nEvidence   3/4",
    "lessonMd": "# Lesson 2: Iterative Prompting & Local Data\n\n### 1. Build in Versions (Start Simple)\n* You do not need to design the final, perfect tool in your first prompt.\n* Get to a useful tool that feels right fast, then ask for improvements.\n\n### 2. Prompt for Cause and Effect (Not Code Words)\n* Some jargon is helpful, but you can go a long way describing cause and effect in your own words.\n* Be detailed, clear, and specific about what you want to see and how it should act on-screen.\n\n### 3. Local Data Portability (Saving Without an Account)\n* There is no cloud database or login—YOU need to handle saving if you don't want to start from scratch.\n* Ask for an import/export set of buttons.\n* Use TXT, CSV, or JSON as a way to save data between tool uses.",
    "lessonHTML": "<h3>Lesson 2: Iterative Prompting &amp; Local Data</h3><h5>1. Build in Versions (Start Simple)</h5><ul><li>You do not need to design the final, perfect tool in your first prompt.</li><li>Get to a useful tool that feels right fast, then ask for improvements.</li></ul><h5>2. Prompt for Cause and Effect (Not Code Words)</h5><ul><li>Some jargon is helpful, but you can go a long way describing cause and effect in your own words.</li><li>Be detailed, clear, and specific about what you want to see and how it should act on-screen.</li></ul><h5>3. Local Data Portability (Saving Without an Account)</h5><ul><li>There is no cloud database or login—YOU need to handle saving if you don't want to start from scratch.</li><li>Ask for an import/export set of buttons.</li><li>Use TXT, CSV, or JSON as a way to save data between tool uses.</li></ul>",
    "readmeHTML": "<h3>Example 2: FeedbackFlow (Grading Feedback Builder)</h3><h4>What is this app?</h4><p>This is a point-and-click grading assistant. Instead of typing the same comments over and over on 80 student papers, you click buttons for the grade levels and pre-set comments you want. The app instantly turns your clicks into a warm, complete paragraph of feedback that you can copy and paste with one touch.</p><h4>How to use it in a virtual K-12 classroom</h4><ul><li><strong>Speed Up Grading Without Sounding Like a Robot:</strong> Keep this open on half of your screen while viewing student work on the other half. Click through criteria like &quot;Main Idea&quot;, &quot;Evidence&quot;, or &quot;Grammar&quot;, and watch a smooth paragraph form right before your eyes.</li><li><strong>Quick Common Notes:</strong> Add quick one-click buttons for phrases you use all the time, such as &quot;Please check office hours for help&quot; or &quot;Remember to cite two sources.&quot;</li><li><strong>Grade Summary Included:</strong> The updated version can automatically calculate scores (like 10/12) and attach a tidy breakdown at the end of the note.</li><li><strong>Save Your Rubrics:</strong> You can save your rubric to a small backup file on your computer and open it again whenever that assignment comes around next term.</li></ul>"
  },
  {
    "level": "Level 3: Physics & Loops",
    "name": "Elastic Timeline",
    "short": "Kinesthetic chronology ordering game",
    "desc": "Floating cards drag onto a timeline bar with tactile physics and glow green or yellow to show correct and misplaced events, with celebratory confetti on a full solve.",
    "lessonTitle": "Tactile Physics & Gentle Game Loops",
    "file": "Example_3/Elastic_Timeline.html",
    "promptFile": "Example_3/Prompt.txt",
    "lessonFile": "Example_3/Lesson.md",
    "readmeFile": "Example_3/README.md",
    "downloadFile": "Example_3/Elastic_Timeline.zip",
    "downloadName": "Elastic_Timeline.zip",
    "prompt": "Create a complete, single-file HTML web application (HTML, CSS, and JS combined in one file) for a teacher-facing, interactive timeline ordering activity designed for screen sharing.\r\n\r\n### 1. Visual & UI Architecture\r\n- Dark/Modern EdTech Aesthetic: Slate/Navy dark background (#0f172a), high contrast typography, crisp rounded cards with soft shadows, and clean glassmorphism accents.\r\n- Top Header: Includes the app title (\"Elastic Timeline\"), a \"Pasting / Setup\" modal button (gear icon or \"Edit List\"), a prominent \"Check Timeline\" button, and a \"Reset\" button.\r\n- Setup Modal: \r\n  - Opens cleanly as an overlay/modal with a backdrop blur; must NOT take up permanent screen real estate.\r\n  - Contains a large textarea where the teacher pastes line-separated events in correct chronological order (1 per line).\r\n  - A \"Load Activity\" button that parses the text, assigns 1-based original index IDs, clears the timeline, and spawns the cards in the floating dock.\r\n  - Automatically loads a default sample dataset on first visit (e.g., 5-6 historical or narrative events).\r\n\r\n### 2. Floating Bottom Dock (Unplaced Pool)\r\n- Occupies the bottom 35% of the screen.\r\n- Unplaced cards float gently with subtle, continuous CSS drifting/hovering physics to feel alive and playful.\r\n- Dragging a card out of the floating dock pauses its floating animation and makes it draggable.\r\n\r\n### 3. Elastic Top Timeline Rail\r\n- Occupies the top/middle 60% of the screen.\r\n- Features a central horizontal line (the timeline stem).\r\n- Elastic Insertion & Dynamic Spacing: When dragging a card over the timeline, adjacent attached cards fluidly slide left and right (using dynamic CSS transforms or FLIP transitions) to clear a space. Dropping the card inserts it at that exact relative position and recalibrates horizontal spacing evenly across the rail.\r\n- Vertical Staggering / Magnetic Offset (Anti-Collision):\r\n  - Long event text must never overlap horizontally adjacent cards.\r\n  - When cards snap to the timeline, alternate their vertical positions (e.g., odd-indexed placed cards sit slightly ABOVE the rail stem, even-indexed placed cards sit slightly BELOW the rail stem) with visible vertical connecting lines attaching them to the main rail stem.\r\n  - Implement a subtle spring/magnetic snapping effect as cards approach the stem.\r\n\r\n### 4. Logic & Grading (Wordle-Style LIS Algorithm)\r\n- When the teacher/class clicks \"Check Timeline\":\r\n  - Read only the cards currently placed on the timeline stem from left to right.\r\n  - Extract their original 1-based answer indices.\r\n  - Compute the Longest Increasing Subsequence (LIS) of the placed cards.\r\n  - Apply Wordle Color Coding:\r\n    - GREEN (#22c55e background / glowing border): Cards that are part of the LIS (the correct structural backbone).\r\n    - YELLOW / AMBER (#eab308 background / glowing border): Displaced cards that break the sequence and need to be moved.\r\n    - GREY / DEFAULT: Cards left in the bottom pool remain neutral.\r\n- If all placed cards form a perfect monotonically increasing sequence and all cards from the pool are used, trigger a subtle celebration particle/confetti effect.\r\n\r\n### 5. Technical Requirements\r\n- Standard Pointer Events (PointerDown, PointerMove, PointerUp) or HTML5 Drag and Drop for butter-smooth desktop and touch/stylus operation.\r\n- Fully standalone: Zero external framework dependencies (Vanilla JavaScript, inline CSS inside `<style>`, pure HTML).\r\n- Responsive: Recalculates canvas/bounds on window resize so cards stay within bounds.\r\n- Make the code complete, production-ready, and fully contained within a single index.html file.",
    "lessonMd": "# Lesson 3: Tactile Physics & Gentle Game Loops\n\n### 1. Describe Physical Feelings (Not Math or Physics Engines)\n* You do not need to know animation code to make apps feel responsive and alive.\n* Use real-world physical metaphors in your prompts: *\"float gently like drifting on water\"*, *\"magnetic snapping\"*, and *\"slide apart to make room\"*.\n\n### 2. Borrow Proven Game Mechanics\n* Steal familiar feedback systems your students already know (like Wordle).\n* Instead of harsh \"Wrong!\" messages, ask for gentle visual cues: Green for cards in the correct sequence, Yellow for cards out of place.\n\n### 3. Build the Editor Into the Tool\n* Never hardcode one single list of questions or events into your prompt.\n* Ask for a setup modal or \"Edit List\" button where you can paste any line-separated items (history events, cell division stages, story plot points).\n* One well-prompted game engine becomes an infinite activity generator for any subject.",
    "lessonHTML": "<h3>Lesson 3: Tactile Physics &amp; Gentle Game Loops</h3><h5>1. Describe Physical Feelings (Not Math or Physics Engines)</h5><ul><li>You do not need to know animation code to make apps feel responsive and alive.</li><li>Use real-world physical metaphors in your prompts: <em>&quot;float gently like drifting on water&quot;</em>, <em>&quot;magnetic snapping&quot;</em>, and <em>&quot;slide apart to make room&quot;</em>.</li></ul><h5>2. Borrow Proven Game Mechanics</h5><ul><li>Steal familiar feedback systems your students already know (like Wordle).</li><li>Instead of harsh &quot;Wrong!&quot; messages, ask for gentle visual cues: Green for cards in the correct sequence, Yellow for cards out of place.</li></ul><h5>3. Build the Editor Into the Tool</h5><ul><li>Never hardcode one single list of questions or events into your prompt.</li><li>Ask for a setup modal or &quot;Edit List&quot; button where you can paste any line-separated items (history events, cell division stages, story plot points).</li><li>One well-prompted game engine becomes an infinite activity generator for any subject.</li></ul>",
    "readmeHTML": "<h3>Example 3: Elastic Timeline</h3><h4>What is this app?</h4><p>This is an interactive timeline game where cards float gently at the bottom of the screen. You or your students can drag and drop the cards onto a timeline bar at the top, and the cards smoothly slide apart to make room. When you click &quot;Check Timeline,&quot; the app lights up the cards to show which ones are in the right order.</p><h4>How to use it in a virtual K-12 classroom</h4><ul><li><strong>Chronology Review During Screen Shares:</strong> Share your screen during a live virtual lesson. Read the floating events aloud with the class, ask students in the chat or microphone what comes next, and drag the cards into place together.</li><li><strong>Smart Color Feedback:</strong> When you click &quot;Check Timeline,&quot; cards placed in the correct chronological story turn bright green. Cards placed out of order glow yellow so students can see where the chain broke without feeling defeated.</li><li><strong>Instant Custom Lessons:</strong> Click the &quot;Edit List&quot; button and paste any list of events in order (events from the American Revolution, plot points from a novel, or the stages of the water cycle). The app shuffles them and builds a brand-new game instantly.</li><li><strong>Celebration Confetti:</strong> When the whole sequence is solved correctly, colorful confetti bursts across the screen to celebrate student success!</li></ul>"
  },
  {
    "level": "Level 4: Remote Workflows",
    "name": "Vocabulary Codenames",
    "short": "Team review game with spymaster shortcuts",
    "desc": "A Codenames-style 4x4 word grid for Red vs. Blue vocabulary review, with one-click secret-key copying for remote breakout room leaders and teacher peek mode.",
    "lessonTitle": "Designing for Screen Sharing & Asymmetric Roles",
    "file": "Example_4/CodeNames.html",
    "promptFile": "Example_4/Prompt.txt",
    "lessonFile": "Example_4/Lesson.md",
    "readmeFile": "Example_4/README.md",
    "downloadFile": "Example_4/Vocabulary_Codenames.zip",
    "downloadName": "Vocabulary_Codenames.zip",
    "prompt": "Act as an expert educational web application developer. Build a flexible, safe, single-file HTML/CSS/JavaScript web application that turns any list of 16+ vocabulary words into an interactive 4x4 \"Codenames\" vocabulary game with instant spymaster text-export tools for virtual or hybrid classrooms.\r\n\r\n### Strict Technical Guardrails:\r\n1. Zero Dependencies: Use vanilla JavaScript and standard browser DOM APIs only. No external CSS frameworks, CDN scripts, icon libraries, fonts, or server calls.\r\n2. Complete Standalone File: Deliver everything in a single, continuous code block containing all HTML, CSS, and JS (`index.html`).\r\n3. Zero-PII & Local State: Operates entirely client-side in browser memory. Do not store or request any personal or student data.\r\n\r\n### Card Role Distribution (4x4 / 16-Tile Grid):\r\nWhen generating a new game, randomly distribute the 16 selected words into the following secret roles:\r\n- 5 Red Team Words\r\n- 5 Blue Team Words\r\n- 5 Neutral / Bystander Words\r\n- 1 Assassin Word\r\n\r\n### Core Workflow & Interface Requirements:\r\n\r\n1. Word Input & Game Setup Section:\r\n   - Textarea: Allow teachers to paste 16 or more vocabulary words (must handle newline, comma, or tab separation smoothly).\r\n   - Word Counter & Validation: Display a real-time counter of valid unique words entered.\r\n   - Smart Picker: If more than 16 words are provided, randomly select 16 words when generating the game while keeping the unused words available for a quick \"Reshuffle Board\" action.\r\n   - \"Generate Game\" and \"Reshuffle / New Game\" buttons.\r\n\r\n2. Spymaster Copy Utility (Direct Messaging Tools):\r\n   - Provide high-visibility \"One-Click Copy\" buttons that copy formatted, plain-text strings directly to the clipboard (with a temporary \"Copied!\" visual confirmation feedback) to quickly direct message spymasters in Zoom, Teams, Google Meet, or Discord:\r\n     * [Copy Red Key]: Formatted as `🔴 RED TEAM WORDS (5): Word1, Word2, Word3, Word4, Word5`\r\n     * [Copy Blue Key]: Formatted as `🔵 BLUE TEAM WORDS (5): Word1, Word2, Word3, Word4, Word5`\r\n     * [Copy Assassin]: Formatted as `💀 ASSASSIN WORD (1): Word`\r\n     * [Copy Master Key]: Formatted as a neat 4-section summary of all secret roles.\r\n\r\n3. Interactive 4x4 Game Board:\r\n   - Display a responsive 4x4 grid of large, easy-to-read cards.\r\n   - Default Player View: Cards start neutral/hidden with large, bold word text.\r\n   - Interactive Reveal: Clicking a card flips/reveals its identity with distinct color coding:\r\n     * Red Team: High-contrast red background with white text.\r\n     * Blue Team: High-contrast blue background with white text.\r\n     * Neutral: Soft gray background with strike-through text.\r\n     * Assassin: Dark charcoal/black background with white text and a clear warning indicator.\r\n   - Spymaster Peek Toggle: Include a \"Show Spymaster Color Overlays\" toggle switch that subtly colors all card borders/badges so the teacher running the board on screen-share can see all secret roles without revealing them to student players.\r\n\r\n4. UI & Visual Design:\r\n   - Modern, high-contrast visual design optimized for split-screen usage or video conference screen sharing.\r\n   - Smooth hover effects, clear focus states, and scalable typography using modern system UI fonts (`system-ui`, `sans-serif`).\r\n   - Clean structural sections with clean spacing and clear visual hierarchy.",
    "lessonMd": "# Lesson 4: Designing for Screen Sharing & Asymmetric Roles\n\n### 1. Build for Your Meeting Platform\n* Design your tools around the exact features of your video platform (Class/Zoom, Teams, Meet).\n* **Outgoing:** One-click copy buttons formatted for instant private chat with student leaders.\n* **Incoming:** Feed platform exports (poll results, chat logs, attendance CSVs) directly into your tool to instantly connect with live attendees.\n\n### 2. Design for Secrets (Teacher View vs. Student View)\n* Many classroom games require hidden information or an answer key.\n* Ask for a \"Teacher Peek\" toggle with subtle visual cues so you can manage the game without spoiling answers on screen share.\n\n### 3. Use Unicode & Emojis for Instant UI Graphics\n* You don't need custom image icons or heavy graphics packs.\n* Prompt for simple emojis and symbols (🔴, 🔵, 💀, ⚙️) to give buttons and game cards instant, colorful clarity.",
    "lessonHTML": "<h3>Lesson 4: Designing for Screen Sharing &amp; Asymmetric Roles</h3><h5>1. Build for Your Meeting Platform</h5><ul><li>Design your tools around the exact features of your video platform (Class/Zoom, Teams, Meet).</li><li><strong>Outgoing:</strong> One-click copy buttons formatted for instant private chat with student leaders.</li><li><strong>Incoming:</strong> Feed platform exports (poll results, chat logs, attendance CSVs) directly into your tool to instantly connect with live attendees.</li></ul><h5>2. Design for Secrets (Teacher View vs. Student View)</h5><ul><li>Many classroom games require hidden information or an answer key.</li><li>Ask for a &quot;Teacher Peek&quot; toggle with subtle visual cues so you can manage the game without spoiling answers on screen share.</li></ul><h5>3. Use Unicode &amp; Emojis for Instant UI Graphics</h5><ul><li>You don't need custom image icons or heavy graphics packs.</li><li>Prompt for simple emojis and symbols (🔴, 🔵, 💀, ⚙️) to give buttons and game cards instant, colorful clarity.</li></ul>",
    "readmeHTML": "<h3>Example 4: Vocabulary Codenames</h3><h4>What is this app?</h4><p>This is a classroom party-game board for reviewing vocabulary, based on the popular game Codenames. You paste in any list of 16 or more vocabulary words, and the app lays them out as cards in a 4-by-4 grid with secret team assignments hidden underneath.</p><h4>How to use it in a virtual K-12 classroom</h4><ul><li><strong>Engaging Team Review:</strong> Divide your class into a Red Team and a Blue Team during a live class or in breakout rooms.</li><li><strong>Instant Secret Keys for Student Leaders:</strong> Each team chooses a &quot;Spymaster&quot; (clue giver). With one click, the teacher can copy the secret red or blue word lists and direct-message them in Zoom, Microsoft Teams, or Google Meet. The clue-givers give one-word clues to help their team guess the right cards on your shared screen.</li><li><strong>Interactive Card Reveals:</strong> As students guess words on your screen, click each card to flip it over and show its real identity: Red, Blue, Neutral, or the game-ending &quot;Black Card&quot; (the surprise trap card).</li><li><strong>Teacher Key Window:</strong> Click the &quot;Teacher key window&quot; button on the bottom right of the board to open a secret, full-color key in a separate tab. Since screen sharing can be locked to a single tab, your students won't see the key!</li></ul>"
  },
  {
    "level": "Level 5: The Web Triad",
    "name": "Rotate & Relate",
    "short": "Similar-triangles geometry sandbox",
    "desc": "A geometry manipulative where students connect matching triangle sides with colored cords, type formal similarity statements, and watch the triangles lift, flip, and rotate into concurrency.",
    "lessonTitle": "Breaking Down Complexity (PRDs & The Web Triad)",
    "file": "Example_5/Elements_On_Screen.html",
    "promptFile": "Example_5/Prompt.txt",
    "lessonFile": "Example_5/Lesson.md",
    "readmeFile": "Example_5/README.md",
    "downloadFile": "Example_5/Rotate_And_Relate.zip",
    "downloadName": "Rotate_And_Relate.zip",
    "prompt": "Act as an expert educational front-end engineer and geometric visualization specialist. Build a zero-dependency, interactive web manipulative called \"Rotate & Relate: Similar Right Triangles\" designed to help secondary geometry students master the Altitude-to-the-Hypotenuse Theorem through tactile side-matching and kinematic transformation animations.\n\n### Technical Stack & Architectural Triad:\nSplit the implementation into 3 clean, modular standalone files with zero external dependencies (no React, D3, or Tailwind; pure HTML5, CSS3, and ES6+ JavaScript):\n1. `Elements_On_Screen.html`: Semantic HTML5 markup, SVG container scaffolding, UI cards, and modal elements.\n2. `How_It_Looks.css`: Modern \"Dark Cyber-Geometry\" theme (#0a0a0f canvas, #12121a cards, glowing neon accents: cyan #38bdf8, gold #fbbf24, violet #a855f7), responsive layout, and typography.\n3. `What_It_Does.js`: Procedural geometry generator, SVG coordinate rendering, pointer-driven patch cord physics, similarity verification engine, and multi-stage transformation animator.\n\n### Pedagogical Core: Altitude-to-the-Hypotenuse:\nWhen an altitude is drawn from the right angle of a right triangle to its hypotenuse, it creates two smaller sub-triangles that are similar to each other and to the parent triangle.\nThe tool must randomly generate a primary right triangle (vertices labeled A, B, C with altitude to point D), select two of the three triangles (Large, Medium, or Small), and challenge students to:\n1. Match corresponding sides using 3 color-coded virtual patch leads.\n2. Formulate the exact geometric similarity statement in correct corresponding vertex order.\n3. Trigger an animated transformation proof that translates, reflects, and rotates the triangles into concurrency to verify their work visually.\n\n### Interactive Components & Behavior:\n\n1. Dynamic SVG Geometry Workspace:\n   - Procedurally generate a non-isosceles right triangle with altitude $CD \\perp AB$.\n   - Display angle markers ($90^\\circ$ squares) and distinct vertex labels.\n   - Render the two selected triangles to be compared.\n\n2. Color-Coded Patch Cords (Drag & Connect):\n   - Provide 3 virtual patch cords:\n     * Red Cord: Connects corresponding Short Legs.\n     * Blue Cord: Connects corresponding Long Legs.\n     * Yellow Cord: Connects corresponding Hypotenuses.\n   - Use unified Pointer Events (`pointerdown`, `pointermove`, `pointerup`) with live SVG quadratic bezier curve rendering while dragging between side midpoint anchor pins.\n\n3. Similarity Statement Builder:\n   - Provide interactive dropdowns or text inputs for the similarity statement:\n     $\\Delta \\text{ [ _ _ _ ] } \\sim \\Delta \\text{ [ _ _ _ ] }$\n   - Ensure the student must match vertices in exact corresponding order (e.g., matching right angle to right angle, acute to acute).\n\n4. The Kinematic Transformation Animation (The \"Aha!\" Moment):\n   - When the student clicks \"Check & Animate\":\n     * Stage 1 (Translation): Glide the second triangle across the canvas until hypotenuse midpoints coincide.\n     * Stage 2 (Reflection): If the two triangles have opposite spatial chirality, smoothly reflect across the axis.\n     * Stage 3 (Rotation): Rotate the second triangle into concurrency so it nests directly inside or coincides with the first.\n   - As the triangles align, if the patch cords were connected correctly, the cords shrink into glowing alignment rings. If incorrect, mismatched cords visibly twist and flash amber/red.\n\n5. Controls & Feedback:\n   - \"New Problem\": Generates a new randomized right triangle configuration.\n   - \"Reset Cords\": Clears connected leads.\n   - Real-time score and streak tracking.",
    "lessonMd": "# Lesson 5: Breaking Down Complexity (PRDs & The Web Triad)\n\n### 1. The Web Triad: Skeleton, Clothes, and Brain\n* As tools grow more complex, cramming thousands of lines into one file gets messy and confuses the AI.\n* Split your project into three specialized files:\n  * **HTML (`Elements_On_Screen.html`):** The skeleton—buttons, textboxes, and canvas shapes.\n  * **CSS (`How_It_Looks.css`):** The clothes—colors, dark mode themes, fonts, and card spacing.\n  * **JavaScript (`What_It_Does.js`):** The brain—math calculations, interactive cords, and animations.\n\n### 2. Don't Let AI Guess: Write a PRD\n* A one-sentence prompt like *\"Make me a geometry game\"* forces the AI to guess the math, the rules, and the layout—usually badly.\n* Write a **Product Requirements Document (PRD)** first: outline the pedagogical rule (Altitude-to-the-Hypotenuse), the exact controls (red/blue/yellow cords), and the step-by-step animation.\n* You can ask the AI to help you draft the PRD before writing a single line of code!\n\n### 3. Animate the \"Aha!\" Moment\n* Textbooks show static, confusing diagrams that students struggle to mentally rotate.\n* Prompt for multi-stage animations (slide, flip, rotate) that physically demonstrate proof right before their eyes.",
    "lessonHTML": "<h3>Lesson 5: Breaking Down Complexity (PRDs &amp; The Web Triad)</h3><h5>1. The Web Triad: Skeleton, Clothes, and Brain</h5><ul><li>As tools grow more complex, cramming thousands of lines into one file gets messy and confuses the AI.</li><li>Split your project into three specialized files:</li><li><strong>HTML (<code>Elements_On_Screen.html</code>):</strong> The skeleton—buttons, textboxes, and canvas shapes.</li><li><strong>CSS (<code>How_It_Looks.css</code>):</strong> The clothes—colors, dark mode themes, fonts, and card spacing.</li><li><strong>JavaScript (<code>What_It_Does.js</code>):</strong> The brain—math calculations, interactive cords, and animations.</li></ul><h5>2. Don't Let AI Guess: Write a PRD</h5><ul><li>A one-sentence prompt like <em>&quot;Make me a geometry game&quot;</em> forces the AI to guess the math, the rules, and the layout—usually badly.</li><li>Write a <strong>Product Requirements Document (PRD)</strong> first: outline the pedagogical rule (Altitude-to-the-Hypotenuse), the exact controls (red/blue/yellow cords), and the step-by-step animation.</li><li>You can ask the AI to help you draft the PRD before writing a single line of code!</li></ul><h5>3. Animate the &quot;Aha!&quot; Moment</h5><ul><li>Textbooks show static, confusing diagrams that students struggle to mentally rotate.</li><li>Prompt for multi-stage animations (slide, flip, rotate) that physically demonstrate proof right before their eyes.</li></ul>",
    "readmeHTML": "<h3>Example 5: Rotate &amp; Relate (Geometry Triangle Sandbox)</h3><h4>What is this app?</h4><p>This is a hands-on geometry manipulative for teaching similar right triangles. In math class, when an altitude line cuts through a big right triangle, it creates smaller triangles that are turned upside down and backward. This app lets students connect matching sides using virtual colored cords, type out math similarity statements, and press a button to watch the triangles magically lift off the page, flip over, and rotate until they line up side-by-side.</p><h4>How to use it in a virtual K-12 classroom</h4><ul><li><strong>Make Invisible Math Visible:</strong> Instead of struggling to see how overlapping shapes connect on a flat textbook page, students see live shapes on your shared screen.</li><li><strong>Hands-on Virtual Wires:</strong> Students or the teacher can drag red, blue, and yellow wires between corresponding short sides, long sides, and diagonal sides to test their thinking.</li><li><strong>The &quot;Aha!&quot; Moment Animation:</strong> When students click to check their answer, the app animates the transformation—gliding, flipping, and rotating the triangles together so students instantly see whether their colored lines match up or clash.</li><li><strong>Unlimited Fresh Practice:</strong> Click &quot;New Triangle&quot; to get a brand-new randomized shape with different angles and letters for endless practice problems.</li></ul>"
  },
  {
    "level": "Level 6: State Machines",
    "name": "Transversal Angles Practice",
    "short": "Scaffolded angle relationship trainer",
    "desc": "An interactive geometry practice tool that enforces a 3-stage locked sequence: angle naming via drag-and-drop, relationship identification, and algebraic solving with dynamic SVG generation.",
    "lessonTitle": "Scaffolding Stages & External APIs",
    "file": "Example_6/transversal_angles.html",
    "promptFile": "Example_6/Prompt.txt",
    "lessonFile": "Example_6/Lesson.md",
    "readmeFile": "Example_6/README.md",
    "downloadFile": "Example_6/Transversal_Angles.zip",
    "downloadName": "Transversal_Angles.zip",
    "prompt": "Act as an expert educational software architect specializing in scaffolded secondary mathematics instruction. Build an interactive, responsive web application for high school geometry students to master angle relationships formed by parallel lines cut by a transversal line.\n\n### Core Pedagogical Architecture: The 3-Stage Gated State Machine\nTo ensure deep conceptual mastery, students cannot simply guess answers or skip ahead. Every problem must follow a strictly scaffolded 3-stage sequence where subsequent stages remain locked until the current stage is verified:\n\n1. Stage 1: Angle Naming (Geometric Notation):\n   - Highlight two specific target angles on the dynamic SVG diagram with high-contrast color badges (Blue and Red).\n   - Provide a draggable/clickable point bank containing the labeled line points.\n   - Challenge students to construct the standard 3-point geometric name for both angles (e.g., $\\angle AGH$ and $\\angle GHD$) by dragging or selecting points into 3-slot target drop zones.\n   - Validate vertex ordering (the vertex point MUST be in the center position).\n\n2. Stage 2: Relationship Identification & Geometric Properties:\n   - Once Stage 1 is verified, unlock Stage 2.\n   - Angle Pair Classification: Interactive selector for the relationship type:\n     * Alternate Interior Angles\n     * Alternate Exterior Angles\n     * Corresponding Angles\n     * Consecutive (Same-Side) Interior Angles\n     * Consecutive (Same-Side) Exterior Angles\n     * Linear Pair / Vertical Angles\n   - Property Determination: Toggle between Congruent ($\\cong$) or Supplementary ($180^\\circ$).\n   - Provide instant, non-punitive corrective feedback explaining the geometric rationale.\n\n3. Stage 3: Algebraic Application & Equation Solving:\n   - Once Stage 2 is verified, unlock Stage 3.\n   - Display dynamic algebraic expressions or numerical values next to the target angles (e.g., $(3x + 15)^\\circ$ and $(5x - 25)^\\circ$).\n   - Challenge students to set up the equation, solve for the variable $x$, and submit their numerical answer.\n   - Include a built-in scratchpad or steps modal to help students structure their algebraic working.\n\n### Dynamic SVG Geometry & Problem Engine:\n- Procedural Diagram Generator:\n  * Two horizontal parallel lines ($l_1, l_2$) intersected by a transversal line ($t$).\n  * The transversal angle must vary dynamically between $45^\\circ$ and $135^\\circ$ (excluding $90^\\circ$) so no two consecutive problems look identical.\n  * Render clear angle arcs, vertex points, and arrowheads.\n  * Dynamically calculate text label offsets so letters never collide with lines or angle arcs.\n\n### Difficulty Levels & Session Flow:\n- Level 1: Numerical angle values and simple single-step variables.\n- Level 2: Linear expressions paired with numerical values.\n- Level 3: Systems with algebraic expressions on both angles requiring multi-step equation solving.\n- Session Management & Export:\n  * Student login modal (first name and last initial only—100% offline, zero server storage).\n  * 6-problem session set with real-time accuracy scoring.\n  * End-of-session downloadable performance summary report (timestamped text file) containing problem breakdown, accuracy, and attempts for easy submission to the teacher.\n\n### Technical Guardrails:\n- Pure client-side execution (HTML5, CSS3, ES6 JavaScript) with zero required backend or database.\n- Responsive, accessible design with clear focus states and keyboard navigation.",
    "lessonMd": "# Lesson 6: Scaffolding Stages & External APIs\n\n### 1. Gate Later Steps Behind Earlier Ones\n* In complex problems, early mistakes compound into total confusion.\n* Tell the AI to lock later steps until the foundation is verified: Stage 1 (Name the angle) must pass before unlocking Stage 2 (Identify relationship) or Stage 3 (Solve the algebra).\n* Catching misconceptions immediately keeps students from practicing errors.\n\n### 2. Advanced Move: Borrowing Other People's Engines (APIs)\n* You don't have to build every complex feature from scratch.\n* This tool connects to the **Graspable Math API**—an interactive algebra engine written by someone else.\n* Unlike our earlier self-contained rules, this *does* reach across the internet to load an outside library.\n* As your prompting skills grow, plugging into third-party tools lets you build world-class capabilities into your own custom interface.",
    "lessonHTML": "<h3>Lesson 6: Scaffolding Stages &amp; External APIs</h3><h5>1. Gate Later Steps Behind Earlier Ones</h5><ul><li>In complex problems, early mistakes compound into total confusion.</li><li>Tell the AI to lock later steps until the foundation is verified: Stage 1 (Name the angle) must pass before unlocking Stage 2 (Identify relationship) or Stage 3 (Solve the algebra).</li><li>Catching misconceptions immediately keeps students from practicing errors.</li></ul><h5>2. Advanced Move: Borrowing Other People's Engines (APIs)</h5><ul><li>You don't have to build every complex feature from scratch.</li><li>This tool connects to the <strong>Graspable Math API</strong>—an interactive algebra engine written by someone else.</li><li>Unlike our earlier self-contained rules, this <em>does</em> reach across the internet to load an outside library.</li><li>As your prompting skills grow, plugging into third-party tools lets you build world-class capabilities into your own custom interface.</li></ul>",
    "readmeHTML": "<h3>Parallel Lines &amp; Transversals Practice Tool</h3><p>A responsive, interactive web application designed for high school geometry students to practice and master angle relationships in parallel line/transversal configurations.</p><h4>Features</h4><ul><li><strong>Scaffolded Learning Sequence</strong>:</li></ul><ol><li><strong>Angle Naming</strong>: Practice identification using 3-point naming conventions.</li><li><strong>Relationship Identification</strong>: Determine angle pair types (e.g., Alternate Interior, Corresponding) and their properties (Congruent vs. Supplementary).</li><li><strong>Algebraic Application</strong>: Set up and solve equations based on geometric properties.</li></ol><ul><li><strong>Dynamic Problem Generation</strong>:</li><li><strong>Level 1</strong>: Numerical values and simple variables.</li><li><strong>Level 2</strong>: Linear expressions and numerical values.</li><li><strong>Level 3</strong>: Systems with two expressions.</li><li><strong>Interactive Geometry</strong>:</li><li>Dynamically rendered SVG diagrams that visually match the calculated angles.</li><li>Drag-and-drop interface for angle naming.</li><li><strong>Immediate Feedback</strong>: Real-time validation for each stage of the problem.</li><li><strong>Progress Tracking</strong>: Session-based scoring and a downloadable summary report.</li></ul><h4>Usage</h4><ol><li><strong>Open the Application</strong>: Open <code>index.html</code> in any modern web browser.</li><li><strong>Log In</strong>: Enter your first name and last initial to begin the session.</li><li><strong>Complete Problems</strong>:</li></ol><ul><li><strong>Stage 1</strong>: Identify the specific angles indicated by Blue and Red formatting. Drag points from the bank to the drop zones.</li><li><strong>Stage 2</strong>: Select the correct angle relationship type and whether they are Congruent (≅) or Supplementary (180°).</li><li><strong>Stage 3</strong>: Solve for the variable $x$ and enter the value.</li></ul><ol><li><strong>Finish &amp; Report</strong>: Complete the sequence of 6 problems and download your performance report.</li></ol><h4>Project Structure</h4><pre class=\"mcode-block\"><code>/\n├── index.html      # Main application structure and UI layout\n├── style.css       # Visual styling, variables, and animations\n├── script.js       # Core game logic, problem generation, and UI management\n├── README.md       # Project documentation\n└── .gitignore      # Git configuration</code></pre><h4>Key Components</h4><h5><code>ProblemGenerator</code> (script.js)</h5><p>Handles the creation of random geometry problems. It ensures angle values are valid (between 45° and 135°) and generates appropriate algebraic expressions based on the current difficulty level.</p><h5><code>UIManager</code> (script.js)</h5><p>Manages the SVG rendering and DOM interactions.</p><ul><li>Draws the transversal diagram based on the generated angle.</li><li>Handles drag-and-drop logic for points.</li><li>Manages stage locking and progression states.</li></ul><h5><code>GameManager</code> (script.js)</h5><p>Orchestrates the overall flow of the application.</p><ul><li>Tracks user score and history.</li><li>Validates answers against the generated problem data.</li><li>Generates the final performance report.</li></ul><h4>Version History</h4><ul><li><strong>v1.0</strong>: Initial release with basic problem types.</li><li><strong>v1.1</strong>: Enhanced SVG rendering for accurate angle visualization.</li><li><strong>v1.2</strong>: Added git version control and polished UI text (mathematical symbols).</li></ul>"
  },
  {
    "level": "Level 7: Gamification",
    "name": "Polar Defender",
    "short": "Arcade radar coordinate defense game",
    "desc": "An intense arcade defense game where incoming threats emerge on a 360-degree radar at polar coordinates (r, θ). Features rotating turret physics, difficulty tiers, music, audio SFX, and wave escalation.",
    "lessonTitle": "Orchestrating Media & Arcade \"Game Feel\"",
    "file": "Example_7/index.html",
    "promptFile": "Example_7/Prompt.txt",
    "lessonFile": "Example_7/Lesson.md",
    "readmeFile": "Example_7/README.md",
    "downloadFile": "Example_7/Polar_Defender.zip",
    "downloadName": "Polar_Defender.zip",
    "prompt": "Act as an expert educational game designer and senior creative technologist. Build an arcade-style, high-intensity math game called \"POLAR DEFENDER\" that transforms polar coordinate plotting into an engaging radar defense intercept simulator.\n\n### Game Premise & Narrative:\nThe player acts as an intercept defense operator at the Unified Polar Defense Command. Incoming hostile airborne threats appear on a 360-degree radar display at specific polar coordinates $(r, \\theta)$. The player must interpret the coordinate telemetry and fire the central defense turret to neutralize threats before they breach shield perimeter.\n\n### Architectural Structure:\n- Structure the application cleanly across 3 standalone files: `index.html`, `style.css`, and `script.js`.\n- Integrate external audio sound effects and musical tracks (`Playing_Music.mp3`, `Pause_Music.mp3`, `Win_Music.mp3`, `Turret_Fire.mp3`, `Turret_Miss.mp3`, `Enemy_Fire.mp3`, `Enemy_Explode.mp3`) with robust audio unlock handlers conforming to browser autoplay security policies.\n\n### Core Screens & Game Flow:\n\n1. Clearance / Login Terminal:\n   - Retro tactical command UI asking for a \"Call Sign\" (e.g. VIPER, GHOST, MATHWIZ) with strict privacy guidelines (no real names).\n   - Challenge Tier Selection:\n     * Recruit: 10 Shields, extended target fuse, continuous angle guidance, 1.0x score multiplier.\n     * Veteran: 7 Shields, standard fuse, standard angle guidelines, 1.25x score multiplier.\n     * Commander: 5 Shields, fast threat emergence, radians & negative radius equivalents, 1.5x score multiplier.\n   - Animated \"Credentials Accepted\" security clearance sequence.\n\n2. Mission Briefing Overlay:\n   - Interactive 3-step walkthrough of polar coordinate mechanics ($r$ = distance from center radar pole, $\\theta$ = counterclockwise angle from the positive x-axis).\n   - Quick start and skip controls.\n\n3. Combat HUD & Radar Canvas:\n   - Radar Canvas: 520x520 circular radar screen featuring concentric range rings ($r = 1$ to $5$), radial angle spokes ($0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ\\dots$), and a continuous rotating phosphor sweep beam.\n   - Threat Telemetry Panel: Displays the intercepted signal $(r, \\theta)$ in prominent glowing green typography.\n   - Center Turret: Pivot base with dual cannon barrels that rotate dynamically toward the player's aim angle, featuring realistic rotation easing, muzzle flash, and recoil kickback.\n   - Firing Mechanism: Clicking the radar canvas locks coordinates and automatically rotates and fires the turret. Players can also aim and press the Spacebar or \"Fire Cannon\" button.\n   - Threat Destruction & Miss Consequences: Direct hits trigger a particle explosion with screen shake and sound effect. Misses trigger a counter-attack laser from the threat, depleting shield integrity.\n   - Shield Integrity Bar: Segmented health indicators that flash crimson upon damage.\n   - Wave Progression & Escalation:\n     * Wave 1-2: Standard positive degree angles ($0^\\circ-360^\\circ$) at integer radii.\n     * Wave 3-4: Introduction of radian angles ($\\frac{\\pi}{6}, \\frac{\\pi}{4}, \\frac{\\pi}{3}, \\frac{\\pi}{2}, \\pi, \\frac{3\\pi}{2}\\dots$).\n     * Wave 5+: Negative radius equivalents on Commander tier ($(-r, \\theta)$ maps opposite through the pole to $(r, \\theta + 180^\\circ)$).\n   - Audio & Music Control Bar: Live toggles for Music, Sound FX, Mission Briefing, and Pause (\"Temporal Delay\").\n   - Victory & Game Over Screens: Detailed operational debrief with final score, accuracy percentage, longest streak, and rank classification.\n\n### Visual Aesthetic & Game Feel:\n- Cyberpunk tactical military CRT monitor styling: deep obsidian (#050b08), glowing radar green (#00ff88), neon alert amber (#ffb700), warning crimson (#ff2244).\n- Dynamic screen shake on explosions, glowing phosphor trails, and particle emitter effects.",
    "lessonMd": "# Lesson 7: Orchestrating Media & Arcade \"Game Feel\"\n\n### 1. Leveling Up to Real Media Files\n* Earlier we avoided outside media; now we can manage real audio and image files.\n* Keep your audio files (`.mp3`) and images (`.png`) in the same folder as your code files.\n* Prompt the AI to reference the exact filenames: *\"Play `Turret_Fire.mp3` when clicking, and loop `Playing_Music.mp3` during gameplay.\"*\n\n### 2. Browser Autoplay & Audio Etiquette\n* Browsers will strictly block audio from playing automatically until the user clicks something on the page.\n* Always design a **\"Start Game\"** or \"Clearance\" screen so the user's first click unlocks the sound.\n* Always include separate, visible mute toggles for Music and Sound Effects for classroom volume control.\n\n### 3. Add \"Juice\" (Game Feel)\n* Don't settle for boring static math drills—ask for sensory arcade feedback.\n* Prompt for specific physical reactions: *\"Add a 200ms screen shake on impact\"*, *\"turret recoil kickback\"*, and *\"exploding particle effects\"*.\n* These visceral cues transform repetitive coordinate plotting into an exciting challenge.",
    "lessonHTML": "<h3>Lesson 7: Orchestrating Media &amp; Arcade &quot;Game Feel&quot;</h3><h5>1. Leveling Up to Real Media Files</h5><ul><li>Earlier we avoided outside media; now we can manage real audio and image files.</li><li>Keep your audio files (<code>.mp3</code>) and images (<code>.png</code>) in the same folder as your code files.</li><li>Prompt the AI to reference the exact filenames: <em>&quot;Play <code>Turret_Fire.mp3</code> when clicking, and loop <code>Playing_Music.mp3</code> during gameplay.&quot;</em></li></ul><h5>2. Browser Autoplay &amp; Audio Etiquette</h5><ul><li>Browsers will strictly block audio from playing automatically until the user clicks something on the page.</li><li>Always design a <strong>&quot;Start Game&quot;</strong> or &quot;Clearance&quot; screen so the user's first click unlocks the sound.</li><li>Always include separate, visible mute toggles for Music and Sound Effects for classroom volume control.</li></ul><h5>3. Add &quot;Juice&quot; (Game Feel)</h5><ul><li>Don't settle for boring static math drills—ask for sensory arcade feedback.</li><li>Prompt for specific physical reactions: <em>&quot;Add a 200ms screen shake on impact&quot;</em>, <em>&quot;turret recoil kickback&quot;</em>, and <em>&quot;exploding particle effects&quot;</em>.</li><li>These visceral cues transform repetitive coordinate plotting into an exciting challenge.</li></ul>",
    "readmeHTML": "<h3>Example 7: Polar Defender (Tactical Coordinate Intercept)</h3><h4>What is this app?</h4><p>Polar Defender is an arcade-style radar defense game where students take on the role of an intercept defense operator. Hostile threats emerge on a circular 360-degree radar screen at specific polar coordinates $(r, \\theta)$. Students must interpret the distance ($r$) and angle ($\\theta$) telemetry to rotate and fire their central defense turret before threats breach perimeter shields.</p><h4>How to use it in a virtual K-12 classroom</h4><ul><li><strong>Gamified Math Practice:</strong> Turn tedious coordinate plotting into an adrenaline-fueled defense drill. Students eagerly calculate angles to protect their shields.</li><li><strong>Call Sign System for Stream Privacy:</strong> Students log in with fun tactical call signs (like VIPER, GHOST, or MATHWIZ) so you can share screens and leaderboard scores without exposing real student names.</li><li><strong>Tiered Scaffolding for Differentiation:</strong></li><li><strong>Recruit:</strong> 10 shields, extended target fuse, continuous angle markers.</li><li><strong>Veteran:</strong> 7 shields, standard fuse, intermediate guidelines.</li><li><strong>Commander:</strong> 5 shields, rapid threats, radians ($\\pi/6, \\pi/4\\dots$), and negative radius coordinates ($(-r, \\theta)$).</li><li><strong>Audio Atmosphere with Total Mute Control:</strong> Includes high-energy retro synth soundtrack and tactical sound effects, with instant one-click mute toggles for classroom harmony.</li></ul>"
  },
  {
    "level": "Level 8: Architecture & Computation",
    "name": "Hypothesis Testing Suite",
    "short": "Inferential statistics distribution calculator",
    "desc": "A statistical calculator suite supporting 4 hypothesis tests (Chi-Square, T-Test, Z-Test mean & proportion) with dynamic Canvas probability density curves, shaded rejection regions, and p-value calculation.",
    "lessonTitle": "Frameworks vs. Vanilla & Heavy Math",
    "file": "Example_8/Vanilla/index.html",
    "promptFile": "Example_8/Prompt.txt",
    "lessonFile": "Example_8/Lesson.md",
    "readmeFile": "Example_8/README.md",
    "downloadFile": "Example_8/Hypothesis_Testing.zip",
    "downloadName": "Hypothesis_Testing.zip",
    "prompt": "Act as a senior computational statistician and educational front-end software architect. Build a comprehensive, zero-dependency statistical hypothesis testing calculator suite with interactive real-time probability distribution curve visualizations.\n\n### Architectural Dual Implementation Challenge:\nThis project demonstrates two architectural paradigms achieving the exact same interactive capability:\n1. `Vanilla/`: Implemented using pure, zero-dependency HTML5, CSS3, and ES6+ JavaScript. Requires zero npm packages, zero external CDNs, and works 100% offline.\n2. `Tailwind Calculator/`: Implemented using utility-first Tailwind CSS classes for rapid UI prototyping and consistent spacing design tokens.\n\n### Supported Statistical Hypothesis Tests:\nThe suite must feature a top-level test selector supporting 4 core hypothesis tests:\n1. Chi-Square Test for Variance ($\\sigma^2$):\n   - Sample variance ($s^2$) or sample standard deviation ($s$), sample size ($n$), hypothesized variance ($\\sigma_0^2$).\n   - Degrees of freedom $df = n - 1$.\n   - Test statistic formula: $\\chi^2 = \\frac{(n-1)s^2}{\\sigma_0^2}$.\n   - Graph: Asymmetric, right-skewed Chi-square distribution curve.\n2. One-Sample Student's T-Test for Mean ($\\mu$ with unknown $\\sigma$):\n   - Sample mean ($\\bar{x}$), sample standard deviation ($s$), sample size ($n$), hypothesized mean ($\\mu_0$).\n   - Degrees of freedom $df = n - 1$.\n   - Test statistic formula: $t = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}}$.\n   - Graph: Student's t-distribution curve with dynamic degrees-of-freedom kurtosis adjustment.\n3. One-Sample Z-Test for Mean ($\\mu$ with known population $\\sigma$):\n   - Sample mean ($\\bar{x}$), population standard deviation ($\\sigma$), sample size ($n$), hypothesized mean ($\\mu_0$).\n   - Test statistic formula: $Z = \\frac{\\bar{x} - \\mu_0}{\\sigma / \\sqrt{n}}$.\n   - Graph: Standard normal distribution curve $\\mathcal{N}(0, 1)$.\n4. One-Sample Z-Test for Population Proportion ($p$):\n   - Sample proportion ($\\hat{p} = x/n$), hypothesized proportion ($p_0$), sample size ($n$).\n   - Standard error: $SE = \\sqrt{\\frac{p_0(1-p_0)}{n}}$.\n   - Test statistic formula: $Z = \\frac{\\hat{p} - p_0}{SE}$.\n   - Graph: Standard normal distribution curve.\n\n### Real-Time Canvas Distribution Visualization:\n- Dynamic HTML5 Canvas rendering (1000x350 resolution):\n  * Accurately plot probability density functions using numerical approximations (polynomial approximation for normal CDF and Wilson-Hilferty transformation for Chi-square).\n  * Shaded Rejection Regions: Interactive inputs for Critical Values (Left CV, Right CV) and significance levels ($\\alpha$). Dynamically shade rejection tails in soft red/amber.\n  * Test Statistic Marker: Plot the calculated test statistic as a distinct vertical neon indicator line directly on the curve so students can instantly see whether the statistic falls inside or outside the rejection region.\n  * Real-Time P-Value: Automatically compute and display the one-tailed or two-tailed p-value corresponding to the current test statistic.\n\n### UI & Layout Specifications:\n- High-contrast, dark workstation theme (#0d1117 background, #161b22 panels, crisp borders).\n- Interactive formula preview panel showing LaTeX-style mathematical formula notation populated with current user numbers.\n- Responsive input panels with automatic input sanitization (handling division by zero, invalid degrees of freedom, and sample sizes $n < 2$).",
    "lessonMd": "# Lesson 8: Frameworks vs. Vanilla & Heavy Math\n\n### 1. Frameworks vs. Vanilla (Two Ways to Build)\n* AI often defaults to modern frameworks like **Tailwind CSS** or **React** because they make rapid styling easy.\n* **The Catch:** Frameworks often rely on outside libraries or build tools that can break or get blocked by school firewalls.\n* **The Vanilla Way:** Native HTML/CSS/JS needs zero installs, no compilers, and runs offline forever. If you want maximum reliability, always tell the AI: *\"Use pure Vanilla code with zero external dependencies.\"*\n\n### 2. The Browser as a Scientific Calculator\n* You don't need expensive graphing calculators or paid math software to do college-level math.\n* The browser can calculate advanced formulas on the fly (p-values, degrees of freedom, normal and Chi-square distributions).\n\n### 3. Connect Numbers Directly to Pictures\n* Don't make students look up abstract numbers in textbook tables.\n* Prompt the AI to draw the dynamic curve and shade the rejection region in real time.\n* Seeing the test statistic line land visually inside or outside the shaded zone makes the math instantly click.",
    "lessonHTML": "<h3>Lesson 8: Frameworks vs. Vanilla &amp; Heavy Math</h3><h5>1. Frameworks vs. Vanilla (Two Ways to Build)</h5><ul><li>AI often defaults to modern frameworks like <strong>Tailwind CSS</strong> or <strong>React</strong> because they make rapid styling easy.</li><li><strong>The Catch:</strong> Frameworks often rely on outside libraries or build tools that can break or get blocked by school firewalls.</li><li><strong>The Vanilla Way:</strong> Native HTML/CSS/JS needs zero installs, no compilers, and runs offline forever. If you want maximum reliability, always tell the AI: <em>&quot;Use pure Vanilla code with zero external dependencies.&quot;</em></li></ul><h5>2. The Browser as a Scientific Calculator</h5><ul><li>You don't need expensive graphing calculators or paid math software to do college-level math.</li><li>The browser can calculate advanced formulas on the fly (p-values, degrees of freedom, normal and Chi-square distributions).</li></ul><h5>3. Connect Numbers Directly to Pictures</h5><ul><li>Don't make students look up abstract numbers in textbook tables.</li><li>Prompt the AI to draw the dynamic curve and shade the rejection region in real time.</li><li>Seeing the test statistic line land visually inside or outside the shaded zone makes the math instantly click.</li></ul>",
    "readmeHTML": "<h3>Example 8: Statistical Hypothesis Testing Calculator Suite</h3><h4>What is this app?</h4><p>This is a comprehensive, college-ready inferential statistics tool. It allows students and educators to run 4 major hypothesis tests: Chi-Square Test for Variance ($\\sigma^2$), One-Sample T-Test for Mean ($\\mu$), Z-Test for Mean ($\\mu$), and Z-Test for Proportion ($p$). It dynamically renders the corresponding probability distribution curve on an HTML5 canvas, shades critical rejection regions ($\\alpha$), plots the calculated test statistic, and computes exact p-values in real time.</p><h4>How to use it in a virtual K-12 or AP Statistics classroom</h4><ul><li><strong>Visualizing the Rejection Region:</strong> Type in sample data and critical values. Watch the distribution curve dynamically shade the alpha rejection tails (left, right, or two-tailed).</li><li><strong>Instant Decision Making:</strong> Students immediately see whether the test statistic falls in the shaded critical zone to reject the null hypothesis ($H_0$) or fails to reject.</li><li><strong>Side-by-Side Formula Verification:</strong> Shows clean mathematical formulas with numbers plugged in alongside the live calculation.</li><li><strong>Dual Architecture Comparison:</strong> Contains two distinct folders showcasing the same app:</li><li><code>Vanilla/</code>: 100% offline, zero dependencies, double-click and run anywhere.</li><li><code>Tailwind Calculator/</code>: Uses modern Tailwind utility styling.</li></ul>"
  },
  {
    "level": "Level 9: Domain Modeling",
    "name": "Redox Reaction Interactive",
    "short": "Oxidation states & electron transfer simulation",
    "desc": "A collegiate-grade chemistry interactive for balancing oxidation states, identifying oxidized/reduced species (OIL RIG), animating electron flow pathways, and offering ambient Help Mode scaffolding.",
    "lessonTitle": "Scientific Modeling & Ambient Scaffolding",
    "file": "Example_9/index.html",
    "promptFile": "Example_9/Prompt.txt",
    "lessonFile": "Example_9/Lesson.md",
    "readmeFile": "Example_9/README.md",
    "downloadFile": "Example_9/Redox_Reaction.zip",
    "downloadName": "Redox_Reaction.zip",
    "prompt": "Act as a university chemistry education specialist and expert front-end developer. Build an advanced, interactive single-file web application called \"Redox Reaction Interactive\" to help high school and AP/College Chemistry students master oxidation numbers, half-reactions, and electron transfer pathways in chemical equations.\n\n### Technical & Environmental Constraints:\n- Zero Dependencies: Pure native HTML5, CSS3, and modern JavaScript combined inside one standalone `index.html` file.\n- Client-Side Privacy: Operates entirely in browser memory; no backend server, tracking, or cloud requirements.\n- Crisp Scientific Typography: Ensure precise rendering of chemical formulas with proper subscripts ($H_2O$), ionic charge superscripts ($Fe^{3+}$, $SO_4^{2-}$), coefficients, and reaction symbols ($\\to$, $+$).\n\n### Core Instructional Workflow & Features:\n\n1. Dynamic Chemical Equation Stage:\n   - Display balanced chemical equations (e.g., $2Mg + O_2 \\to 2MgO$, $Zn + Cu^{2+} \\to Zn^{2+} + Cu$, etc.) with high-contrast, scalable chemical notation.\n   - For each atom in both reactants and products, provide an interactive \"Oxidation State Drop-Zone Box\" placed directly above or below the chemical symbol.\n\n2. Interactive Oxidation State Assignment:\n   - Provide a clean number bank ($-3, -2, -1, 0, +1, +2, +3, +4, +5, +6, +7$) that students can click or drag to assign oxidation states to each individual atom.\n   - Validation & Feedback:\n     * Instant validation against foundational chemical rules: free elements have an oxidation number of 0; monoatomic ions equal their charge; Group 1 alkali metals are +1; Oxygen is typically -2; Hydrogen is +1 with nonmetals; the sum of oxidation states in a neutral compound must equal 0, or equal the polyatomic ion's charge.\n     * Clear color-coded feedback (green for correct, amber/red for incorrect with guidance).\n\n3. OIL RIG Electron Transfer Analysis:\n   - Once oxidation states are correctly assigned, prompt students to analyze electron transfer:\n     * **Oxidation Is Loss (OIL):** Identify which species lost electrons, the change in oxidation number (e.g., $0 \\to +2$), and which substance acts as the reducing agent.\n     * **Reduction Is Gain (RIG):** Identify which species gained electrons, the change in oxidation number (e.g., $+2 \\to 0$), and which substance acts as the oxidizing agent.\n   - Animate the electron transfer pathway: visual glowing particle or arc tracing the flow of electrons from the oxidized species to the reduced species across the reaction arrow.\n\n4. Guided \"Help Mode\" (Ambient Scaffolding):\n   - Include an interactive \"Need Help?\" toggle button.\n   - When activated, the entire screen transitions to an ambient warm warning theme (safety orange background tint) with:\n     * Step-by-step oxidation rule reminders.\n     * Visual breakdown of compound charges and arithmetic balance equations.\n     * Guided prompts that walk the student through deducing the unknown element's state without giving away the final answer.\n\n5. Problem Bank & Progress Tracker:\n   - Multi-problem set with diverse reaction types (synthesis, single displacement, combustion, disproportionation).\n   - Problem counter, student nickname header, and session completion celebrations.",
    "lessonMd": "# Lesson 9: Scientific Modeling & Ambient Scaffolding\n\n### 1. Demand Domain-Specific Typography\n* Chemistry and advanced sciences have strict formatting rules that basic text boxes ignore.\n* Explicitly prompt the AI for exact scientific notation: subscripts ($H_2O$), superscripts ($Fe^{3+}$), reaction arrows ($\\rightarrow$), and number boxes stacked directly above atom symbols.\n* Precision in your prompt ensures the tool matches real textbook rigor.\n\n### 2. Ambient \"Help Mode\" (Hints Without Spoilers)\n* Annoying pop-up windows block the problem and disrupt student flow.\n* Ask for an ambient state change: clicking \"Need Help?\" tints the interface warm and illuminates step-by-step arithmetic hints right around the equation.\n* It supports struggling learners without handing them the answer.",
    "lessonHTML": "<h3>Lesson 9: Scientific Modeling &amp; Ambient Scaffolding</h3><h5>1. Demand Domain-Specific Typography</h5><ul><li>Chemistry and advanced sciences have strict formatting rules that basic text boxes ignore.</li><li>Explicitly prompt the AI for exact scientific notation: subscripts ($H_2O$), superscripts ($Fe^{3+}$), reaction arrows ($\\rightarrow$), and number boxes stacked directly above atom symbols.</li><li>Precision in your prompt ensures the tool matches real textbook rigor.</li></ul><h5>2. Ambient &quot;Help Mode&quot; (Hints Without Spoilers)</h5><ul><li>Annoying pop-up windows block the problem and disrupt student flow.</li><li>Ask for an ambient state change: clicking &quot;Need Help?&quot; tints the interface warm and illuminates step-by-step arithmetic hints right around the equation.</li><li>It supports struggling learners without handing them the answer.</li></ul>",
    "readmeHTML": "<h3>Example 9: Redox Reaction Interactive</h3><h4>What is this app?</h4><p>This is a rich, high-level interactive chemistry tool designed for AP and introductory college chemistry students. It guides students through determining oxidation states for complex chemical equations, identifying which elements are oxidized (OIL: Oxidation Is Loss) and reduced (RIG: Reduction Is Gain), tracking the total electrons transferred, and visualizing the reaction pathway with dynamic feedback.</p><h4>How to use it in a virtual K-12 classroom</h4><ul><li><strong>Hands-on Oxidation Number Assignment:</strong> Click and assign oxidation values to every atom in reactants and products with real-time rule validation.</li><li><strong>Mastering OIL RIG:</strong> Reinforce foundational redox mnemonics by identifying reducing and oxidizing agents through interactive checks.</li><li><strong>Ambient &quot;Help Mode&quot; Scaffold:</strong> When students get stuck on tricky rules (like polyatomic ions or peroxides), clicking the Help button transforms the interface into a warm orange guidance workspace with step-by-step arithmetic hints.</li><li><strong>Classroom Screen Sharing:</strong> Clear, large, colorful typography designed specifically for visibility during virtual class demonstrations.</li></ul>"
  }
];

function escapeHTML(s){
  return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

var GEMDEFS='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="gemg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fef9c3"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#7c3aed"/></linearGradient><symbol id="gem" viewBox="0 0 40 44"><polygon points="20,2 36,14 30,42 10,42 4,14" fill="url(#gemg)" stroke="#fff" stroke-opacity=".55" stroke-width="1.2"/><polygon points="20,2 36,14 20,20" fill="#fff" fill-opacity=".35"/><polygon points="4,14 20,20 10,42" fill="#000" fill-opacity=".18"/></symbol></defs></svg>';
function caveHTML(){
  return GEMDEFS+'<div class="cave-stage">'+TREASURES.map(function(t,i){
    return '<button class="gem" data-i="'+i+'" style="--hue:'+(i*40)+'deg;--dur:'+(4.5+i%3*.7)+'s;--delay:'+(i*.3)+'s" aria-label="'+t.name+' ('+t.level+'): '+t.short+'"><svg class="gemi" viewBox="0 0 40 44"><use href="#gem"></use></svg><span class="gname">'+t.name+'</span></button>';
  }).join('')+'</div><div id="gemCaption" aria-live="polite">Hover or focus a treasure to hear its secret&hellip;</div>';
}
function setCap(t){
  var c=$('#gemCaption');
  if(c) c.innerHTML='<b>'+t.name+'</b> <span style="color:var(--cyan)">('+t.level+')</span> &mdash; '+t.short;
}
function resetCap(){
  var c=$('#gemCaption');
  if(c) c.textContent='Hover or focus a treasure to hear its secret…';
}
function openModal(i){
  var t=TREASURES[i],m=$('#modal');
  var downloadUrl = t.downloadFile || t.file;
  var downloadName = t.downloadName || (t.isZip ? t.name.replace(/\s+/g,'_')+'.zip' : t.name.replace(/\s+/g,'_')+'.html');

  m.innerHTML='<div class="mback" data-close="1"></div>' +
    '<div class="mdlg" role="dialog" aria-modal="true" aria-labelledby="mtitle">' +
      '<div class="mheader">' +
        '<div class="mtop-row">' +
          '<span class="mbadge">' + t.level + '</span>' +
          '<button class="mclose" data-close="1" aria-label="Close modal">&times;</button>' +
        '</div>' +
        '<h3 id="mtitle">' + t.name + '</h3>' +
        '<p class="mdesc">' + t.desc + '</p>' +
      '</div>' +
      '<div class="mtabs" role="tablist">' +
        '<button class="mtab active" data-mtab="prompt">&#128203; The Prompt</button>' +
        '<button class="mtab" data-mtab="result">&#128640; The Result</button>' +
        '<button class="mtab" data-mtab="lesson">&#128161; The Lesson</button>' +
      '</div>' +
      '<div class="mbody">' +
        '<div class="mpane active" id="mpane-prompt">' +
          '<div class="mprompt-wrap">' +
            '<pre class="mprompt-code"><code>' + escapeHTML(t.prompt) + '</code></pre>' +
          '</div>' +
          '<div class="mtab-actions">' +
            '<button class="btn" data-copyprompt="' + i + '">&#128203; Copy Prompt</button>' +
            '<button class="btn alt" data-saveprompt="' + i + '">&#128190; Save for Later</button>' +
          '</div>' +
        '</div>' +
        '<div class="mpane" id="mpane-result">' +
          '<div class="mresult-wrap">' +
            '<div class="mreadme-card">' +
              t.readmeHTML +
            '</div>' +
          '</div>' +
          '<div class="mtab-actions">' +
            '<a class="btn" href="' + encodeURI(t.file) + '" target="_blank" rel="noopener">&#128640; Try it!</a>' +
            '<a class="btn alt" href="' + encodeURI(downloadUrl) + '" download="' + downloadName + '" target="_blank" rel="noopener" data-savefiles="' + i + '">&#128190; Save file(s)</a>' +
          '</div>' +
        '</div>' +
        '<div class="mpane" id="mpane-lesson">' +
          '<div class="mlesson-wrap">' +
            '<div class="mlesson-card">' +
              t.lessonHTML +
            '</div>' +
          '</div>' +
          '<div class="mtab-actions">' +
            '<button class="btn" data-copylesson="' + i + '">&#128203; Copy Lesson</button>' +
            '<button class="btn alt" data-savelesson="' + i + '">&#128190; Save for Later</button>' +
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

/* ---------- Slides ---------- */
var SLIDES=[
{t:'The Wish and the Lamp',h:function(){return '<div class="hero"><h1>The Classroom Genie: Building Custom Tools Without Code</h1><p>Pearson Virtual Schools Staff Conference. Presenter: Caleob King.</p><div class="card glow" style="max-width:52rem;margin:1.2rem auto"><p>AI is a <b>powerful but overly literal Genie</b>. It can build any educational manipulative you imagine, but it takes every word literally, so you must state your wish clearly.</p></div><p style="color:var(--gold)">Press Space or the right arrow to begin.</p></div>'}},
{t:'The Three Curses of Ready-Made EdTech',h:function(){return '<h2>The Three Curses of Ready-Made EdTech</h2><div class="grid g3"><div class="card"><h3>The Login Nightmare</h3><p>Lost passwords, account limits, student privacy risks.</p></div><div class="card"><h3>The Cookie-Cutter Trap</h3><p>Generic tools never fit your exact lesson or state standard.</p></div><div class="card"><h3>The Paywall &amp; Firewall</h3><p>Subscriptions expire and school security blocks outside sites.</p></div></div><div class="banner"><b>The Genie\'s Secret:</b> your web browser is already a free, offline projector. Works from your desktop with zero logins, zero accounts, and 100% privacy.</div>'}},
{t:'Meeting the Genie',h:function(){return '<h2>Meeting the Genie</h2><p>The Genie does not read minds. It executes your exact words.</p><div class="grid g3">'+[['1. Keep it in one house','Everything inside a single standalone .html file.'],['2. No phantom files','Browser-made sounds and code-drawn shapes instead of downloads.'],['3. Protect student privacy','Everything stays in your browser. Nothing goes to outside servers.']].map(function(r){return '<div class="card glow" tabindex="0"><h3>'+r[0]+'</h3><p>'+r[1]+'</p></div>'}).join('')+'</div>'}},
{t:'The Cave of Wonders',h:function(){return '<h2>The Cave of Wonders</h2><p style="color:var(--mute);margin-top:-.4rem">Nine builds are hidden here. Hover or focus a gem to hear its secret. Click to open it.</p><div class="cave-wrap static">'+caveHTML()+'</div>'}},
{t:'The Golden Prompt Formula',h:function(){return '<h2>The Teacher\'s Golden Prompt Formula</h2><div class="grid g2"><div class="card"><span class="pill role">Role</span> <b>Who the Genie is</b><p>"Act as an educational web tool maker."</p></div><div class="card"><span class="pill aud">Audience</span> <b>Who it is for</b><p>"Build a tool for my 6th-grade Earth Science students."</p></div><div class="card"><span class="pill task">Function</span> <b>What it does</b><p>"Students click steps of the water cycle to see an animation."</p></div><div class="card"><span class="pill guard">Guardrails</span> <b>Safety &amp; portability</b><ul><li>Single standalone .html file.</li><li>No external image, font, or audio downloads.</li><li>100% student data privacy offline.</li></ul></div></div><p><button class="btn" data-copy="formula">Copy formula template</button></p>'}},
{t:'Step-by-Step Guide',h:function(){return '<h2>Step-by-Step Hands-On Guide</h2><div class="grid g2">'+[['Copy the code','Click "Copy code" in your AI chat. Never drag-highlight hundreds of lines.'],['Open your starter file','Open the pre-made tool.html in Notepad or TextEdit.'],['Paste and save','Ctrl+S on Windows, Cmd+S on Mac.'],['Double-click to run','It opens in Chrome, Edge, or Safari, offline.']].map(function(s,i){return '<div class="card"><h3>Step '+(i+1)+': '+s[0]+'</h3><p>'+s[1]+'</p></div>'}).join('')+'</div><p style="text-align:center;margin-top:2rem"><button class="btn rounded-action-btn" data-dl="starter" title="Download starter tool.html">&#128196; Blank HTML FILE</button></p>'}},
{t:'Tinker Time',h:function(){
  return '<div class="final-stage static">'
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
function PB(){
  var P={Math:'Build a fraction-comparison game for my 4th graders: two fraction bars, students click which is larger, with a score.',ELA:'Build a sentence-unscramble tool for my 7th graders: shuffled words, drag to order, Check button.',Science:'Build a water cycle explorer for 6th-grade Earth Science: click each stage to see an animation.','Social Studies':'Build a map-labeling quiz for my 8th graders using shapes drawn in code, no images.'};
  var G=' Keep everything in one single .html file, no outside links or downloads, keep student data private on my computer.';
  return Object.keys(P).map(function(k){return '<details><summary>'+k+'</summary><pre>Act as an educational web tool maker. '+P[k]+G+'</pre><button class="btn alt" data-copytxt="'+encodeURIComponent('Act as an educational web tool maker. '+P[k]+G)+'">Copy</button></details>'}).join('')}

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
