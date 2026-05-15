// Language translations for Soft Touch App
export type Language = 'en' | 'ha' | 'yo' | 'ig';

export interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

export const translations: Translations = {
  // Welcome Screen
  'welcome.title': {
    en: 'Soft Touch',
    ha: 'Soft Touch',
    yo: 'Soft Touch',
    ig: 'Soft Touch',
  },
  'welcome.subtitle': {
    en: 'Fashion Catalog',
    ha: 'Katalogin Kwadago',
    yo: 'Katalogi Aṣọ',
    ig: 'Katalọg Uwe',
  },
  'welcome.description': {
    en: 'Discover amazing fashion designs and shop with ease',
    ha: 'Gano abubuwan kwadago masu ban mamaki kuma saya cikin sauƙi',
    yo: 'Ṣawari awọn iyalẹnu aṣọ ati rà pẹlu irọrun',
    ig: 'Chọpụta ihe ọ bụ ụlọ ahịa mma ma zụọ nwayọọ',
  },
  'welcome.login': {
    en: 'Login',
    ha: 'Shiga',
    yo: 'Wọlé',
    ig: 'Banye',
  },
  'welcome.signup': {
    en: 'Sign Up',
    ha: 'Zama Memba',
    yo: 'Forukọ',
    ig: 'Debanye',
  },

  // Country Selection
  'country.select': {
    en: 'Select Your Country',
    ha: 'Zaɓi Kasarmu',
    yo: 'Yan Orile-ede Rẹ',
    ig: 'Họrọ Mba Gị',
  },
  'country.nigeria': {
    en: 'Nigeria',
    ha: 'Nijeriya',
    yo: 'Naijiria',
    ig: 'Naịjirịa',
  },

  // Language Selection
  'language.select': {
    en: 'Select Your Language',
    ha: 'Zaɓi Harshen Ku',
    yo: 'Yan Ede Rẹ',
    ig: 'Họrọ Asụsụ Gị',
  },
  'language.english': {
    en: 'English',
    ha: 'Turanci',
    yo: 'Ede Gẹẹsi',
    ig: 'Bekee',
  },
  'language.hausa': {
    en: 'Hausa',
    ha: 'Hausa',
    yo: 'Ede Hausa',
    ig: 'Hausa',
  },
  'language.yoruba': {
    en: 'Yoruba',
    ha: 'Yaruba',
    yo: 'Ede Yoruba',
    ig: 'Yoruba',
  },
  'language.igbo': {
    en: 'Igbo',
    ha: 'Igbo',
    yo: 'Ede Igbo',
    ig: 'Igbo',
  },

  // Sign Up
  'signup.title': {
    en: 'Create Account',
    ha: 'Ƙirƙiri Akaunt',
    yo: 'Ṣẹda Akaunt',
    ig: 'Mepụta Akaunt',
  },
  'signup.subtitle': {
    en: 'Join Soft Touch today',
    ha: 'Shiga Soft Touch jiya',
    yo: 'Darapọ Soft Touch loni',
    ig: 'Sonye Soft Touch taa',
  },
  'signup.fullname': {
    en: 'Full Name',
    ha: 'Cikakken Suna',
    yo: 'Orukọ Kikun',
    ig: 'Aha Zuru Oke',
  },
  'signup.email': {
    en: 'Email',
    ha: 'Imel',
    yo: 'Imel',
    ig: 'Imel',
  },
  'signup.password': {
    en: 'Password',
    ha: 'Kalmar Sirri',
    yo: 'Ọrọ Iyalẹnu',
    ig: 'Okwu Nzuzo',
  },
  'signup.confirmpassword': {
    en: 'Confirm Password',
    ha: 'Tabbatar da Kalmar Sirri',
    yo: 'Tẹnumọ Ọrọ Iyalẹnu',
    ig: 'Kọwapụta Okwu Nzuzo',
  },
  'signup.button': {
    en: 'Sign Up',
    ha: 'Zama Memba',
    yo: 'Forukọ',
    ig: 'Debanye',
  },
  'signup.haveaccount': {
    en: 'Already have an account?',
    ha: 'Kina da akaunt?',
    yo: 'Ṣe o ni akaunt tẹlẹ?',
    ig: 'Ị nwere akaunt na?',
  },
  'signup.login': {
    en: 'Login',
    ha: 'Shiga',
    yo: 'Wọlé',
    ig: 'Banye',
  },

  // Login
  'login.title': {
    en: 'Welcome Back',
    ha: 'Sannu da Zuwa',
    yo: 'Kaabo Pada',
    ig: 'Nnọọ Azụ',
  },
  'login.subtitle': {
    en: 'Login to your account',
    ha: 'Shiga akauntinka',
    yo: 'Wọlé si akaunt rẹ',
    ig: 'Banye na akaunt gị',
  },
  'login.button': {
    en: 'Login',
    ha: 'Shiga',
    yo: 'Wọlé',
    ig: 'Banye',
  },
  'login.noaccount': {
    en: "Don't have an account?",
    ha: 'Ba ka da akaunt?',
    yo: 'Ṣe o ko ni akaunt?',
    ig: 'Ị nweghi akaunt?',
  },
  'login.signup': {
    en: 'Sign Up',
    ha: 'Zama Memba',
    yo: 'Forukọ',
    ig: 'Debanye',
  },

  // Home Tab
  'home.title': {
    en: 'Home',
    ha: 'Gida',
    yo: 'Ile',
    ig: 'Ụlọ',
  },

  // Cart Tab
  'cart.title': {
    en: 'Cart',
    ha: 'Karuwa',
    yo: 'Ẹka',
    ig: 'Ụgbọ',
  },
  'cart.empty': {
    en: 'Your cart is empty',
    ha: 'Karuwar ku ba ta da komi',
    yo: 'Ẹka rẹ ko ni ohun kan',
    ig: 'Ụgbọ gị adịghị mma',
  },
  'cart.total': {
    en: 'Total:',
    ha: 'Jami:',
    yo: 'Apapọ:',
    ig: 'Ọnụ:',
  },
  'cart.contact': {
    en: 'Contact Admin',
    ha: 'Tuntubaɗi Jami',
    yo: 'Ṣe Olupin Kan',
    ig: 'Kpọtụ Onye Isi',
  },

  // Account Tab
  'account.title': {
    en: 'Account',
    ha: 'Akaunt',
    yo: 'Akaunt',
    ig: 'Akaunt',
  },
  'account.profile': {
    en: 'Profile Information',
    ha: 'Bayanan Bayani',
    yo: 'Alaye Bayani',
    ig: 'Ozi Profaịlụ',
  },
  'account.changepassword': {
    en: 'Change Password',
    ha: 'Canja Kalmar Sirri',
    yo: 'Yi Ọrọ Iyalẹnu Pada',
    ig: 'Gbanwee Okwu Nzuzo',
  },
  'account.logout': {
    en: 'Logout',
    ha: 'Fita',
    yo: 'Jade',
    ig: 'Pụọ',
  },

  // Common
  'common.name': {
    en: 'Name',
    ha: 'Suna',
    yo: 'Orukọ',
    ig: 'Aha',
  },
  'common.email': {
    en: 'Email',
    ha: 'Imel',
    yo: 'Imel',
    ig: 'Imel',
  },
  'common.save': {
    en: 'Save',
    ha: 'Ajiye',
    yo: 'Tọju',
    ig: 'Zọọ',
  },
  'common.cancel': {
    en: 'Cancel',
    ha: 'Soke',
    yo: 'Fagile',
    ig: 'Kagbuo',
  },
  'common.error': {
    en: 'Error',
    ha: 'Kuskure',
    yo: 'Aṣiṣe',
    ig: 'Ihe Ọjọọ',
  },
  'common.success': {
    en: 'Success',
    ha: 'Nasara',
    yo: 'Aṣeyọrí',
    ig: 'Ihe Ọma',
  },
};

export const getTranslation = (key: string, language: Language): string => {
  return translations[key]?.[language] || translations[key]?.['en'] || key;
};
