import type { LanguageCode } from '@/lib/languages';

export type HomeCopy = {
  heroEyebrow: string;
  heroTitle: string;
  heroTitleItalic: string;
  heroTitleAccent: string;
  heroLead: string;
  openRepository: string;
  askBars: string;
  nationalSignal: string;
  pathwayKnowTitle: string;
  pathwayKnowCopy: string;
  pathwaySignalTitle: string;
  pathwaySignalCopy: string;
  pathwayPeopleTitle: string;
  pathwayPeopleCopy: string;
  officialSeries: string;
  officialSeriesTitle: string;
  officialSeriesNote: string;
  fromBarsOrg: string;
  fromBarsOrgTitle: string;
  ecosystem: string;
  ecosystemTitle: string;
  fieldFilm: string;
  fieldFilmTitle: string;
  fieldFilmLocal: string;
  whatBarsIs: string;
  whatBarsIsTitle: string;
  whatBarsIsLead: string;
  isLabel: string;
  isNotLabel: string;
  voices: string;
  voicesTitle: string;
  voicesLead: string;
  links: string;
  linksTitle: string;
  linksNote: string;
  faq: string;
  faqTitle: string;
  faqLead: string;
  start: string;
  startTitle: string;
  meetNetwork: string;
  readSignal: string;
};

export type FooterCopy = {
  tagline: string;
  platform: string;
  official: string;
  contact: string;
  target: string;
  copyright: string;
};

const enHome: HomeCopy = {
  heroEyebrow: 'BARS platform',
  heroTitle: 'Safer roads',
  heroTitleItalic: 'start',
  heroTitleAccent: 'shared truth.',
  heroLead: 'Bharat Association of Road Safety Volunteers is a neutral, science-driven commons — not a ministry portal, not a private product. It aligns Sarkaar, Bazaar and Samaaj so India can cut road deaths and grievous injuries by 50% by 2030.',
  openRepository: 'Open the repository',
  askBars: 'Ask BARS',
  nationalSignal: 'National signal',
  pathwayKnowTitle: 'Know what works',
  pathwayKnowCopy: 'Sourced records — MoRTH, Lok Sabha, PIB, WHO and labelled samples.',
  pathwaySignalTitle: 'See the signal',
  pathwaySignalCopy: 'MoRTH, Lok Sabha, PIB and labelled Kaggle samples in one frame.',
  pathwayPeopleTitle: 'Find your people',
  pathwayPeopleCopy: 'verified institutions and practitioners.',
  officialSeries: 'Official series',
  officialSeriesTitle: 'Crashes, deaths, injuries.',
  officialSeriesNote: 'MoRTH through 2024; 2025–26 from Lok Sabha Unstarred Q. 1939. 2026* is eDAR through 27 July.',
  fromBarsOrg: 'From bars.org.in',
  fromBarsOrgTitle: 'Official BARS field stills.',
  ecosystem: 'Three networks',
  ecosystemTitle: 'Sarkaar · Bazaar · Samaaj',
  fieldFilm: 'Moving frames',
  fieldFilmTitle: 'Two views from the field.',
  fieldFilmLocal: 'Local field studies',
  whatBarsIs: 'What BARS is',
  whatBarsIsTitle: 'Collaboration over activism.',
  whatBarsIsLead: 'India\'s first association of experienced road-safety volunteers and leaders. Neutrality, credibility, institutional clarity. Long-term commitment over short campaigns.',
  isLabel: 'Is',
  isNotLabel: 'Is not',
  voices: 'Success stories',
  voicesTitle: 'From the Declaration and the field.',
  voicesLead: 'Reflections from institutional partners and global stakeholders across policy, investment, and international engagement.',
  links: 'Important links',
  linksTitle: 'Go to the source.',
  linksNote: 'Ministry, Parliament, WHO, and the BARS organisation site. Our UI stays here; their records stay theirs.',
  faq: 'FAQ',
  faqTitle: 'Questions the ecosystem actually asks.',
  faqLead: 'Adapted from BARS organisational guidance and the evidence held on this platform.',
  start: 'Start',
  startTitle: 'Bring a question. Leave with a source.',
  meetNetwork: 'Meet the network',
  readSignal: 'Read the signal',
};

const enFooter: FooterCopy = {
  tagline: 'Neutral, science-driven. Not a ministry portal. Not a private product. A commons for Sarkaar, Bazaar and Samaaj.',
  platform: 'This platform',
  official: 'Official',
  contact: 'Contact',
  target: 'Target · 50% fewer deaths by 2030',
  copyright: 'Official figures cited to MoRTH, Lok Sabha, PIB and WHO.',
};

const hiHome: HomeCopy = {
  ...enHome,
  heroEyebrow: 'BARS मंच',
  heroTitle: 'सुरक्षित सड़कें',
  heroTitleItalic: 'शुरू',
  heroTitleAccent: 'साझा सत्य से।',
  heroLead: 'भारत रोड सेफ्टी वॉलंटियर्स एसोसिएशन एक neutral, विज्ञान-आधारित commons है — ministry portal नहीं, private product नहीं। यह Sarkaar, Bazaar और Samaaj को जोड़ता है ताकि भारत 2030 तक सड़क मृत्यु और गंभीर चोटें 50% कम कर सके।',
  openRepository: 'रिपॉजिटरी खोलें',
  askBars: 'BARS से पूछें',
  nationalSignal: 'राष्ट्रीय संकेत',
  pathwayKnowTitle: 'जो काम करता है, जानें',
  pathwaySignalTitle: 'संकेत देखें',
  pathwayPeopleTitle: 'अपने लोग खोजें',
  officialSeries: 'आधिकारिक श्रृंखला',
  officialSeriesTitle: 'दुर्घटनाएँ, मृत्यु, चोटें।',
  fromBarsOrg: 'bars.org.in से',
  fromBarsOrgTitle: 'आधिकारिक BARS फ़ील्ड तस्वीरें।',
  ecosystem: 'तीन नेटवर्क',
  ecosystemTitle: 'Sarkaar · Bazaar · Samaaj',
  fieldFilm: 'फ़ील्ड फ़िल्म',
  fieldFilmTitle: 'BARS संगठन साइट से रील।',
  whatBarsIs: 'BARS क्या है',
  whatBarsIsTitle: 'सक्रियता से सहयोग।',
  isLabel: 'है',
  isNotLabel: 'नहीं है',
  voices: 'सफलता की कहानियाँ',
  voicesTitle: 'घोषणा और मैदान से।',
  links: 'महत्वपूर्ण लिंक',
  faq: 'FAQ',
  start: 'शुरू करें',
  meetNetwork: 'नेटवर्क से मिलें',
  readSignal: 'संकेत पढ़ें',
};

const hiFooter: FooterCopy = {
  ...enFooter,
  tagline: 'Neutral, विज्ञान-आधारित। Ministry portal नहीं। Sarkaar, Bazaar और Samaaj के लिए commons।',
  platform: 'यह मंच',
  official: 'आधिकारिक',
  contact: 'संपर्क',
};

function withNavTerms(lang: LanguageCode, home: Partial<HomeCopy>, footer: Partial<FooterCopy>) {
  return {
    home: { ...enHome, ...home },
    footer: { ...enFooter, ...footer },
  };
}

/** Per-language overrides — English fallback for body copy not listed. */
const localized: Partial<Record<LanguageCode, { home: Partial<HomeCopy>; footer: Partial<FooterCopy> }>> = {
  en: { home: enHome, footer: enFooter },
  hi: { home: hiHome, footer: hiFooter },
  bn: withNavTerms('bn', { openRepository: 'রিপোজিটরি খুলুন', askBars: 'BARS-কে জিজ্ঞাসা', nationalSignal: 'জাতীয় সংকেত', pathwayKnowTitle: 'কী কাজ করে', pathwaySignalTitle: 'সংকেত দেখুন', pathwayPeopleTitle: 'আপনার লোক খুঁজুন' }, { platform: 'এই প্ল্যাটফর্ম' }),
  ta: withNavTerms('ta', { openRepository: 'களஞ்சியத்தைத் திற', askBars: 'BARS-ஐ கேளுங்கள்', nationalSignal: 'தேசிய சமிக்ஞை', pathwayKnowTitle: 'எது வேலை செய்கிறது', pathwaySignalTitle: 'சமிக்ஞையைப் பாருங்கள்', pathwayPeopleTitle: 'உங்கள் மக்களைக் கண்டறியுங்கள்' }, { platform: 'இந்த தளம்' }),
  te: withNavTerms('te', { openRepository: 'రిపోజిటరీ తెరవండి', askBars: 'BARS ని అడగండి', nationalSignal: 'జాతీయ సంకేతం', pathwayKnowTitle: 'ఏమి పని చేస్తుంది', pathwaySignalTitle: 'సంకేతం చూడండి', pathwayPeopleTitle: 'మీ ప్రజలను కనుగొనండి' }, { platform: 'ఈ వేదిక' }),
  mr: withNavTerms('mr', { openRepository: 'संग्रह उघडा', askBars: 'BARS ला विचारा', nationalSignal: 'राष्ट्रीय संकेत', pathwayKnowTitle: 'काय कार्य करते', pathwaySignalTitle: 'संकेत पहा', pathwayPeopleTitle: 'तुमचे लोक शोधा' }, { platform: 'हे व्यासपीठ' }),
  gu: withNavTerms('gu', { openRepository: 'રિપોઝિટરી ખોલો', askBars: 'BARS ને પૂછો', nationalSignal: 'રાષ્ટ્રીય સંકેત', pathwayKnowTitle: 'શું કામ કરે છે', pathwaySignalTitle: 'સંકેત જુઓ', pathwayPeopleTitle: 'તમારા લોકો શોધો' }, { platform: 'આ પ્લેટફોર્મ' }),
  kn: withNavTerms('kn', { openRepository: 'ಸಂಗ್ರಹ ತೆರೆಯಿರಿ', askBars: 'BARS ಕೇಳಿ', nationalSignal: 'ರಾಷ್ಟ್ರೀಯ ಸಂಕೇತ', pathwayKnowTitle: 'ಏನು ಕೆಲಸ ಮಾಡುತ್ತದೆ', pathwaySignalTitle: 'ಸಂಕೇತ ನೋಡಿ', pathwayPeopleTitle: 'ನಿಮ್ಮ ಜನರನ್ನು ಹುಡುಕಿ' }, { platform: 'ಈ ವೇದಿಕೆ' }),
  ml: withNavTerms('ml', { openRepository: 'ശേഖരം തുറക്കുക', askBars: 'BARS-നോട് ചോദിക്കൂ', nationalSignal: 'ദേശീയ സിഗ്നൽ', pathwayKnowTitle: 'എന്താണ് പ്രവർത്തിക്കുന്നത്', pathwaySignalTitle: 'സിഗ്നൽ കാണുക', pathwayPeopleTitle: 'നിങ്ങളുടെ ആളുകളെ കണ്ടെത്തുക' }, { platform: 'ഈ പ്ലാറ്റ്ഫോം' }),
  pa: withNavTerms('pa', { openRepository: 'ਭੰਡਾਰ ਖੋਲ੍ਹੋ', askBars: 'BARS ਨੂੰ ਪੁੱਛੋ', nationalSignal: 'ਰਾਸ਼ਟਰੀ ਸੰਕੇਤ', pathwayKnowTitle: 'ਕੀ ਕੰਮ ਕਰਦਾ ਹੈ', pathwaySignalTitle: 'ਸੰਕੇਤ ਵੇਖੋ', pathwayPeopleTitle: 'ਆਪਣੇ ਲੋਕ ਲੱਭੋ' }, { platform: 'ਇਹ ਪਲੇਟਫਾਰਮ' }),
  ur: withNavTerms('ur', { openRepository: 'ذخیرہ کھولیں', askBars: 'BARS سے پوچھیں', nationalSignal: 'قومی اشارہ', pathwayKnowTitle: 'کیا کام کرتا ہے', pathwaySignalTitle: 'اشارہ دیکھیں', pathwayPeopleTitle: 'اپنے لوگ تلاش کریں', heroTitle: 'محفوظ سڑکیں', heroTitleAccent: 'مشترکہ سچائی سے۔' }, { platform: 'یہ پلیٹ فارم', tagline: 'غیر جانبدار، سائنس پر مبنی commons۔' }),
  as: withNavTerms('as', { openRepository: 'ভঁৰাল খোলক', askBars: 'BARS-ক সোধক', nationalSignal: 'ৰাষ্ট্ৰীয় সংকেত' }, { platform: 'এই মঞ্চ' }),
  or: withNavTerms('or', { openRepository: 'ଭଣ୍ଡାର ଖୋଲନ୍ତୁ', askBars: 'BARS କୁ ପଚାରନ୍ତୁ', nationalSignal: 'ଜାତୀୟ ସଙ୍କେତ' }, { platform: 'ଏହି ପ୍ଲାଟଫର୍ମ' }),
  ne: withNavTerms('ne', { openRepository: 'भण्डार खोल्नुहोस्', askBars: 'BARS लाई सोध्नुहोस्', nationalSignal: 'राष्ट्रिय संकेत' }, { platform: 'यो मञ्च' }),
  sd: withNavTerms('sd', { openRepository: 'ذخيرو کولو', askBars: 'BARS کان پڇو', nationalSignal: 'قومي اشارو' }, { platform: 'هي پليٽ فارم' }),
  ks: withNavTerms('ks', { openRepository: 'ذخیرٕ کھولیو', askBars: 'BARS سٕتۍ پوچھو', nationalSignal: 'قومی اشارہ' }, { platform: 'یہ پلیٹ فارم' }),
};

export function getHomeCopy(language: LanguageCode): HomeCopy {
  return { ...enHome, ...localized[language]?.home };
}

export function getFooterCopy(language: LanguageCode): FooterCopy {
  return { ...enFooter, ...localized[language]?.footer };
}
