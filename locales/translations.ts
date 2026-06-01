// Language translations for Soft Touch App
// Organized by country and language

export type Language = 'en' | 'ha' | 'yo' | 'ig' | 'ps' | 'el' | 'ar' | 'fr' | 'es' | 'pt' | 'ru' | 'bn' | 'nl' | 'de' | 'qu' | 'ay';
export type Country = 
  | 'Afghanistan' | 'Albania' | 'Algeria' | 'Andorra' | 'Angola' | 'Antigua and Barbuda'
  | 'Argentina' | 'Armenia' | 'Bahamas' | 'Bahrain' | 'Bangladesh' | 'Barbados' | 'Belarus' | 'Belgium' | 'Belize' | 'Benin' | 'Bhutan' | 'Bolivia' | 'Brazil' | 'Nigeria' | 'Ghana' | 'Kenya' | 'South Africa';

// Import Afghanistan translations
import afghanistanEn from './Afghanistan/en.json';
import afghanistanPs from './Afghanistan/ps.json';

// Import Albania translations
import albaniaEl from './Albania/el.json';
import albaniaEn from './Albania/en.json';

// Import Algeria translations
import algeriaAr from './Algeria/ar.json';
import algeriaEn from './Algeria/en.json';
import algeriaFr from './Algeria/fr.json';

// Import Andorra translations
import andorraEn from './Andorra/en.json';
import andorraEs from './Andorra/es.json';
import andorraFr from './Andorra/fr.json';

// Import Angola translations
import angolaEn from './Angola/en.json';
import angolaPt from './Angola/pt.json';

// Import Antigua and Barbuda translations
import antiguaandbarbuda from './Antigua and Barbuda/en.json';

// Import Argentina translations
import argentinaEn from './Argentina/en.json';
import argentinaEs from './Argentina/es.json';

// Import Armenia translations
import armeniaEn from './Armenia/en.json';
import armeniaRu from './Armenia/ru.json';

// Import Bahamas translations
import bahamasEn from './Bahamas/en.json';

// Import Bahrain translations
import bahrainAr from './Bahrain/ar.json';
import bahrainEn from './Bahrain/en.json';

// Import Bangladesh translations
import bangladeshBn from './Bangladesh/bn.json';
import bangladeshEn from './Bangladesh/en.json';

// Import Barbados translations
import barbadosEn from './Barbados/en.json';

// Import Belarus translations
import belarusEn from './Belarus/en.json';
import belarusRu from './Belarus/ru.json';

// Import Belgium translations
import belgiumDe from './Belgium/de.json';
import belgiumEn from './Belgium/en.json';
import belgiumFr from './Belgium/fr.json';
import belgiumNl from './Belgium/nl.json';

// Import Belize translations
import belizeEn from './Belize/en.json';
import belizeEs from './Belize/es.json';

// Import Benin translations
import beninEn from './Benin/en.json';
import beninFr from './Benin/fr.json';
import beninHa from './Benin/ha.json';
import beninYo from './Benin/yo.json';

// Import Bhutan translations
import bhutanEn from './Bhutan/en.json';

// Import Bolivia translations
import boliviaAy from './Bolivia/ay.json';
import boliviaEn from './Bolivia/en.json';
import boliviaEs from './Bolivia/es.json';
import boliviaQu from './Bolivia/qu.json';

// Import Brazil translations
import brazilEn from './Brazil/en.json';
import brazilEs from './Brazil/es.json';
import brazilPt from './Brazil/pt.json';

// Import Nigeria translations
import nigeriaEn from './Nigeria/en.json';
import nigeriaHa from './Nigeria/ha.json';
import nigeriaIg from './Nigeria/ig.json';
import nigeriaYo from './Nigeria/yo.json';

// Import Ghana translations
import ghanaEn from './Ghana/en.json';

// Import Kenya translations
import kenyaEn from './Kenya/en.json';

// Import South Africa translations
import southafricaEn from './SouthAfrica/en.json';

// Import all other country translations (English only)

export interface Translations {
  [key: string]: string;
}

// Country translations mapping
const countryTranslations: Record<Country, Record<Language, Translations>> = {
  Afghanistan: {
    en: afghanistanEn,
    ps: afghanistanPs,
    ha: afghanistanEn, // Fallback to English
    yo: afghanistanEn, // Fallback to English
    ig: afghanistanEn, // Fallback to English
    el: afghanistanEn, // Fallback to English
    ar: afghanistanEn, // Fallback to English
    fr: afghanistanEn, // Fallback to English
    es: afghanistanEn, // Fallback to English
    pt: afghanistanEn, // Fallback to English
    ru: afghanistanEn, // Fallback to English
    bn: afghanistanEn, // Fallback to English
    nl: afghanistanEn, // Fallback to English
    de: afghanistanEn, // Fallback to English
    qu: afghanistanEn, // Fallback to English
    ay: afghanistanEn, // Fallback to English
  },
  Albania: {
    en: albaniaEn,
    el: albaniaEl,
    ps: albaniaEn, // Fallback to English
    ha: albaniaEn, // Fallback to English
    yo: albaniaEn, // Fallback to English
    ig: albaniaEn, // Fallback to English
    ar: albaniaEn, // Fallback to English
    fr: albaniaEn, // Fallback to English
    es: albaniaEn, // Fallback to English
    pt: albaniaEn, // Fallback to English
    ru: albaniaEn, // Fallback to English
    bn: albaniaEn, // Fallback to English
    nl: albaniaEn, // Fallback to English
    de: albaniaEn, // Fallback to English
    qu: albaniaEn, // Fallback to English
    ay: albaniaEn, // Fallback to English
  },
  Algeria: {
    en: algeriaEn,
    ar: algeriaAr,
    fr: algeriaFr,
    ps: algeriaEn, // Fallback to English
    el: algeriaEn, // Fallback to English
    ha: algeriaEn, // Fallback to English
    yo: algeriaEn, // Fallback to English
    ig: algeriaEn, // Fallback to English
    es: algeriaEn, // Fallback to English
    pt: algeriaEn, // Fallback to English
    ru: algeriaEn, // Fallback to English
    bn: algeriaEn, // Fallback to English
    nl: algeriaEn, // Fallback to English
    de: algeriaEn, // Fallback to English
    qu: algeriaEn, // Fallback to English
    ay: algeriaEn, // Fallback to English
  },
  Andorra: {
    en: andorraEn,
    es: andorraEs,
    fr: andorraFr,
    ps: andorraEn, // Fallback to English
    el: andorraEn, // Fallback to English
    ha: andorraEn, // Fallback to English
    yo: andorraEn, // Fallback to English
    ig: andorraEn, // Fallback to English
    ar: andorraEn, // Fallback to English
    pt: andorraEn, // Fallback to English
    ru: andorraEn, // Fallback to English
    bn: andorraEn, // Fallback to English
    nl: andorraEn, // Fallback to English
    de: andorraEn, // Fallback to English
    qu: andorraEn, // Fallback to English
    ay: andorraEn, // Fallback to English
  },
  Angola: {
    en: angolaEn,
    pt: angolaPt,
    ps: angolaEn, // Fallback to English
    el: angolaEn, // Fallback to English
    ha: angolaEn, // Fallback to English
    yo: angolaEn, // Fallback to English
    ig: angolaEn, // Fallback to English
    ar: angolaEn, // Fallback to English
    fr: angolaEn, // Fallback to English
    es: angolaEn, // Fallback to English
    ru: angolaEn, // Fallback to English
    bn: angolaEn, // Fallback to English
    nl: angolaEn, // Fallback to English
    de: angolaEn, // Fallback to English
    qu: angolaEn, // Fallback to English
    ay: angolaEn, // Fallback to English
  },
  'Antigua and Barbuda': {
    en: antiguaandbarbuda,
    ps: antiguaandbarbuda, // Fallback to English
    el: antiguaandbarbuda, // Fallback to English
    ha: antiguaandbarbuda, // Fallback to English
    yo: antiguaandbarbuda, // Fallback to English
    ig: antiguaandbarbuda, // Fallback to English
    ar: antiguaandbarbuda, // Fallback to English
    fr: antiguaandbarbuda, // Fallback to English
    es: antiguaandbarbuda, // Fallback to English
    pt: antiguaandbarbuda, // Fallback to English
    ru: antiguaandbarbuda, // Fallback to English
    bn: antiguaandbarbuda, // Fallback to English
    nl: antiguaandbarbuda, // Fallback to English
    de: antiguaandbarbuda, // Fallback to English
    qu: antiguaandbarbuda, // Fallback to English
    ay: antiguaandbarbuda, // Fallback to English
  },
  Argentina: {
    en: argentinaEn,
    es: argentinaEs,
    ps: argentinaEn, // Fallback to English
    el: argentinaEn, // Fallback to English
    ha: argentinaEn, // Fallback to English
    yo: argentinaEn, // Fallback to English
    ig: argentinaEn, // Fallback to English
    ar: argentinaEn, // Fallback to English
    fr: argentinaEn, // Fallback to English
    pt: argentinaEn, // Fallback to English
    ru: argentinaEn, // Fallback to English
    bn: argentinaEn, // Fallback to English
    nl: argentinaEn, // Fallback to English
    de: argentinaEn, // Fallback to English
    qu: argentinaEn, // Fallback to English
    ay: argentinaEn, // Fallback to English
  },
  Armenia: {
    en: armeniaEn,
    ru: armeniaRu,
    ps: armeniaEn, // Fallback to English
    el: armeniaEn, // Fallback to English
    ha: armeniaEn, // Fallback to English
    yo: armeniaEn, // Fallback to English
    ig: armeniaEn, // Fallback to English
    ar: armeniaEn, // Fallback to English
    fr: armeniaEn, // Fallback to English
    es: armeniaEn, // Fallback to English
    pt: armeniaEn, // Fallback to English
    bn: armeniaEn, // Fallback to English
    nl: armeniaEn, // Fallback to English
    de: armeniaEn, // Fallback to English
    qu: armeniaEn, // Fallback to English
    ay: armeniaEn, // Fallback to English
  },
  Bahamas: {
    en: bahamasEn,
    ps: bahamasEn, // Fallback to English
    el: bahamasEn, // Fallback to English
    ha: bahamasEn, // Fallback to English
    yo: bahamasEn, // Fallback to English
    ig: bahamasEn, // Fallback to English
    ar: bahamasEn, // Fallback to English
    fr: bahamasEn, // Fallback to English
    es: bahamasEn, // Fallback to English
    pt: bahamasEn, // Fallback to English
    ru: bahamasEn, // Fallback to English
    bn: bahamasEn, // Fallback to English
    nl: bahamasEn, // Fallback to English
    de: bahamasEn, // Fallback to English
    qu: bahamasEn, // Fallback to English
    ay: bahamasEn, // Fallback to English
  },
  Bahrain: {
    en: bahrainEn,
    ar: bahrainAr,
    ps: bahrainEn, // Fallback to English
    el: bahrainEn, // Fallback to English
    ha: bahrainEn, // Fallback to English
    yo: bahrainEn, // Fallback to English
    ig: bahrainEn, // Fallback to English
    fr: bahrainEn, // Fallback to English
    es: bahrainEn, // Fallback to English
    pt: bahrainEn, // Fallback to English
    ru: bahrainEn, // Fallback to English
    bn: bahrainEn, // Fallback to English
    nl: bahrainEn, // Fallback to English
    de: bahrainEn, // Fallback to English
    qu: bahrainEn, // Fallback to English
    ay: bahrainEn, // Fallback to English
  },
  Bangladesh: {
    en: bangladeshEn,
    bn: bangladeshBn,
    ps: bangladeshEn, // Fallback to English
    el: bangladeshEn, // Fallback to English
    ha: bangladeshEn, // Fallback to English
    yo: bangladeshEn, // Fallback to English
    ig: bangladeshEn, // Fallback to English
    ar: bangladeshEn, // Fallback to English
    fr: bangladeshEn, // Fallback to English
    es: bangladeshEn, // Fallback to English
    pt: bangladeshEn, // Fallback to English
    ru: bangladeshEn, // Fallback to English
    nl: bangladeshEn, // Fallback to English
    de: bangladeshEn, // Fallback to English
    qu: bangladeshEn, // Fallback to English
    ay: bangladeshEn, // Fallback to English
  },
  Barbados: {
    en: barbadosEn,
    ps: barbadosEn, // Fallback to English
    el: barbadosEn, // Fallback to English
    ha: barbadosEn, // Fallback to English
    yo: barbadosEn, // Fallback to English
    ig: barbadosEn, // Fallback to English
    ar: barbadosEn, // Fallback to English
    fr: barbadosEn, // Fallback to English
    es: barbadosEn, // Fallback to English
    pt: barbadosEn, // Fallback to English
    ru: barbadosEn, // Fallback to English
    bn: barbadosEn, // Fallback to English
    nl: barbadosEn, // Fallback to English
    de: barbadosEn, // Fallback to English
    qu: barbadosEn, // Fallback to English
    ay: barbadosEn, // Fallback to English
  },
  Belarus: {
    en: belarusEn,
    ru: belarusRu,
    ps: belarusEn, // Fallback to English
    el: belarusEn, // Fallback to English
    ha: belarusEn, // Fallback to English
    yo: belarusEn, // Fallback to English
    ig: belarusEn, // Fallback to English
    ar: belarusEn, // Fallback to English
    fr: belarusEn, // Fallback to English
    es: belarusEn, // Fallback to English
    pt: belarusEn, // Fallback to English
    bn: belarusEn, // Fallback to English
    nl: belarusEn, // Fallback to English
    de: belarusEn, // Fallback to English
    qu: belarusEn, // Fallback to English
    ay: belarusEn, // Fallback to English
  },
  Belgium: {
    en: belgiumEn,
    nl: belgiumNl,
    de: belgiumDe,
    fr: belgiumFr,
    ps: belgiumEn, // Fallback to English
    el: belgiumEn, // Fallback to English
    ha: belgiumEn, // Fallback to English
    yo: belgiumEn, // Fallback to English
    ig: belgiumEn, // Fallback to English
    ar: belgiumEn, // Fallback to English
    es: belgiumEn, // Fallback to English
    pt: belgiumEn, // Fallback to English
    ru: belgiumEn, // Fallback to English
    bn: belgiumEn, // Fallback to English
    qu: belgiumEn, // Fallback to English
    ay: belgiumEn, // Fallback to English
  },
  Belize: {
    en: belizeEn,
    es: belizeEs,
    ps: belizeEn, // Fallback to English
    el: belizeEn, // Fallback to English
    ha: belizeEn, // Fallback to English
    yo: belizeEn, // Fallback to English
    ig: belizeEn, // Fallback to English
    ar: belizeEn, // Fallback to English
    fr: belizeEn, // Fallback to English
    pt: belizeEn, // Fallback to English
    ru: belizeEn, // Fallback to English
    bn: belizeEn, // Fallback to English
    nl: belizeEn, // Fallback to English
    de: belizeEn, // Fallback to English
    qu: belizeEn, // Fallback to English
    ay: belizeEn, // Fallback to English
  },
  Benin: {
    en: beninEn,
    fr: beninFr,
    yo: beninYo,
    ha: beninHa,
    ps: beninEn, // Fallback to English
    el: beninEn, // Fallback to English
    ig: beninEn, // Fallback to English
    ar: beninEn, // Fallback to English
    es: beninEn, // Fallback to English
    pt: beninEn, // Fallback to English
    ru: beninEn, // Fallback to English
    bn: beninEn, // Fallback to English
    nl: beninEn, // Fallback to English
    de: beninEn, // Fallback to English
    qu: beninEn, // Fallback to English
    ay: beninEn, // Fallback to English
  },
  Bhutan: {
    en: bhutanEn,
    ps: bhutanEn, // Fallback to English
    el: bhutanEn, // Fallback to English
    ha: bhutanEn, // Fallback to English
    yo: bhutanEn, // Fallback to English
    ig: bhutanEn, // Fallback to English
    ar: bhutanEn, // Fallback to English
    fr: bhutanEn, // Fallback to English
    es: bhutanEn, // Fallback to English
    pt: bhutanEn, // Fallback to English
    ru: bhutanEn, // Fallback to English
    bn: bhutanEn, // Fallback to English
    nl: bhutanEn, // Fallback to English
    de: bhutanEn, // Fallback to English
    qu: bhutanEn, // Fallback to English
    ay: bhutanEn, // Fallback to English
  },
  Bolivia: {
    en: boliviaEn,
    es: boliviaEs,
    qu: boliviaQu,
    ay: boliviaAy,
    ps: boliviaEn, // Fallback to English
    el: boliviaEn, // Fallback to English
    ha: boliviaEn, // Fallback to English
    yo: boliviaEn, // Fallback to English
    ig: boliviaEn, // Fallback to English
    ar: boliviaEn, // Fallback to English
    fr: boliviaEn, // Fallback to English
    pt: boliviaEn, // Fallback to English
    ru: boliviaEn, // Fallback to English
    bn: boliviaEn, // Fallback to English
    nl: boliviaEn, // Fallback to English
    de: boliviaEn, // Fallback to English
  },
  Brazil: {
    en: brazilEn,
    pt: brazilPt,
    es: brazilEs,
    ps: brazilEn, // Fallback to English
    el: brazilEn, // Fallback to English
    ha: brazilEn, // Fallback to English
    yo: brazilEn, // Fallback to English
    ig: brazilEn, // Fallback to English
    ar: brazilEn, // Fallback to English
    fr: brazilEn, // Fallback to English
    ru: brazilEn, // Fallback to English
    bn: brazilEn, // Fallback to English
    nl: brazilEn, // Fallback to English
    de: brazilEn, // Fallback to English
    qu: brazilEn, // Fallback to English
    ay: brazilEn, // Fallback to English
  },
  Nigeria: {
    en: nigeriaEn,
    ha: nigeriaHa,
    yo: nigeriaYo,
    ig: nigeriaIg,
    ps: nigeriaEn, // Fallback to English
    el: nigeriaEn, // Fallback to English
    ar: nigeriaEn, // Fallback to English
    fr: nigeriaEn, // Fallback to English
    es: nigeriaEn, // Fallback to English
    pt: nigeriaEn, // Fallback to English
    ru: nigeriaEn, // Fallback to English
    bn: nigeriaEn, // Fallback to English
    nl: nigeriaEn, // Fallback to English
    de: nigeriaEn, // Fallback to English
    qu: nigeriaEn, // Fallback to English
    ay: nigeriaEn, // Fallback to English
  },
  Ghana: {
    en: ghanaEn,
    ha: ghanaEn, // Fallback to English
    yo: ghanaEn, // Fallback to English
    ig: ghanaEn, // Fallback to English
    ps: ghanaEn, // Fallback to English
    el: ghanaEn, // Fallback to English
    ar: ghanaEn, // Fallback to English
    fr: ghanaEn, // Fallback to English
    es: ghanaEn, // Fallback to English
    pt: ghanaEn, // Fallback to English
    ru: ghanaEn, // Fallback to English
    bn: ghanaEn, // Fallback to English
    nl: ghanaEn, // Fallback to English
    de: ghanaEn, // Fallback to English
    qu: ghanaEn, // Fallback to English
    ay: ghanaEn, // Fallback to English
  },
  Kenya: {
    en: kenyaEn,
    ha: kenyaEn, // Fallback to English
    yo: kenyaEn, // Fallback to English
    ig: kenyaEn, // Fallback to English
    ps: kenyaEn, // Fallback to English
    el: kenyaEn, // Fallback to English
    ar: kenyaEn, // Fallback to English
    fr: kenyaEn, // Fallback to English
    es: kenyaEn, // Fallback to English
    pt: kenyaEn, // Fallback to English
    ru: kenyaEn, // Fallback to English
    bn: kenyaEn, // Fallback to English
    nl: kenyaEn, // Fallback to English
    de: kenyaEn, // Fallback to English
    qu: kenyaEn, // Fallback to English
    ay: kenyaEn, // Fallback to English
  },
  'South Africa': {
    en: southafricaEn,
    ha: southafricaEn, // Fallback to English
    yo: southafricaEn, // Fallback to English
    ig: southafricaEn, // Fallback to English
    ps: southafricaEn, // Fallback to English
    el: southafricaEn, // Fallback to English
    ar: southafricaEn, // Fallback to English
    fr: southafricaEn, // Fallback to English
    es: southafricaEn, // Fallback to English
    pt: southafricaEn, // Fallback to English
    ru: southafricaEn, // Fallback to English
    bn: southafricaEn, // Fallback to English
    nl: southafricaEn, // Fallback to English
    de: southafricaEn, // Fallback to English
    qu: southafricaEn, // Fallback to English
    ay: southafricaEn, // Fallback to English
  },
};

/**
 * Get translation for a specific key, language, and country
 * @param key - Translation key (e.g., 'welcome.title')
 * @param language - Language code (en, ha, yo, ig)
 * @param country - Country code (Nigeria, Ghana, Kenya, South Africa)
 * @returns Translated string or the key if not found
 */
export const getTranslation = (
  key: string,
  language: Language,
  country: Country = 'Nigeria'
): string => {
  try {
    const countryData = countryTranslations[country];
    if (!countryData) {
      console.warn(`Country '${country}' not found in translations`);
      // Fallback to Nigeria
      return countryTranslations['Nigeria']['en'][key] || key;
    }

    const languageData = countryData[language];
    if (!languageData) {
      console.warn(`Language '${language}' not found for country '${country}'`);
      // Fallback to English
      return countryData['en'][key] || key;
    }

    return languageData[key] || key;
  } catch (error) {
    console.error(`Error getting translation for key '${key}'`, error);
    return key;
  }
};

/**
 * Get all translations for a specific language and country
 * @param language - Language code
 * @param country - Country code
 * @returns All translations for that language
 */
export const getLanguageTranslations = (
  language: Language,
  country: Country = 'Nigeria'
): Translations => {
  const countryData = countryTranslations[country];
  if (!countryData) {
    return countryTranslations['Nigeria']['en'];
  }
  return countryData[language] || countryData['en'];
};
