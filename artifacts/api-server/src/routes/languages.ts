import { Router, type IRouter } from "express";

const router: IRouter = Router();

const indicLanguages = [
  { code: "as", name: "Assamese", nativeName: "অসমীয়া", script: "Bengali-Assamese" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", script: "Bengali" },
  { code: "brx", name: "Bodo", nativeName: "बड़ो", script: "Devanagari" },
  { code: "doi", name: "Dogri", nativeName: "डोगरी", script: "Devanagari" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", script: "Gujarati" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", script: "Devanagari" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", script: "Kannada" },
  { code: "ks", name: "Kashmiri", nativeName: "कॉशुर", script: "Devanagari" },
  { code: "kok", name: "Konkani", nativeName: "कोंकणी", script: "Devanagari" },
  { code: "mai", name: "Maithili", nativeName: "मैथिली", script: "Devanagari" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", script: "Malayalam" },
  { code: "mni", name: "Manipuri", nativeName: "মৈতৈলোন্", script: "Bengali" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", script: "Devanagari" },
  { code: "ne", name: "Nepali", nativeName: "नेपाली", script: "Devanagari" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", script: "Odia" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", script: "Gurmukhi" },
  { code: "sa", name: "Sanskrit", nativeName: "संस्कृतम्", script: "Devanagari" },
  { code: "sat", name: "Santali", nativeName: "ᱥᱟᱱᱛᱟᱲᱤ", script: "Ol Chiki" },
  { code: "sd", name: "Sindhi", nativeName: "سنڌي", script: "Arabic" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", script: "Tamil" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", script: "Telugu" },
  { code: "ur", name: "Urdu", nativeName: "اُردُو", script: "Arabic" },
] as const;

router.get("/languages", (_req, res) => {
  res.json({
    region: "IN",
    count: indicLanguages.length,
    languages: indicLanguages,
  });
});

export default router;