// ==================== ALL CONTENT DATA ====================
const SUBJECTS = [
  { id: 'eng-w', label: 'English Written', icon: '✏️', color: 'purple', sublabel: 'Reading & Writing' },
  { id: 'eng-o', label: 'English Oral', icon: '🗣️', color: 'pink', sublabel: 'Speaking & Sounds' },
  { id: 'hin-w', label: 'Hindi Written', icon: '📝', color: 'orange', sublabel: 'हिन्दी लेखन' },
  { id: 'hin-o', label: 'Hindi Oral', icon: '🎤', color: 'red', sublabel: 'हिन्दी बोलना' },
  { id: 'math-w', label: 'Maths Written', icon: '🔢', color: 'blue', sublabel: 'Numbers & Sums' },
  { id: 'math-o', label: 'Maths Oral', icon: '🧮', color: 'cyan', sublabel: 'Counting & Shapes' },
  { id: 'evs', label: 'EVS', icon: '🌍', color: 'green', sublabel: 'World Around Us' },
  { id: 'comm', label: 'Communication', icon: '💬', color: 'yellow', sublabel: 'Q & A' }
];

const TOPICS = {
  'eng-w': [
    { title: 'Sort Vowels & Consonants', type: 'sort-vowels' },
    { title: 'Examples of Noun', type: 'lesson-nouns' },
    { title: 'Fruits, Vegetables & Colours', type: 'lesson-fvc' },
    { title: 'Animals & Seasons', type: 'lesson-animals' },
    { title: 'Pictures of Universe', type: 'lesson-universe' }
  ],
  'eng-o': [
    { title: 'Alphabets — Vowels & Consonants', type: 'lesson-alphabets' },
    { title: 'Word Family (a, e, i, o, u)', type: 'lesson-wordfamily' },
    { title: 'Definition of Noun', type: 'lesson-noun-def' },
    { title: 'Sounds of Letters', type: 'lesson-sounds' }
  ],
  'hin-w': [
    { title: 'दो, तीन और चार अक्षर वाले शब्द', type: 'lesson-hindi-words' },
    { title: 'स्वर और व्यंजन से शुरू होने वाले शब्द', type: 'lesson-hindi-swar' },
    { title: 'अक्षर जोड़कर लिखना', type: 'lesson-hindi-join' },
    { title: 'ए की मात्रा वाले शब्द', type: 'lesson-hindi-matra' },
    { title: 'खाली स्थान भरो', type: 'worksheet-hindi-fill' }
  ],
  'hin-o': [
    { title: 'स्वर और व्यंजन', type: 'lesson-hindi-alphabets' },
    { title: 'शब्दों और अक्षरों की पहचान', type: 'lesson-hindi-recognition' },
    { title: 'अपना परिचय', type: 'lesson-hindi-intro' },
    { title: 'दो, तीन और चार अक्षर वाले शब्द', type: 'lesson-hindi-words-oral' }
  ],
  'math-w': [
    { title: 'Number Names (1 to 10)', type: 'lesson-numnames' },
    { title: 'Ordinal Numbers (1 to 5)', type: 'lesson-ordinal' },
    { title: 'Addition & Subtraction', type: 'worksheet-math-ops' },
    { title: 'Backward Counting (20 to 1)', type: 'lesson-backward' },
    { title: 'Ascending Order', type: 'worksheet-ascending' }
  ],
  'math-o': [
    { title: 'Number Names', type: 'lesson-numnames-oral' },
    { title: 'Ordinal Numbers', type: 'lesson-ordinal-oral' },
    { title: 'Names of Shapes', type: 'lesson-shapes' },
    { title: 'Backward Counting', type: 'lesson-backward-oral' }
  ],
  'evs': [
    { title: 'Fruits, Vegetables & Colours', type: 'lesson-evs-fvc' },
    { title: 'Modes of Transport', type: 'lesson-transport' },
    { title: 'Universe', type: 'lesson-evs-universe' },
    { title: 'Types of Animals', type: 'lesson-evs-animals' },
    { title: 'Community Helpers', type: 'lesson-helpers' },
    { title: 'Sources of Water', type: 'lesson-water' },
    { title: 'Celebrations', type: 'lesson-celebrations' }
  ],
  'comm': [
    { title: 'All Questions & Answers', type: 'lesson-comm-qa' }
  ]
};

const VOWELS = ['A','E','I','O','U'];
const CONSONANTS = ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'];

const FRUITS = [
  {name:'Apple',emoji:'🍎'},{name:'Banana',emoji:'🍌'},{name:'Mango',emoji:'🥭'},
  {name:'Grapes',emoji:'🍇'},{name:'Orange',emoji:'🍊'},{name:'Watermelon',emoji:'🍉'},
  {name:'Strawberry',emoji:'🍓'},{name:'Pineapple',emoji:'🍍'},{name:'Cherry',emoji:'🍒'},
  {name:'Pear',emoji:'🍐'},{name:'Peach',emoji:'🍑'},{name:'Coconut',emoji:'🥥'}
];

const VEGETABLES = [
  {name:'Carrot',emoji:'🥕'},{name:'Potato',emoji:'🥔'},{name:'Tomato',emoji:'🍅'},
  {name:'Onion',emoji:'🧅'},{name:'Corn',emoji:'🌽'},{name:'Broccoli',emoji:'🥦'},
  {name:'Mushroom',emoji:'🍄'},{name:'Eggplant',emoji:'🍆'},{name:'Cucumber',emoji:'🥒'},
  {name:'Pepper',emoji:'🌶️'},{name:'Garlic',emoji:'🧄'},{name:'Peas',emoji:'🫛'}
];

const COLOURS = [
  {name:'Red',emoji:'🔴',hex:'#ff1744'},{name:'Blue',emoji:'🔵',hex:'#448aff'},
  {name:'Green',emoji:'🟢',hex:'#00c853'},{name:'Yellow',emoji:'🟡',hex:'#ffd600'},
  {name:'Orange',emoji:'🟠',hex:'#ff6d00'},{name:'Purple',emoji:'🟣',hex:'#7c4dff'},
  {name:'Pink',emoji:'🩷',hex:'#ff4081'},{name:'White',emoji:'⚪',hex:'#e0e0e0'},
  {name:'Black',emoji:'⚫',hex:'#333333'},{name:'Brown',emoji:'🟤',hex:'#795548'}
];

const ANIMALS = {
  wild: [{name:'Lion',emoji:'🦁'},{name:'Tiger',emoji:'🐯'},{name:'Elephant',emoji:'🐘'},{name:'Bear',emoji:'🐻'},{name:'Wolf',emoji:'🐺'},{name:'Fox',emoji:'🦊'},{name:'Deer',emoji:'🦌'},{name:'Monkey',emoji:'🐒'}],
  pet: [{name:'Dog',emoji:'🐕'},{name:'Cat',emoji:'🐈'},{name:'Rabbit',emoji:'🐇'},{name:'Parrot',emoji:'🦜'},{name:'Fish',emoji:'🐠'},{name:'Hamster',emoji:'🐹'},{name:'Turtle',emoji:'🐢'}],
  water: [{name:'Fish',emoji:'🐟'},{name:'Whale',emoji:'🐋'},{name:'Dolphin',emoji:'🐬'},{name:'Octopus',emoji:'🐙'},{name:'Shark',emoji:'🦈'},{name:'Crab',emoji:'🦀'},{name:'Seahorse',emoji:'🪸'}],
  domestic: [{name:'Cow',emoji:'🐄'},{name:'Horse',emoji:'🐴'},{name:'Goat',emoji:'🐐'},{name:'Sheep',emoji:'🐑'},{name:'Hen',emoji:'🐔'},{name:'Duck',emoji:'🦆'},{name:'Pig',emoji:'🐷'}]
};

const SEASONS = [
  {name:'Summer',emoji:'☀️',desc:'Hot & sunny days'},{name:'Rainy / Monsoon',emoji:'🌧️',desc:'Lots of rain'},
  {name:'Autumn',emoji:'🍂',desc:'Leaves fall down'},{name:'Winter',emoji:'❄️',desc:'Cold & cozy'},
  {name:'Spring',emoji:'🌸',desc:'Flowers bloom'},{name:'Late Autumn',emoji:'🍁',desc:'Cool & breezy'}
];

const UNIVERSE = [
  {name:'Sun',emoji:'☀️',desc:'A big, hot star'},{name:'Moon',emoji:'🌙',desc:'Shines at night'},
  {name:'Stars',emoji:'⭐',desc:'Twinkle in the sky'},{name:'Earth',emoji:'🌍',desc:'Our home planet'},
  {name:'Clouds',emoji:'☁️',desc:'Made of water'},{name:'Rainbow',emoji:'🌈',desc:'Seven colours'},
  {name:'Planets',emoji:'🪐',desc:'Go around the sun'},{name:'Rocket',emoji:'🚀',desc:'Goes to space'}
];

const NOUNS = {
  person: [{name:'Teacher',emoji:'👩‍🏫'},{name:'Doctor',emoji:'👨‍⚕️'},{name:'Father',emoji:'👨'},{name:'Mother',emoji:'👩'},{name:'Child',emoji:'🧒'},{name:'Farmer',emoji:'👨‍🌾'}],
  place: [{name:'School',emoji:'🏫'},{name:'Hospital',emoji:'🏥'},{name:'Park',emoji:'🏞️'},{name:'Home',emoji:'🏠'},{name:'Market',emoji:'🏪'},{name:'Temple',emoji:'🛕'}],
  animal: [{name:'Dog',emoji:'🐕'},{name:'Cat',emoji:'🐈'},{name:'Bird',emoji:'🐦'},{name:'Cow',emoji:'🐄'},{name:'Fish',emoji:'🐟'},{name:'Lion',emoji:'🦁'}],
  thing: [{name:'Book',emoji:'📚'},{name:'Ball',emoji:'⚽'},{name:'Pen',emoji:'🖊️'},{name:'Chair',emoji:'🪑'},{name:'Table',emoji:'🪑'},{name:'Clock',emoji:'🕐'}]
};

const WORD_FAMILIES = {
  a: ['cat','bat','hat','mat','rat','sat','fan','man','can','van','pan','ran'],
  e: ['hen','pen','ten','men','den','bed','red','fed','led','wet','net','pet'],
  i: ['sit','bit','fit','hit','kit','lit','pit','pin','bin','din','fin','tin'],
  o: ['hot','pot','dot','got','not','lot','cot','box','fox','mop','top','hop'],
  u: ['cup','pup','but','cut','hut','nut','run','fun','sun','bus','bug','rug']
};

const LETTER_SOUNDS = [
  {letter:'A',sound:'æ (as in Apple 🍎)'},{letter:'B',sound:'buh (as in Ball ⚽)'},
  {letter:'C',sound:'kuh (as in Cat 🐈)'},{letter:'D',sound:'duh (as in Dog 🐕)'},
  {letter:'E',sound:'eh (as in Egg 🥚)'},{letter:'F',sound:'fuh (as in Fish 🐟)'},
  {letter:'G',sound:'guh (as in Goat 🐐)'},{letter:'H',sound:'huh (as in Hat 🎩)'},
  {letter:'I',sound:'ih (as in Igloo 🏔️)'},{letter:'J',sound:'juh (as in Jug 🫗)'},
  {letter:'K',sound:'kuh (as in Kite 🪁)'},{letter:'L',sound:'luh (as in Lion 🦁)'},
  {letter:'M',sound:'muh (as in Mango 🥭)'},{letter:'N',sound:'nuh (as in Nest 🪹)'},
  {letter:'O',sound:'oh (as in Orange 🍊)'},{letter:'P',sound:'puh (as in Pen 🖊️)'},
  {letter:'Q',sound:'kwuh (as in Queen 👸)'},{letter:'R',sound:'ruh (as in Rabbit 🐇)'},
  {letter:'S',sound:'sss (as in Sun ☀️)'},{letter:'T',sound:'tuh (as in Tiger 🐯)'},
  {letter:'U',sound:'uh (as in Umbrella ☂️)'},{letter:'V',sound:'vuh (as in Van 🚐)'},
  {letter:'W',sound:'wuh (as in Watch ⌚)'},{letter:'X',sound:'ks (as in Box 📦)'},
  {letter:'Y',sound:'yuh (as in Yak 🐂)'},{letter:'Z',sound:'zzz (as in Zebra 🦓)'}
];

const HINDI_SWAR = ['अ','आ','इ','ई','उ','ऊ','ए','ऐ','ओ','औ','अं','अः'];
const HINDI_VYANJAN = ['क','ख','ग','घ','ङ','च','छ','ज','झ','ञ','ट','ठ','ड','ढ','ण','त','थ','द','ध','न','प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह'];

const HINDI_2_LETTER = ['अब','कल','घर','जल','नल','दल','पल','बम','रथ','वन','हम','मन'];
const HINDI_3_LETTER = ['कमल','अमर','नमक','कलम','सफल','अजय','अचल','चमक','दमक','अनार'];
const HINDI_4_LETTER = ['अमरूद','कबूतर','चमकना','मटकना','अचकना','पतंगा','कटहल','बरगद'];

const HINDI_MATRA_E = [
  {word:'मेला',meaning:'Fair'},{word:'सेब',meaning:'Apple'},{word:'खेल',meaning:'Game'},
  {word:'रेल',meaning:'Train'},{word:'बेल',meaning:'Vine'},{word:'तेल',meaning:'Oil'},
  {word:'शेर',meaning:'Lion'},{word:'पेड़',meaning:'Tree'}
];

const HINDI_FILL_BLANKS = [
  {parts:['क','_','ल'],answer:'म',hint:'🌸 Flower'},{parts:['न','_','क'],answer:'म',hint:'🧂 Salt'},
  {parts:['_','ल'],answer:'ज',hint:'💧 Water'},{parts:['घ','_'],answer:'र',hint:'🏠 Home'},
  {parts:['प','_','ल'],answer:'ह',hint:'🎡 Wheel'},{parts:['_','म'],answer:'ह',hint:'👥 We'},
  {parts:['क','ल','_'],answer:'म',hint:'✏️ Pen'},{parts:['_','न'],answer:'व',hint:'🌲 Forest'}
];

const NUMBER_NAMES = [
  {num:1,name:'One',emoji:'1️⃣'},{num:2,name:'Two',emoji:'2️⃣'},
  {num:3,name:'Three',emoji:'3️⃣'},{num:4,name:'Four',emoji:'4️⃣'},
  {num:5,name:'Five',emoji:'5️⃣'},{num:6,name:'Six',emoji:'6️⃣'},
  {num:7,name:'Seven',emoji:'7️⃣'},{num:8,name:'Eight',emoji:'8️⃣'},
  {num:9,name:'Nine',emoji:'9️⃣'},{num:10,name:'Ten',emoji:'🔟'}
];

const ORDINALS = [
  {num:1,ordinal:'1st',name:'First',emoji:'🥇'},
  {num:2,ordinal:'2nd',name:'Second',emoji:'🥈'},
  {num:3,ordinal:'3rd',name:'Third',emoji:'🥉'},
  {num:4,ordinal:'4th',name:'Fourth',emoji:'4️⃣'},
  {num:5,ordinal:'5th',name:'Fifth',emoji:'5️⃣'}
];

const SHAPES = [
  {name:'Circle',emoji:'⭕',svg:'<circle cx="30" cy="30" r="25" fill="#ff4081" opacity="0.8"/>'},
  {name:'Square',emoji:'⬜',svg:'<rect x="5" y="5" width="50" height="50" rx="3" fill="#448aff" opacity="0.8"/>'},
  {name:'Triangle',emoji:'🔺',svg:'<polygon points="30,5 5,55 55,55" fill="#00c853" opacity="0.8"/>'},
  {name:'Rectangle',emoji:'▬',svg:'<rect x="2" y="12" width="56" height="36" rx="3" fill="#ff6d00" opacity="0.8"/>'},
  {name:'Star',emoji:'⭐',svg:'<polygon points="30,5 36,22 55,22 40,34 46,52 30,42 14,52 20,34 5,22 24,22" fill="#ffd600" opacity="0.8"/>'},
  {name:'Diamond',emoji:'💎',svg:'<polygon points="30,5 55,30 30,55 5,30" fill="#7c4dff" opacity="0.8"/>'},
  {name:'Oval',emoji:'🥚',svg:'<ellipse cx="30" cy="30" rx="28" ry="20" fill="#e91e63" opacity="0.8"/>'},
  {name:'Heart',emoji:'❤️',svg:'<path d="M30 50 C10 35 0 20 10 12 C20 4 30 14 30 20 C30 14 40 4 50 12 C60 20 50 35 30 50Z" fill="#f44336" opacity="0.8"/>'}
];

const TRANSPORT = [
  {name:'Car',emoji:'🚗',type:'Road'},{name:'Bus',emoji:'🚌',type:'Road'},
  {name:'Train',emoji:'🚂',type:'Rail'},{name:'Bicycle',emoji:'🚲',type:'Road'},
  {name:'Airplane',emoji:'✈️',type:'Air'},{name:'Helicopter',emoji:'🚁',type:'Air'},
  {name:'Ship',emoji:'🚢',type:'Water'},{name:'Boat',emoji:'⛵',type:'Water'},
  {name:'Auto',emoji:'🛺',type:'Road'},{name:'Ambulance',emoji:'🚑',type:'Road'},
  {name:'Rocket',emoji:'🚀',type:'Air'},{name:'Scooter',emoji:'🛵',type:'Road'}
];

const COMMUNITY_HELPERS = [
  {name:'Doctor',emoji:'👨‍⚕️',desc:'Treats sick people'},{name:'Teacher',emoji:'👩‍🏫',desc:'Teaches in school'},
  {name:'Police',emoji:'👮',desc:'Keeps us safe'},{name:'Firefighter',emoji:'👨‍🚒',desc:'Puts out fires'},
  {name:'Farmer',emoji:'👨‍🌾',desc:'Grows food'},{name:'Postman',emoji:'📬',desc:'Delivers letters'},
  {name:'Driver',emoji:'🧑‍✈️',desc:'Drives vehicles'},{name:'Chef',emoji:'👨‍🍳',desc:'Cooks food'},
  {name:'Soldier',emoji:'💂',desc:'Protects our country'},{name:'Nurse',emoji:'👩‍⚕️',desc:'Takes care of patients'}
];

const WATER_SOURCES = [
  {name:'River',emoji:'🏞️',desc:'Flowing water'},{name:'Rain',emoji:'🌧️',desc:'Falls from clouds'},
  {name:'Well',emoji:'🪣',desc:'Underground water'},{name:'Lake',emoji:'🏖️',desc:'Large water body'},
  {name:'Ocean',emoji:'🌊',desc:'Biggest water body'},{name:'Pond',emoji:'💧',desc:'Small water body'},
  {name:'Tap Water',emoji:'🚰',desc:'Comes to homes'},{name:'Spring',emoji:'⛲',desc:'Water from ground'}
];

const CELEBRATIONS = [
  {name:'Diwali',emoji:'🪔',desc:'Festival of Lights'},{name:'Holi',emoji:'🎨',desc:'Festival of Colours'},
  {name:'Eid',emoji:'🌙',desc:'After Ramadan'},{name:'Christmas',emoji:'🎄',desc:'Birth of Jesus'},
  {name:'Republic Day',emoji:'🇮🇳',desc:'26th January'},{name:'Independence Day',emoji:'🇮🇳',desc:'15th August'},
  {name:'Raksha Bandhan',emoji:'🧶',desc:'Brother-Sister bond'},{name:'Chhath Puja',emoji:'🌅',desc:'Worship of Sun'}
];

const COMM_QA = [
  {q:'On which planet do we live?',a:'We live on planet Earth 🌍'},
  {q:'Which festival is known as the festival of colours?',a:'Holi 🎨 is the festival of colours'},
  {q:'How many months are there in a year?',a:'There are 12 months in a year 📅'},
  {q:'How many days are there in a week?',a:'There are 7 days in a week 📆'},
  {q:'What is the colour of our national flag?',a:'Saffron 🟠, White ⚪ and Green 🟢 with a blue Ashoka Chakra'},
  {q:'What do we see during day time in the sky?',a:'We see the Sun ☀️ during day time'},
  {q:'What do we see during night time in the sky?',a:'We see the Moon 🌙 and Stars ⭐ at night'},
  {q:'How many seasons are there? Name them.',a:'There are 6 seasons — Summer, Rainy, Autumn, Late Autumn, Winter, Spring'},
  {q:'Which festival is known as the festival of lights?',a:'Diwali 🪔 is the festival of lights'},
  {q:'Who is the father of our nation?',a:'Mahatma Gandhi 🙏 is the father of our nation'},
  {q:'Which is our national fruit, animal and bird?',a:'Mango 🥭, Tiger 🐯 and Peacock 🦚'},
  {q:'What is the capital of our country?',a:'New Delhi 🏛️ is the capital of India'},
  {q:'Who is the Chief Minister of Bihar?',a:'Nitish Kumar is the Chief Minister of Bihar'},
  {q:'Who is the Prime Minister of India?',a:'Narendra Modi is the Prime Minister of India'},
  {q:'Who is the President of India?',a:'Droupadi Murmu is the President of India'}
];

const MATH_ADDITION = [
  {a:2,b:3,emoji:'🍎'},{a:1,b:4,emoji:'⭐'},{a:3,b:2,emoji:'🌟'},
  {a:5,b:4,emoji:'🍒'},{a:4,b:3,emoji:'🎈'},{a:1,b:6,emoji:'🌸'},
  {a:3,b:5,emoji:'🍬'},{a:2,b:7,emoji:'🦋'},{a:6,b:3,emoji:'🎀'}
];

const MATH_SUBTRACTION = [
  {a:5,b:2,emoji:'🍎'},{a:7,b:3,emoji:'⭐'},{a:9,b:4,emoji:'🌟'},
  {a:6,b:1,emoji:'🍒'},{a:8,b:5,emoji:'🎈'},{a:4,b:2,emoji:'🌸'},
  {a:7,b:6,emoji:'🍬'},{a:9,b:3,emoji:'🦋'},{a:8,b:4,emoji:'🎀'}
];

const HINDI_SWAR_WORDS = [
  {letter:'अ',words:['अनार','अमरूद','अंगूर']},{letter:'आ',words:['आम','आलू','आग']},
  {letter:'इ',words:['इमली','इडली','इमारत']},{letter:'ई',words:['ईंट','ईख','ईगल']},
  {letter:'उ',words:['उल्लू','उँगली','उपहार']},{letter:'ऊ',words:['ऊँट','ऊन','ऊपर']},
  {letter:'ए',words:['एक','एड़ी','ऐनक']},{letter:'ओ',words:['ओला','ओखली','ओस']}
];

const HINDI_VYANJAN_WORDS = [
  {letter:'क',words:['कमल','कबूतर','किताब']},{letter:'ख',words:['खरगोश','खिलौना','खीरा']},
  {letter:'ग',words:['गमला','गाय','गिलहरी']},{letter:'घ',words:['घर','घड़ी','घोड़ा']},
  {letter:'च',words:['चम्मच','चाँद','चिड़िया']},{letter:'छ',words:['छाता','छत','छात्र']},
  {letter:'ज',words:['जहाज़','जल','जंगल']},{letter:'झ',words:['झंडा','झूला','झरना']},
  {letter:'ट',words:['टमाटर','टोपी','टेबल']},{letter:'ठ',words:['ठंड','ठग','ठेला']},
  {letter:'प',words:['पतंग','पानी','पहाड़']},{letter:'म',words:['मछली','मोर','मकान']}
];

const HINDI_INTRO = [
  'मेरा नाम _________ है।',
  'मैं _________ साल का/की हूँ।',
  'मैं कक्षा UKG में पढ़ता/पढ़ती हूँ।',
  'मेरे विद्यालय का नाम _________ है।',
  'मेरे पिताजी का नाम _________ है।',
  'मेरी माताजी का नाम _________ है।',
  'मेरे _________ भाई/बहन हैं।',
  'मैं _________ में रहता/रहती हूँ।'
];
