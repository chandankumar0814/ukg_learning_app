// ==================== UKG LEARNING APP ====================

const $ = sel => document.querySelector(sel);
const app = $('#app');
let currentScore = 0;

// ==================== CONFETTI ====================
function showConfetti() {
  const container = $('#confetti-container');
  const colors = ['#ff4081','#7c4dff','#448aff','#00c853','#ff6d00','#ffd600','#00e5ff'];
  for (let i = 0; i < 50; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.width = (Math.random() * 10 + 6) + 'px';
    piece.style.height = (Math.random() * 10 + 6) + 'px';
    piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
    piece.style.animationDelay = (Math.random() * 1) + 's';
    container.appendChild(piece);
  }
  setTimeout(() => container.innerHTML = '', 4000);
}

// ==================== SOUND ====================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  gain.gain.value = 0.15;
  if (type === 'correct') {
    osc.frequency.value = 523;
    osc.type = 'sine';
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
    osc.start(); osc.stop(audioCtx.currentTime + 0.4);
    setTimeout(() => {
      const o2 = audioCtx.createOscillator();
      const g2 = audioCtx.createGain();
      o2.connect(g2); g2.connect(audioCtx.destination);
      g2.gain.value = 0.15;
      o2.frequency.value = 659; o2.type = 'sine';
      g2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      o2.start(); o2.stop(audioCtx.currentTime + 0.3);
    }, 150);
  } else {
    osc.frequency.value = 200;
    osc.type = 'square';
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
    osc.start(); osc.stop(audioCtx.currentTime + 0.3);
  }
}

function playClick() {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain); gain.connect(audioCtx.destination);
  gain.gain.value = 0.05;
  osc.frequency.value = 800; osc.type = 'sine';
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
  osc.start(); osc.stop(audioCtx.currentTime + 0.1);
}

// ==================== READ ALOUD (Text-to-Speech) ====================
let ttsVoices = [];

function readAloud(text, lang) {
  lang = lang || 'en-IN';
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.85;
  utter.pitch = 1.1;
  utter.volume = 1;
  if (ttsVoices.length > 0) {
    const langPrefix = lang.split('-')[0];
    // Prefer exact match (e.g. en-IN) first, then fallback to language prefix
    const preferred = ttsVoices.find(function(v) { return v.lang === lang; })
      || ttsVoices.find(function(v) { return v.lang.startsWith(langPrefix); });
    if (preferred) utter.voice = preferred;
  }
  window.speechSynthesis.speak(utter);
}

// Preload voices
if ('speechSynthesis' in window) {
  ttsVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = function() {
    ttsVoices = window.speechSynthesis.getVoices();
  };
}

// Helper to create speak button HTML using data attributes (avoids inline JS escaping issues)
function speakerBtn(text, lang) {
  lang = lang || 'en-IN';
  // Use data attributes to avoid any quote/escaping issues in onclick
  return '<button class="speak-btn" data-speak="' + encodeURIComponent(text) + '" data-lang="' + lang + '" title="Listen">🔊</button>';
}

// Global click handler for ALL speak buttons and speakable items (event delegation)
document.addEventListener('click', function(e) {
  // Handle .speak-btn clicks
  var btn = e.target.closest('.speak-btn');
  if (btn) {
    e.stopPropagation();
    var text = decodeURIComponent(btn.getAttribute('data-speak'));
    var lang = btn.getAttribute('data-lang') || 'en-IN';
    readAloud(text, lang);
    return;
  }
  // Handle clicks on items with data-speak attribute (content items, letter cells, etc.)
  var speakable = e.target.closest('[data-speak]');
  if (speakable && !speakable.classList.contains('speak-btn')) {
    var text2 = decodeURIComponent(speakable.getAttribute('data-speak'));
    var lang2 = speakable.getAttribute('data-lang') || 'en-IN';
    readAloud(text2, lang2);
  }
});

// ==================== SHUFFLE ====================
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ==================== RENDER HOME ====================
function renderHome() {
  app.innerHTML = `
    <div class="app-header">
      <span class="mascot">📚</span>
      <h1>Fun Learning</h1>
      <p class="subtitle">UKG Syllabus — Learn, Play & Grow! 🌟</p>
    </div>
    <div class="subject-grid">
      ${SUBJECTS.map(s => `
        <div class="subject-card" data-color="${s.color}" onclick="renderSubject('${s.id}')">
          <span class="icon">${s.icon}</span>
          <div class="label">${s.label}</div>
          <div class="sublabel">${s.sublabel}</div>
        </div>
      `).join('')}
    </div>
  `;
  window.scrollTo(0, 0);
}

// ==================== RENDER SUBJECT ====================
function renderSubject(subjectId) {
  playClick();
  const subject = SUBJECTS.find(s => s.id === subjectId);
  const topics = TOPICS[subjectId] || [];
  const colorClasses = ['','pink','blue','green','orange'];
  app.innerHTML = `
    <button class="back-btn" onclick="renderHome()">⬅ Back to Home</button>
    <div class="section-header">
      <span class="section-icon">${subject.icon}</span>
      <h2>${subject.label}</h2>
      <p class="section-desc">${subject.sublabel}</p>
    </div>
    <div class="topic-list">
      ${topics.map((t, i) => `
        <div class="topic-card ${colorClasses[i % 5]}" onclick="renderTopic('${t.type}','${subjectId}')">
          <div class="topic-num">${i + 1}</div>
          <div class="topic-title">${t.title}</div>
          <div class="topic-arrow">▸</div>
        </div>
      `).join('')}
    </div>
  `;
  window.scrollTo(0, 0);
}

// ==================== RENDER TOPIC ====================
function renderTopic(type, subjectId) {
  playClick();
  const renderers = {
    'sort-vowels': renderSortVowels,
    'lesson-nouns': renderNouns,
    'lesson-fvc': renderFVC,
    'lesson-animals': renderAnimals,
    'lesson-universe': renderUniverse,
    'lesson-alphabets': renderAlphabets,
    'lesson-wordfamily': renderWordFamily,
    'lesson-noun-def': renderNounDef,
    'lesson-sounds': renderSounds,
    'lesson-hindi-words': renderHindiWords,
    'lesson-hindi-swar': renderHindiSwarVyanjan,
    'lesson-hindi-join': renderHindiJoin,
    'lesson-hindi-matra': renderHindiMatra,
    'worksheet-hindi-fill': renderHindiFill,
    'lesson-hindi-alphabets': renderHindiAlphabets,
    'lesson-hindi-recognition': renderHindiRecognition,
    'lesson-hindi-intro': renderHindiIntro,
    'lesson-hindi-words-oral': renderHindiWordsOral,
    'lesson-numnames': renderNumNames,
    'lesson-ordinal': renderOrdinal,
    'worksheet-math-ops': renderMathOps,
    'lesson-backward': renderBackward,
    'worksheet-ascending': renderAscending,
    'lesson-numnames-oral': renderNumNamesOral,
    'lesson-ordinal-oral': renderOrdinalOral,
    'lesson-shapes': renderShapes,
    'lesson-backward-oral': renderBackwardOral,
    'lesson-evs-fvc': renderFVC,
    'lesson-transport': renderTransport,
    'lesson-evs-universe': renderUniverse,
    'lesson-evs-animals': renderEVSAnimals,
    'lesson-helpers': renderHelpers,
    'lesson-water': renderWater,
    'lesson-celebrations': renderCelebrations,
    'lesson-comm-qa': renderCommQA
  };
  const renderer = renderers[type];
  if (renderer) renderer(subjectId);
  window.scrollTo(0, 0);
}

function backBtn(subjectId) {
  return `<button class="back-btn" onclick="renderSubject('${subjectId}')">⬅ Back</button>`;
}

// ==================== CONTENT RENDERERS ====================

function renderGrid(items, extra, lang) {
  extra = extra || '';
  lang = lang || 'en-IN';
  return '<div class="content-grid">' + items.map(function(i) {
    var encoded = encodeURIComponent(i.name);
    return '<div class="content-item ' + extra + '" data-speak="' + encoded + '" data-lang="' + lang + '" style="cursor:pointer">' +
      '<span class="item-emoji">' + i.emoji + '</span>' + i.name +
      (i.desc ? '<br><small style="color:#999">' + i.desc + '</small>' : '') +
      '<span class="speak-icon">🔊</span>' +
    '</div>';
  }).join('') + '</div>';
}

function renderCategorySection(title, emoji, items, extra = '') {
  return `<div class="category-section"><div class="category-title">${emoji} ${title}</div>${renderGrid(items, extra)}</div>`;
}

// 1. Sort Vowels & Consonants
function renderSortVowels(sid) {
  const letters = shuffle([...VOWELS, ...CONSONANTS.slice(0, 11)]);
  app.innerHTML = `${backBtn(sid)}
    <div class="worksheet-container">
      <h3>🔤 Sort Vowels & Consonants</h3>
      <p class="worksheet-desc">Tap a letter, then tap the correct box!</p>
      <div class="score-bar"><span class="stars">⭐</span><span class="score-text" id="sort-score">Score: 0 / ${letters.length}</span></div>
      <div class="sort-items" id="sort-pool">${letters.map(l =>
        `<span class="sort-item" data-letter="${l}" onclick="pickLetter(this)">${l}</span>`
      ).join('')}</div>
      <div class="sort-buckets">
        <div class="sort-bucket" id="bucket-vowel" onclick="dropLetter('vowel')">
          <span class="bucket-title" style="background:linear-gradient(135deg,#ff4081,#ff80ab)">Vowels</span>
          <div class="bucket-items" id="bucket-vowel-items"></div>
        </div>
        <div class="sort-bucket" id="bucket-consonant" onclick="dropLetter('consonant')">
          <span class="bucket-title" style="background:linear-gradient(135deg,#448aff,#82b1ff)">Consonants</span>
          <div class="bucket-items" id="bucket-consonant-items"></div>
        </div>
      </div>
      <div id="sort-result"></div>
    </div>`;
}

let selectedLetter = null;
let sortCorrect = 0, sortTotal = 0;
function pickLetter(el) {
  document.querySelectorAll('.sort-item').forEach(e => e.style.boxShadow = 'none');
  el.style.boxShadow = '0 0 0 4px #7c4dff';
  selectedLetter = el;
  playClick();
}
function dropLetter(bucket) {
  if (!selectedLetter) return;
  const letter = selectedLetter.dataset.letter;
  const isVowel = VOWELS.includes(letter);
  const correct = (bucket === 'vowel' && isVowel) || (bucket === 'consonant' && !isVowel);
  sortTotal++;
  if (correct) {
    sortCorrect++;
    playSound('correct');
    const bg = bucket === 'vowel' ? '#ff4081' : '#448aff';
    $(`#bucket-${bucket}-items`).innerHTML += `<span class="placed-item" style="background:${bg}">${letter}</span>`;
    selectedLetter.classList.add('placed');
    selectedLetter = null;
  } else {
    playSound('wrong');
    selectedLetter.style.animation = 'shake 0.4s ease';
    setTimeout(() => selectedLetter.style.animation = '', 400);
  }
  $('#sort-score').textContent = `Score: ${sortCorrect} / ${sortTotal}`;
  const remaining = document.querySelectorAll('.sort-item:not(.placed)');
  if (remaining.length === 0) {
    showConfetti();
    $('#sort-result').innerHTML = `<div class="result-box"><span class="result-emoji">🎉</span><div class="result-text">Amazing Job!</div><div class="result-score">${sortCorrect} correct out of ${sortTotal}</div></div>`;
  }
}

// 2. Nouns
function renderNouns(sid) {
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3>📖 Examples of Noun</h3>
    <div class="info-box"><p>A <strong>noun</strong> is a name of a <strong>person, place, animal,</strong> or <strong>thing</strong>.</p></div>
    ${renderCategorySection('Person 👤', '👨‍👩‍👦', NOUNS.person)}
    ${renderCategorySection('Place 📍', '🏠', NOUNS.place)}
    ${renderCategorySection('Animal 🐾', '🦁', NOUNS.animal)}
    ${renderCategorySection('Thing 🎒', '📦', NOUNS.thing)}
    <hr class="divider">
    <h3>✏️ Quick Quiz — Find the Noun!</h3>
    <div id="noun-quiz"></div></div>`;
  renderNounQuiz();
}

function renderNounQuiz() {
  const questions = [
    {q:'The _____ is playing.',opts:['dog','is','playing','the'],ans:'dog'},
    {q:'My _____ cooks food.',opts:['cooks','food','my','mother'],ans:'mother'},
    {q:'I go to _____.',opts:['I','go','to','school'],ans:'school'},
    {q:'The _____ is red.',opts:['the','ball','is','red'],ans:'ball'},
    {q:'A _____ can fly.',opts:['a','can','fly','bird'],ans:'bird'}
  ];
  const el = $('#noun-quiz');
  el.innerHTML = `<div class="info-box" style="margin-bottom:16px"><p>Pick the <strong>noun</strong> that fills the blank!</p></div>` +
  questions.map((q, i) => `
    <div class="quiz-question">
      <div class="q-text">${i + 1}. ${q.q} ${speakerBtn(q.q.replace(/_____/g, 'blank'))}</div>
      <div class="quiz-options">${q.opts.map(o =>
        `<div class="quiz-option" onclick="checkAnswer(this,'${o}','${q.ans}')">${o} ${speakerBtn(o)}</div>`
      ).join('')}</div>
    </div>`).join('');
}

function checkAnswer(el, selected, correct) {
  if (el.classList.contains('disabled')) return;
  const parent = el.closest('.quiz-question');
  parent.querySelectorAll('.quiz-option').forEach(o => o.classList.add('disabled'));
  if (selected === correct) {
    el.classList.add('correct');
    playSound('correct');
    currentScore++;
  } else {
    el.classList.add('wrong');
    playSound('wrong');
    parent.querySelectorAll('.quiz-option').forEach(o => {
      if (o.textContent === correct) o.classList.add('correct');
    });
  }
}

// 3. Fruits, Vegetables & Colours
function renderFVC(sid) {
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3>🍎 Fruits, Vegetables & Colours</h3>
    ${renderCategorySection('Fruits 🍎','🍉',FRUITS)}
    ${renderCategorySection('Vegetables 🥕','🥦',VEGETABLES)}
    ${renderCategorySection('Colours 🌈','🎨',COLOURS)}
    </div>`;
}

// 4. Animals & Seasons
function renderAnimals(sid) {
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3>🦁 Animals & Seasons</h3>
    ${renderCategorySection('Wild Animals 🌿','🦁',ANIMALS.wild)}
    ${renderCategorySection('Pet Animals 🏠','🐕',ANIMALS.pet)}
    ${renderCategorySection('Water Animals 🌊','🐟',ANIMALS.water)}
    ${renderCategorySection('Domestic Animals 🏡','🐄',ANIMALS.domestic)}
    <hr class="divider">
    ${renderCategorySection('Seasons 🌤️','📅',SEASONS)}
    </div>`;
}

// 5. Universe
function renderUniverse(sid) {
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3>🌌 The Universe</h3>
    <div class="info-box"><p>The universe is everything around us — the <strong>Sun, Moon, Stars, Planets</strong> and more!</p></div>
    ${renderGrid(UNIVERSE)}
    </div>`;
}

// 6. Alphabets
function renderAlphabets(sid) {
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3>🔤 Alphabets — Vowels & Consonants</h3>
    <div class="info-box"><p>There are <strong>26 letters</strong> in English. <strong>5 vowels</strong> (A, E, I, O, U) and <strong>21 consonants</strong>.</p></div>
    <div class="category-title">🔴 Vowels (5)</div>
    <div class="letter-grid">${VOWELS.map(v => `<div class="letter-cell vowel" data-speak="${encodeURIComponent(v)}" style="cursor:pointer">${v}</div>`).join('')}</div>
    <div class="category-title" style="margin-top:20px">🔵 Consonants (21)</div>
    <div class="letter-grid">${CONSONANTS.map(c => `<div class="letter-cell consonant" data-speak="${encodeURIComponent(c)}" style="cursor:pointer">${c}</div>`).join('')}</div>
    </div>`;
}

// 7. Word Family
function renderWordFamily(sid) {
  const colors = ['#ff4081','#7c4dff','#448aff','#00c853','#ff6d00'];
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3>👨‍👩‍👧‍👦 Word Families</h3>
    <div class="info-box"><p>Words that rhyme and end with the same sound belong to the same <strong>word family</strong>!</p></div>
    <div class="word-family-section">
    ${Object.entries(WORD_FAMILIES).map(([vowel, words], i) => `
      <div class="word-family-group">
        <span class="word-family-label" style="background:${colors[i]}">Family "${vowel}"</span>
        <div class="word-family-words">${words.map(w => `<span class="word-chip" data-speak="${encodeURIComponent(w)}">${w} 🔊</span>`).join('')}</div>
      </div>
    `).join('')}
    </div></div>`;
}

// 8. Noun Definition
function renderNounDef(sid) {
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3>📖 Definition of Noun</h3>
    <div class="info-box" data-speak="${encodeURIComponent('A Noun is a word that names a person, place, animal, or thing.')}" style="cursor:pointer">
      <p>A <strong>Noun</strong> is a word that names a <strong>person, place, animal,</strong> or <strong>thing</strong>. <span class="speak-icon">🔊</span></p>
    <p style="margin-top:10px"><strong>Examples:</strong></p>
    <p>👤 Person — Mother, Father, Teacher</p>
    <p>📍 Place — School, Park, Home</p>
    <p>🐾 Animal — Dog, Cat, Lion</p>
    <p>📦 Thing — Book, Ball, Pen</p></div>
    ${renderCategorySection('Person 👤','👨‍👩‍👦',NOUNS.person)}
    ${renderCategorySection('Place 📍','🏠',NOUNS.place)}
    ${renderCategorySection('Animal 🐾','🦁',NOUNS.animal)}
    ${renderCategorySection('Thing 🎒','📦',NOUNS.thing)}
    </div>`;
}

// 9. Sounds of Letters
function renderSounds(sid) {
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3>🔊 Sounds of Letters</h3>
    <div class="info-box"><p>Every letter makes a <strong>sound</strong>. Tap each letter to see its sound!</p></div>
    <div class="content-grid">${LETTER_SOUNDS.map(l => `
      <div class="content-item" data-speak="${encodeURIComponent(l.letter + '. ' + l.sound)}" style="cursor:pointer">
        <span class="item-emoji" style="font-size:2.2rem">${l.letter}</span>
        <div style="font-size:0.8rem;color:#7c4dff;margin-top:4px">${l.sound}</div>
        <span class="speak-icon">🔊</span>
      </div>
    `).join('')}</div></div>`;
}

// 10. Hindi Words (2,3,4 letters)
function renderHindiWords(sid) {
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3 style="font-family:var(--font-hindi)">📝 दो, तीन और चार अक्षर वाले शब्द</h3>
    <div class="category-title">📗 दो अक्षर वाले शब्द (2-Letter Words)</div>
    <div class="content-grid">${HINDI_2_LETTER.map(w => `<div class="content-item hindi" data-speak="${encodeURIComponent(w)}" data-lang="hi-IN" style="cursor:pointer">${w} <span class="speak-icon">🔊</span></div>`).join('')}</div>
    <div class="category-title" style="margin-top:16px">📘 तीन अक्षर वाले शब्द (3-Letter Words)</div>
    <div class="content-grid">${HINDI_3_LETTER.map(w => `<div class="content-item hindi" data-speak="${encodeURIComponent(w)}" data-lang="hi-IN" style="cursor:pointer">${w} <span class="speak-icon">🔊</span></div>`).join('')}</div>
    <div class="category-title" style="margin-top:16px">📕 चार अक्षर वाले शब्द (4-Letter Words)</div>
    <div class="content-grid">${HINDI_4_LETTER.map(w => `<div class="content-item hindi" data-speak="${encodeURIComponent(w)}" data-lang="hi-IN" style="cursor:pointer">${w} <span class="speak-icon">🔊</span></div>`).join('')}</div>
    </div>`;
}

// 11. Hindi Swar & Vyanjan words
function renderHindiSwarVyanjan(sid) {
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3 style="font-family:var(--font-hindi)">🔤 स्वर और व्यंजन से शुरू होने वाले शब्द</h3>
    <div class="category-title">🔴 स्वर से शुरू होने वाले शब्द</div>
    ${HINDI_SWAR_WORDS.map(s => `
      <div style="margin:10px 0;padding:12px;background:#fff0f5;border-radius:12px;border-left:4px solid #ff4081;cursor:pointer" data-speak="${encodeURIComponent(s.letter + '. ' + s.words.join(', '))}" data-lang="hi-IN">
        <strong style="font-family:var(--font-hindi);font-size:1.3rem;color:#ff4081">${s.letter}</strong>
        <span style="margin-left:12px;font-family:var(--font-hindi)">${s.words.join(', ')}</span>
        <span class="speak-icon" style="float:right">🔊</span>
      </div>
    `).join('')}
    <div class="category-title" style="margin-top:20px">🔵 व्यंजन से शुरू होने वाले शब्द</div>
    ${HINDI_VYANJAN_WORDS.map(s => `
      <div style="margin:10px 0;padding:12px;background:#e8eaf6;border-radius:12px;border-left:4px solid #448aff;cursor:pointer" data-speak="${encodeURIComponent(s.letter + '. ' + s.words.join(', '))}" data-lang="hi-IN">
        <strong style="font-family:var(--font-hindi);font-size:1.3rem;color:#448aff">${s.letter}</strong>
        <span style="margin-left:12px;font-family:var(--font-hindi)">${s.words.join(', ')}</span>
        <span class="speak-icon" style="float:right">🔊</span>
      </div>
    `).join('')}
    </div>`;
}

// 12. Hindi Join Letters
function renderHindiJoin(sid) {
  const joinExamples = [
    {parts:['क','म','ल'],word:'कमल',meaning:'Lotus 🌸'},
    {parts:['न','म','क'],word:'नमक',meaning:'Salt 🧂'},
    {parts:['स','ड़','क'],word:'सड़क',meaning:'Road 🛣️'},
    {parts:['क','ल','म'],word:'कलम',meaning:'Pen ✏️'},
    {parts:['अ','म','र'],word:'अमर',meaning:'Immortal ✨'},
    {parts:['च','म','क'],word:'चमक',meaning:'Shine ✨'}
  ];
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3 style="font-family:var(--font-hindi)">✏️ अक्षर जोड़कर लिखना</h3>
    <div class="info-box"><p class="hindi-text">अक्षरों को जोड़कर शब्द बनाओ! Join the letters to make words!</p></div>
    ${joinExamples.map(e => `
      <div style="margin:14px 0;padding:18px;background:linear-gradient(135deg,#f8f6ff,#fff5f8);border-radius:16px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;border:2px solid #ece6ff;cursor:pointer" data-speak="${encodeURIComponent(e.parts.join(' ') + ' equals ' + e.word)}" data-lang="hi-IN">
        ${e.parts.map(p => `<span style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;background:white;border-radius:12px;font-family:var(--font-hindi);font-size:1.4rem;font-weight:700;color:#7c4dff;border:2px solid #d0c0ff">${p}</span>`).join('<span style="font-size:1.5rem;color:#ccc">+</span>')}
        <span style="font-size:1.5rem;color:#ff6d00;margin:0 6px">=</span>
        <span style="padding:8px 18px;background:linear-gradient(135deg,#7c4dff,#ff4081);color:white;border-radius:50px;font-family:var(--font-hindi);font-size:1.2rem;font-weight:700">${e.word}</span>
        <span style="color:#999;font-size:0.85rem;margin-left:8px">${e.meaning}</span>
        <span class="speak-icon">🔊</span>
      </div>
    `).join('')}
    </div>`;
}

// 13. Hindi Matra
function renderHindiMatra(sid) {
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3 style="font-family:var(--font-hindi)">📝 ए की मात्रा वाले शब्द</h3>
    <div class="info-box"><p class="hindi-text">ए की मात्रा " े " लगाकर शब्द बनाए जाते हैं।</p></div>
    <div class="content-grid">${HINDI_MATRA_E.map(w => `
      <div class="content-item hindi" style="font-size:1.3rem;cursor:pointer" data-speak="${encodeURIComponent(w.word)}" data-lang="hi-IN">${w.word}<br><small style="color:#999;font-family:var(--font)">${w.meaning}</small><span class="speak-icon">🔊</span></div>
    `).join('')}</div>
    </div>`;
}

// 14. Hindi Fill Blanks
function renderHindiFill(sid) {
  app.innerHTML = `${backBtn(sid)}
    <div class="worksheet-container"><h3 style="font-family:var(--font-hindi)">✏️ खाली स्थान भरो</h3>
    <p class="worksheet-desc">Fill in the missing letter! सही अक्षर भरो!</p>
    <div class="score-bar"><span class="stars">⭐</span><span class="score-text" id="fill-score">Score: 0 / ${HINDI_FILL_BLANKS.length}</span></div>
    ${HINDI_FILL_BLANKS.map((q, i) => `
      <div class="fill-blank-q">
        <span style="color:#999;margin-right:4px">${q.hint}</span>
        ${q.parts.map(p => p === '_' ?
          `<input class="hindi" maxlength="1" data-answer="${q.answer}" data-idx="${i}" onkeyup="checkFillBlank(this)">` :
          `<span class="word-part hindi">${p}</span>`
        ).join('')}
      </div>
    `).join('')}
    <div id="fill-result"></div>
    </div>`;
}

let fillScore = 0;
function checkFillBlank(input) {
  if (input.classList.contains('correct') || input.classList.contains('wrong')) return;
  const val = input.value.trim();
  if (!val) return;
  if (val === input.dataset.answer) {
    input.classList.add('correct');
    fillScore++;
    playSound('correct');
  } else {
    input.classList.add('wrong');
    playSound('wrong');
    setTimeout(() => { input.classList.remove('wrong'); input.value = ''; }, 800);
    return;
  }
  $('#fill-score').textContent = `Score: ${fillScore} / ${HINDI_FILL_BLANKS.length}`;
  if (fillScore === HINDI_FILL_BLANKS.length) {
    showConfetti();
    $('#fill-result').innerHTML = `<div class="result-box"><span class="result-emoji">🌟</span><div class="result-text">शाबाश! Well Done!</div></div>`;
  }
}

// 15. Hindi Alphabets (Oral)
function renderHindiAlphabets(sid) {
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3 style="font-family:var(--font-hindi)">🔤 स्वर और व्यंजन</h3>
    <div class="category-title">🔴 स्वर (Vowels) — ${HINDI_SWAR.length}</div>
    <div class="letter-grid">${HINDI_SWAR.map(s => `<div class="letter-cell vowel hindi" data-speak="${encodeURIComponent(s)}" data-lang="hi-IN" style="cursor:pointer">${s}</div>`).join('')}</div>
    <div class="category-title" style="margin-top:20px">🔵 व्यंजन (Consonants) — ${HINDI_VYANJAN.length}</div>
    <div class="letter-grid">${HINDI_VYANJAN.map(v => `<div class="letter-cell consonant hindi" data-speak="${encodeURIComponent(v)}" data-lang="hi-IN" style="cursor:pointer">${v}</div>`).join('')}</div>
    </div>`;
}

// 16. Hindi Recognition
function renderHindiRecognition(sid) {
  const allLetters = shuffle([...HINDI_SWAR.slice(0,5), ...HINDI_VYANJAN.slice(0,10)]);
  app.innerHTML = `${backBtn(sid)}
    <div class="worksheet-container"><h3 style="font-family:var(--font-hindi)">🔍 शब्दों और अक्षरों की पहचान</h3>
    <p class="worksheet-desc">Tap the letter to see if it's a स्वर (Vowel) or व्यंजन (Consonant)!</p>
    <div class="letter-grid">${allLetters.map(l => `
      <div class="letter-cell hindi" style="background:#f0e8ff;color:#555;border-color:#d0c0ff;cursor:pointer"
        data-speak="${encodeURIComponent(l)}" data-lang="hi-IN"
        onclick="revealHindiLetter(this,'${l}')">
        ${l}
      </div>
    `).join('')}</div>
    </div>`;
}

function revealHindiLetter(el, letter) {
  playClick();
  const isVowel = HINDI_SWAR.includes(letter);
  if (isVowel) {
    el.className = 'letter-cell hindi vowel';
    el.innerHTML = letter + '<br><small style="font-size:0.6rem;font-family:var(--font)">स्वर</small>';
  } else {
    el.className = 'letter-cell hindi consonant';
    el.innerHTML = letter + '<br><small style="font-size:0.6rem;font-family:var(--font)">व्यंजन</small>';
  }
}

// 17. Hindi Intro
function renderHindiIntro(sid) {
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3 style="font-family:var(--font-hindi)">🙋 अपना परिचय</h3>
    <div class="info-box" data-speak="${encodeURIComponent(HINDI_INTRO.join('. '))}" data-lang="hi-IN" style="cursor:pointer">
      <p class="hindi-text" style="font-size:1.1rem;line-height:2">
      ${HINDI_INTRO.map(l => `<span style="display:block;margin:6px 0">${l}</span>`).join('')}
    </p>
    <span class="speak-icon" style="display:block;text-align:center;font-size:1.2rem">🔊 Tap to hear</span>
    </div>
    <div style="margin-top:20px;padding:20px;background:linear-gradient(135deg,#e8f5e9,#f1f8e9);border-radius:16px;border-left:4px solid #00c853">
      <p style="font-weight:700;color:#00c853;margin-bottom:8px">💡 Practice Tip</p>
      <p style="color:#555;font-size:0.95rem">Fill in the blanks about yourself and practice saying it aloud! अपने बारे में भरो और ज़ोर से बोलो!</p>
    </div>
    </div>`;
}

// 18. Hindi Words Oral
function renderHindiWordsOral(sid) { renderHindiWords(sid); }

// 19. Number Names
function renderNumNames(sid) {
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3>🔢 Number Names (1 to 10)</h3>
    <div class="content-grid">${NUMBER_NAMES.map(n => `
      <div class="content-item" data-speak="${encodeURIComponent(n.name)}" style="cursor:pointer"><span class="item-emoji">${n.emoji}</span><strong style="font-size:1.3rem">${n.num}</strong><br>${n.name}<span class="speak-icon">🔊</span></div>
    `).join('')}</div>
    <hr class="divider">
    <h3>✏️ Match the Number!</h3><div id="numname-quiz"></div></div>`;
  renderNumNameQuiz();
}

function renderNumNameQuiz() {
  const qs = shuffle(NUMBER_NAMES).slice(0, 5).map(n => ({
    q: `What is the number name for <strong>${n.num}</strong>?`,
    opts: shuffle([n.name, ...shuffle(NUMBER_NAMES.filter(x => x.num !== n.num)).slice(0, 3).map(x => x.name)]),
    ans: n.name
  }));
  $('#numname-quiz').innerHTML = qs.map((q, i) => `
    <div class="quiz-question"><div class="q-text">${i + 1}. ${q.q}</div>
    <div class="quiz-options">${q.opts.map(o =>
      `<div class="quiz-option" onclick="checkAnswer(this,'${o}','${q.ans}')">${o}</div>`
    ).join('')}</div></div>`).join('');
}

// 20. Ordinal Numbers
function renderOrdinal(sid) {
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3>🏅 Ordinal Numbers (1 to 5)</h3>
    <div class="info-box" data-speak="${encodeURIComponent('Ordinal numbers tell us the position or order of things.')}" style="cursor:pointer"><p>Ordinal numbers tell us the <strong>position</strong> or <strong>order</strong> of things. <span class="speak-icon">🔊</span></p></div>
    <table class="ordinal-table"><tr><th>Position</th><th>Ordinal</th><th>Name</th><th></th></tr>
    ${ORDINALS.map(o => `<tr data-speak="${encodeURIComponent(o.num + '. ' + o.name)}" style="cursor:pointer"><td>${o.num}</td><td>${o.ordinal}</td><td>${o.name}</td><td>${o.emoji} 🔊</td></tr>`).join('')}
    </table></div>`;
}

// 21. Math Operations
function renderMathOps(sid) {
  app.innerHTML = `${backBtn(sid)}
    <div class="worksheet-container"><h3>➕➖ Addition & Subtraction</h3>
    <p class="worksheet-desc">Count the objects and type the answer!</p>
    <div class="tab-bar">
      <button class="tab-btn active" onclick="showMathTab('add',this)">➕ Addition</button>
      <button class="tab-btn" onclick="showMathTab('sub',this)">➖ Subtraction</button>
    </div>
    <div id="math-content"></div>
    </div>`;
  showMathTab('add', document.querySelector('.tab-btn'));
}

function showMathTab(type, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const problems = type === 'add' ? MATH_ADDITION : MATH_SUBTRACTION;
  const op = type === 'add' ? '+' : '−';
  $('#math-content').innerHTML = problems.slice(0, 6).map((p, i) => `
    <div class="quiz-question" style="text-align:center" data-speak="${encodeURIComponent(p.a + ' ' + (type === 'add' ? 'plus' : 'minus') + ' ' + p.b + ' equals?')}">
      <div class="math-visual">
        <div class="math-objects">${p.emoji.repeat(p.a)}</div>
        <div class="math-operator">${op}</div>
        <div class="math-objects">${p.emoji.repeat(p.b)}</div>
        <div class="math-equals">=</div>
        <input class="math-answer-input" type="number" min="0" max="20" data-answer="${type === 'add' ? p.a + p.b : p.a - p.b}" data-idx="${i}" onkeyup="checkMathAnswer(this)">
      </div>
      <div style="font-size:1.3rem;font-weight:700;color:#888;margin-top:8px">${p.a} ${op} ${p.b} = ? <span class="speak-icon">🔊</span></div>
    </div>
  `).join('');
}

function checkMathAnswer(input) {
  if (input.classList.contains('correct')) return;
  const val = parseInt(input.value);
  const ans = parseInt(input.dataset.answer);
  if (isNaN(val)) return;
  if (val === ans) {
    input.classList.add('correct');
    playSound('correct');
  } else if (input.value.length >= String(ans).length) {
    input.classList.add('wrong');
    playSound('wrong');
    setTimeout(() => { input.classList.remove('wrong'); input.value = ''; }, 800);
  }
}

// 22. Backward Counting
function renderBackward(sid) {
  const nums = [];
  for (let i = 20; i >= 1; i--) nums.push(i);
  const colors = ['#ff4081','#7c4dff','#448aff','#00c853','#ff6d00','#ffd600','#00e5ff'];
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3>🔙 Backward Counting (20 to 1)</h3>
    <div class="info-box"><p>Count backwards from <strong>20 to 1</strong>! Tap each number as you count!</p></div>
    <div class="number-line">${nums.map((n, i) => `
      <div class="number-bubble" data-speak="${encodeURIComponent(String(n))}" style="background:${colors[i % 7]}22;color:${colors[i % 7]};border-color:${colors[i % 7]}"
        onclick="this.classList.toggle('active');this.style.background=this.classList.contains('active')?'${colors[i % 7]}':'${colors[i % 7]}22';this.style.color=this.classList.contains('active')?'white':'${colors[i % 7]}'">${n}</div>
    `).join('')}</div></div>`;
}

// 23. Ascending Order
function renderAscending(sid) {
  const sets = [
    shuffle([3, 1, 5, 2, 4]),
    shuffle([8, 6, 10, 7, 9]),
    shuffle([15, 12, 18, 11, 14]),
    shuffle([4, 9, 2, 7, 1])
  ];
  app.innerHTML = `${backBtn(sid)}
    <div class="worksheet-container"><h3>📈 Arrange in Ascending Order</h3>
    <p class="worksheet-desc">Tap the numbers in order from smallest to largest!</p>
    ${sets.map((s, si) => `
      <div class="quiz-question" id="asc-${si}">
        <div class="q-text">${si + 1}. Arrange: ${s.join(', ')}</div>
        <div class="sort-items">${s.map(n =>
          `<span class="sort-item" onclick="pickAscNum(this,${si})">${n}</span>`
        ).join('')}</div>
        <div style="margin-top:10px;font-weight:700;color:#00c853" id="asc-ans-${si}">Your order: </div>
      </div>
    `).join('')}
    </div>`;
  window._ascState = sets.map(s => ({ sorted: [...s].sort((a, b) => a - b), picked: [], done: false }));
}

function pickAscNum(el, setIdx) {
  const state = window._ascState[setIdx];
  if (state.done || el.classList.contains('placed')) return;
  const num = parseInt(el.textContent);
  const expected = state.sorted[state.picked.length];
  if (num === expected) {
    el.classList.add('placed');
    state.picked.push(num);
    playSound('correct');
    $(`#asc-ans-${setIdx}`).textContent = 'Your order: ' + state.picked.join(', ');
    if (state.picked.length === state.sorted.length) {
      state.done = true;
      $(`#asc-ans-${setIdx}`).innerHTML += ' ✅';
      const allDone = window._ascState.every(s => s.done);
      if (allDone) showConfetti();
    }
  } else {
    playSound('wrong');
    el.style.animation = 'shake 0.4s ease';
    setTimeout(() => el.style.animation = '', 400);
  }
}

// 24-27. Oral versions
function renderNumNamesOral(sid) { renderNumNames(sid); }
function renderOrdinalOral(sid) { renderOrdinal(sid); }
function renderBackwardOral(sid) { renderBackward(sid); }

// 28. Shapes
function renderShapes(sid) {
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3>🔶 Names of Shapes</h3>
    <div class="shapes-grid">${SHAPES.map(s => `
      <div class="shape-card" data-speak="${encodeURIComponent(s.name)}" style="cursor:pointer">
        <div class="shape-svg"><svg viewBox="0 0 60 60">${s.svg}</svg></div>
        <div class="shape-name">${s.emoji} ${s.name} 🔊</div>
      </div>
    `).join('')}</div>
    <hr class="divider">
    <h3>✏️ Shape Quiz</h3><div id="shape-quiz"></div></div>`;
  renderShapeQuiz();
}

function renderShapeQuiz() {
  const qs = shuffle(SHAPES).slice(0, 4).map(s => ({
    q: `<svg viewBox="0 0 60 60" width="80" height="80">${s.svg}</svg><br>What shape is this?`,
    opts: shuffle([s.name, ...shuffle(SHAPES.filter(x => x.name !== s.name)).slice(0, 3).map(x => x.name)]),
    ans: s.name
  }));
  $('#shape-quiz').innerHTML = qs.map((q, i) => `
    <div class="quiz-question"><div class="q-text" style="text-align:center">${q.q}</div>
    <div class="quiz-options">${q.opts.map(o =>
      `<div class="quiz-option" onclick="checkAnswer(this,'${o}','${q.ans}')">${o}</div>`
    ).join('')}</div></div>`).join('');
}

// 29. Transport
function renderTransport(sid) {
  const types = ['Road', 'Air', 'Water'];
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3>🚗 Modes of Transport</h3>
    ${types.map(t => renderCategorySection(`${t} Transport`, t === 'Road' ? '🛣️' : t === 'Air' ? '✈️' : '🌊',
      TRANSPORT.filter(tr => tr.type === t))).join('')}
    </div>`;
}

// 30. EVS Animals
function renderEVSAnimals(sid) {
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3>🐾 Types of Animals</h3>
    ${renderCategorySection('Domestic Animals 🏡','🐄',ANIMALS.domestic)}
    ${renderCategorySection('Pet Animals 🏠','🐕',ANIMALS.pet)}
    ${renderCategorySection('Wild Animals 🌿','🦁',ANIMALS.wild)}
    ${renderCategorySection('Water Animals 🌊','🐟',ANIMALS.water)}
    </div>`;
}

// 31. Community Helpers
function renderHelpers(sid) {
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3>👨‍⚕️ Community Helpers</h3>
    <div class="info-box"><p><strong>Community helpers</strong> are people who help us in our daily lives.</p></div>
    ${renderGrid(COMMUNITY_HELPERS)}
    </div>`;
}

// 32. Water Sources
function renderWater(sid) {
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3>💧 Sources of Water</h3>
    <div class="info-box"><p>Water is very important for life. We get water from many <strong>sources</strong>.</p></div>
    ${renderGrid(WATER_SOURCES)}
    </div>`;
}

// 33. Celebrations
function renderCelebrations(sid) {
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3>🎉 Celebrations</h3>
    <div class="info-box"><p>We celebrate many <strong>festivals</strong> and <strong>national days</strong> in India!</p></div>
    ${renderGrid(CELEBRATIONS)}
    </div>`;
}

// 34. Communication Q&A
function renderCommQA(sid) {
  app.innerHTML = `${backBtn(sid)}
    <div class="lesson-container"><h3>💬 Questions & Answers</h3>
    <p class="worksheet-desc">Tap each card to reveal the answer!</p>
    <div class="flashcard-grid">${COMM_QA.map((qa, i) => `
      <div class="flashcard" onclick="this.classList.toggle('flipped');playClick()">
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <div class="q-num">${i + 1}</div>
            <div>${qa.q}</div>
            <div class="tap-hint">👆 Tap to see answer</div>
          </div>
          <div class="flashcard-back">
            <div>✅ ${qa.a}</div>
          </div>
        </div>
      </div>
    `).join('')}</div></div>`;
}

// ==================== SERVICE WORKER ====================
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

// ==================== INIT ====================
renderHome();
