import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export const indicLanguages = [
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'brx', name: 'Bodo', nativeName: 'बड़ो' },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'कॉशुर' },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'mni', name: 'Manipuri', nativeName: 'মৈতৈলোন্' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्' },
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ' },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ur', name: 'Urdu', nativeName: 'اُردُو' },
] as const;

export type LanguageCode = (typeof indicLanguages)[number]['code'];

type ShellCopy = {
  navigate: string;
  home: string;
  repository: string;
  dashboard: string;
  directory: string;
  workspace: string;
  designSystem: string;
  askBars: string;
  language: string;
  system: string;
  light: string;
  dark: string;
};

const englishCopy: ShellCopy = {
  navigate: 'Navigate',
  home: 'Home',
  repository: 'Repository',
  dashboard: 'National intelligence',
  directory: 'Directory',
  workspace: 'Workspace',
  designSystem: 'Design system',
  askBars: 'Ask BARS',
  language: 'Language',
  system: 'System',
  light: 'Light',
  dark: 'Dark',
};

const shellCopy: Partial<Record<LanguageCode, ShellCopy>> = {
  as: { ...englishCopy, navigate: 'পথ', home: 'ঘৰ', repository: 'ভঁৰাল', dashboard: 'ৰাষ্ট্ৰীয় তথ্য', directory: 'ডাইৰেক্টৰী', workspace: 'কৰ্মক্ষেত্ৰ', designSystem: 'ডিজাইন ব্যৱস্থা', askBars: 'BARS-ক সোধক', language: 'ভাষা', system: 'চিস্টেম', light: 'পাতল', dark: 'ডাঠ' },
  bn: { ...englishCopy, navigate: 'নেভিগেট', home: 'হোম', repository: 'রিপোজিটরি', dashboard: 'জাতীয় তথ্য', directory: 'ডিরেক্টরি', workspace: 'কর্মক্ষেত্র', designSystem: 'ডিজাইন সিস্টেম', askBars: 'BARS-কে জিজ্ঞাসা', language: 'ভাষা', system: 'সিস্টেম', light: 'হালকা', dark: 'গাঢ়' },
  brx: { ...englishCopy, navigate: 'थावनि', home: 'नखर', repository: 'दाथाय', dashboard: 'रास्ट्रिय बिबुं', directory: 'डाइरेक्टरी', workspace: 'हाबाफारि', designSystem: 'डिजाइन सिस्टम', askBars: 'BARS सों', language: 'राव', system: 'सिस्टम', light: 'फिसा', dark: 'गोहो' },
  doi: { ...englishCopy, navigate: 'रास्ता', home: 'घर', repository: 'भंडार', dashboard: 'राष्ट्रीय जानकारी', directory: 'निर्देशिका', workspace: 'कमै दा खेतर', designSystem: 'डिजाइन प्रणाली', askBars: 'BARS गी पुछो', language: 'भाशा', system: 'सिस्टम', light: 'हल्का', dark: 'गाढ़ा' },
  gu: { ...englishCopy, navigate: 'નેવિગેટ', home: 'હોમ', repository: 'રિપોઝિટરી', dashboard: 'રાષ્ટ્રીય માહિતી', directory: 'ડિરેક્ટરી', workspace: 'વર્કસ્પેસ', designSystem: 'ડિઝાઇન સિસ્ટમ', askBars: 'BARS ને પૂછો', language: 'ભાષા', system: 'સિસ્ટમ', light: 'લાઇટ', dark: 'ડાર્ક' },
  hi: { ...englishCopy, navigate: 'नेविगेट', home: 'होम', repository: 'रिपॉजिटरी', dashboard: 'राष्ट्रीय जानकारी', directory: 'डायरेक्टरी', workspace: 'वर्कस्पेस', designSystem: 'डिज़ाइन सिस्टम', askBars: 'BARS से पूछें', language: 'भाषा', system: 'सिस्टम', light: 'लाइट', dark: 'डार्क' },
  kn: { ...englishCopy, navigate: 'ನ್ಯಾವಿಗೇಟ್', home: 'ಮುಖಪುಟ', repository: 'ಸಂಗ್ರಹ', dashboard: 'ರಾಷ್ಟ್ರೀಯ ಮಾಹಿತಿ', directory: 'ಡೈರೆಕ್ಟರಿ', workspace: 'ವರ್ಕ್‌ಸ್ಪೇಸ್', designSystem: 'ವಿನ್ಯಾಸ ವ್ಯವಸ್ಥೆ', askBars: 'BARS ಕೇಳಿ', language: 'ಭಾಷೆ', system: 'ಸಿಸ್ಟಮ್', light: 'ಲೈಟ್', dark: 'ಡಾರ್ಕ್' },
  ks: { ...englishCopy, navigate: 'رہنمٲی', home: 'گَر', repository: 'ذخیرٕ', dashboard: 'قومی معلومات', directory: 'ڈایریکٹری', workspace: 'کام جگہ', designSystem: 'ڈیزائن نظام', askBars: 'BARS سٕتۍ پوچھو', language: 'زبان', system: 'نظام', light: 'ہلکا', dark: 'گہرا' },
  kok: { ...englishCopy, navigate: 'नियाळ', home: 'घर', repository: 'सांठो', dashboard: 'राष्ट्रीय म्हायती', directory: 'डायरेक्टरी', workspace: 'कामाची जागो', designSystem: 'डिझायन प्रणाली', askBars: 'BARS क विचारात', language: 'भास', system: 'सिस्टम', light: 'लायट', dark: 'डार्क' },
  mai: { ...englishCopy, navigate: 'दिशा', home: 'घर', repository: 'भंडार', dashboard: 'राष्ट्रीय जानकारी', directory: 'निर्देशिका', workspace: 'कार्यस्थल', designSystem: 'डिजाइन प्रणाली', askBars: 'BARS सँ पूछू', language: 'भाषा', system: 'सिस्टम', light: 'हल्का', dark: 'गाढ़' },
  ml: { ...englishCopy, navigate: 'നാവിഗേറ്റ്', home: 'ഹോം', repository: 'ശേഖരം', dashboard: 'ദേശീയ വിവരങ്ങൾ', directory: 'ഡയറക്ടറി', workspace: 'വർക്ക്‌സ്‌പേസ്', designSystem: 'ഡിസൈൻ സിസ്റ്റം', askBars: 'BARS-നോട് ചോദിക്കൂ', language: 'ഭാഷ', system: 'സിസ്റ്റം', light: 'ലൈറ്റ്', dark: 'ഡാർക്ക്' },
  mni: { ...englishCopy, navigate: 'লাইরিবা', home: 'নুপী', repository: 'ফংখ্ৰবা', dashboard: 'হিন্দুস্তানগী মরোল', directory: 'দাইরেক্তরি', workspace: 'শেমগৎপগী মফম', designSystem: 'দিজাইন সিস্তেম', askBars: 'BARS দা হংজবা', language: 'লোন', system: 'সিস্তেম', light: 'লাইট', dark: 'দার্ক' },
  mr: { ...englishCopy, navigate: 'नेव्हिगेट', home: 'मुखपृष्ठ', repository: 'संग्रह', dashboard: 'राष्ट्रीय माहिती', directory: 'निर्देशिका', workspace: 'कार्यक्षेत्र', designSystem: 'डिझाइन प्रणाली', askBars: 'BARS ला विचारा', language: 'भाषा', system: 'सिस्टम', light: 'लाइट', dark: 'डार्क' },
  ne: { ...englishCopy, navigate: 'नेभिगेट', home: 'गृहपृष्ठ', repository: 'भण्डार', dashboard: 'राष्ट्रिय जानकारी', directory: 'निर्देशिका', workspace: 'कार्यक्षेत्र', designSystem: 'डिजाइन प्रणाली', askBars: 'BARS लाई सोध्नुहोस्', language: 'भाषा', system: 'प्रणाली', light: 'लाइट', dark: 'डार्क' },
  or: { ...englishCopy, navigate: 'ନାଭିଗେଟ୍', home: 'ମୂଳପୃଷ୍ଠା', repository: 'ଭଣ୍ଡାର', dashboard: 'ଜାତୀୟ ତଥ୍ୟ', directory: 'ଡାଇରେକ୍ଟୋରୀ', workspace: 'କାର୍ଯ୍ୟକ୍ଷେତ୍ର', designSystem: 'ଡିଜାଇନ୍ ବ୍ୟବସ୍ଥା', askBars: 'BARS କୁ ପଚାରନ୍ତୁ', language: 'ଭାଷା', system: 'ସିଷ୍ଟମ୍', light: 'ଲାଇଟ୍', dark: 'ଡାର୍କ' },
  pa: { ...englishCopy, navigate: 'ਨੈਵੀਗੇਟ', home: 'ਮੁੱਖ ਪੰਨਾ', repository: 'ਭੰਡਾਰ', dashboard: 'ਰਾਸ਼ਟਰੀ ਜਾਣਕਾਰੀ', directory: 'ਡਾਇਰੈਕਟਰੀ', workspace: 'ਵਰਕਸਪੇਸ', designSystem: 'ਡਿਜ਼ਾਈਨ ਸਿਸਟਮ', askBars: 'BARS ਨੂੰ ਪੁੱਛੋ', language: 'ਭਾਸ਼ਾ', system: 'ਸਿਸਟਮ', light: 'ਲਾਈਟ', dark: 'ਡਾਰਕ' },
  sa: { ...englishCopy, navigate: 'मार्गदर्शनम्', home: 'मुखपृष्ठम्', repository: 'सङ्ग्रहः', dashboard: 'राष्ट्रियदत्तांशः', directory: 'निर्देशिका', workspace: 'कार्यस्थानम्', designSystem: 'रचनाव्यवस्था', askBars: 'BARS पृच्छतु', language: 'भाषा', system: 'प्रणाली', light: 'लघु', dark: 'गाढ' },
  sat: { ...englishCopy, navigate: 'ᱦᱚᱲ', home: 'ᱚᱲᱟᱜ', repository: 'ᱫᱷᱟᱣᱟ', dashboard: 'ᱡᱟᱛᱤᱭᱟ ᱵᱟᱹᱛ', directory: 'ᱫᱟᱭᱨᱮᱠᱴᱚᱨᱤ', workspace: 'ᱠᱟᱹᱢ ᱡᱟᱭᱜᱟ', designSystem: 'ᱰᱤᱡᱟᱭᱤᱱ ᱥᱤᱥᱴᱮᱢ', askBars: 'BARS ᱠᱩ ᱠᱟᱹᱞᱤ', language: 'ᱯᱟᱹᱨᱥᱤ', system: 'ᱥᱤᱥᱴᱮᱢ', light: 'ᱞᱟᱭᱴ', dark: 'ᱰᱟᱨᱠ' },
  sd: { ...englishCopy, navigate: 'رہنمائي', home: 'گهر', repository: 'ذخيرو', dashboard: 'قومي ڄاڻ', directory: 'ڊائريڪٽري', workspace: 'ڪم جي جاءِ', designSystem: 'ڊزائن نظام', askBars: 'BARS کان پڇو', language: 'ٻولي', system: 'سسٽم', light: 'هلڪو', dark: 'اونداهو' },
  ta: { ...englishCopy, navigate: 'வழிசெலுத்தல்', home: 'முகப்பு', repository: 'களஞ்சியம்', dashboard: 'தேசிய தகவல்', directory: 'அடைவு', workspace: 'பணியிடம்', designSystem: 'வடிவமைப்பு அமைப்பு', askBars: 'BARS-ஐ கேளுங்கள்', language: 'மொழி', system: 'கணினி', light: 'வெளிச்சம்', dark: 'இருள்' },
  te: { ...englishCopy, navigate: 'నావిగేట్', home: 'హోమ్', repository: 'రిపోజిటరీ', dashboard: 'జాతీయ సమాచారం', directory: 'డైరెక్టరీ', workspace: 'వర్క్‌స్పేస్', designSystem: 'డిజైన్ వ్యవస్థ', askBars: 'BARS ని అడగండి', language: 'భాష', system: 'సిస్టమ్', light: 'లైట్', dark: 'డార్క్' },
  ur: { ...englishCopy, navigate: 'رہنمائی', home: 'گھر', repository: 'ذخیرہ', dashboard: 'قومی معلومات', directory: 'ڈائریکٹری', workspace: 'کام کی جگہ', designSystem: 'ڈیزائن نظام', askBars: 'BARS سے پوچھیں', language: 'زبان', system: 'نظام', light: 'ہلکا', dark: 'گہرا' },
};

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  copy: ShellCopy;
  languageName: string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    if (typeof window === 'undefined') return 'hi';
    const saved = localStorage.getItem('bars-language');
    return indicLanguages.some((item) => item.code === saved) ? (saved as LanguageCode) : 'hi';
  });

  useEffect(() => {
    localStorage.setItem('bars-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ur' || language === 'sd' || language === 'ks' ? 'rtl' : 'ltr';
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    copy: shellCopy[language] ?? englishCopy,
    languageName: indicLanguages.find((item) => item.code === language)?.nativeName ?? 'हिन्दी',
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}