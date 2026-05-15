import { Language } from '@/locales/translations';
import { create } from 'zustand';

export interface LanguageState {
  language: Language;
  country: string;
  setLanguage: (language: Language) => void;
  setCountry: (country: string) => void;
}

// Country-specific languages
export const COUNTRY_LANGUAGES: Record<string, Array<{ code: Language; name: string; nativeName: string }>> = {
  // African countries with specific languages
  Nigeria: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ha', name: 'Hausa', nativeName: 'Hausa' },
    { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá' },
    { code: 'ig', name: 'Igbo', nativeName: 'Igbo' },
  ],
  Ghana: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ha', name: 'Twi', nativeName: 'Twi' },
  ],
  Kenya: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ha', name: 'Swahili', nativeName: 'Kiswahili' },
  ],
  'South Africa': [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ha', name: 'Zulu', nativeName: 'isiZulu' },
    { code: 'yo', name: 'Xhosa', nativeName: 'isiXhosa' },
  ],
  Egypt: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ha', name: 'Arabic', nativeName: 'العربية' },
  ],
  Uganda: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ha', name: 'Luganda', nativeName: 'Luganda' },
  ],
  Tanzania: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ha', name: 'Swahili', nativeName: 'Kiswahili' },
  ],
  Ethiopia: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ha', name: 'Amharic', nativeName: 'አማርኛ' },
  ],
  Cameroon: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ha', name: 'French', nativeName: 'Français' },
  ],
  Senegal: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ha', name: 'French', nativeName: 'Français' },
  ],
  'Ivory Coast': [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ha', name: 'French', nativeName: 'Français' },
  ],
  Morocco: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ha', name: 'Arabic', nativeName: 'العربية' },
  ],
  Algeria: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ha', name: 'Arabic', nativeName: 'العربية' },
  ],
  Sudan: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ha', name: 'Arabic', nativeName: 'العربية' },
  ],
  Rwanda: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ha', name: 'Kinyarwanda', nativeName: 'Kinyarwanda' },
  ],
  // Default for all other countries
  default: [{ code: 'en', name: 'English', nativeName: 'English' }],
};

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'en',
  country: 'Nigeria',
  setLanguage: (language: Language) => {
    set({ language });
  },
  setCountry: (country: string) => {
    set({ country });
  },
}));
