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
  // Completed countries with translations
  Afghanistan: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ps', name: 'Pashto', nativeName: 'پشتو' },
  ],
  Albania: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'el', name: 'Greek', nativeName: 'Ελληνικά' },
  ],
  Algeria: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
  ],
  Andorra: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
  ],
  Angola: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  ],
  'Antigua and Barbuda': [
    { code: 'en', name: 'English', nativeName: 'English' },
  ],
  Argentina: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
  ],
  Armenia: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  ],
  Bahamas: [
    { code: 'en', name: 'English', nativeName: 'English' },
  ],
  Bahrain: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  ],
  Bangladesh: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  ],
  Barbados: [
    { code: 'en', name: 'English', nativeName: 'English' },
  ],
  Belarus: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  ],
  Belgium: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
  ],
  Belize: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
  ],
  Benin: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá' },
    { code: 'ha', name: 'Hausa', nativeName: 'Hausa' },
  ],
  Bhutan: [
    { code: 'en', name: 'English', nativeName: 'English' },
  ],
  Bolivia: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'qu', name: 'Quechua', nativeName: 'Quechua' },
    { code: 'ay', name: 'Aymara', nativeName: 'Aymara' },
  ],
  Brazil: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
  ],
  Nigeria: [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ha', name: 'Hausa', nativeName: 'Hausa' },
    { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá' },
    { code: 'ig', name: 'Igbo', nativeName: 'Igbo' },
  ],
  Ghana: [
    { code: 'en', name: 'English', nativeName: 'English' },
  ],
  Kenya: [
    { code: 'en', name: 'English', nativeName: 'English' },
  ],
  'South Africa': [
    { code: 'en', name: 'English', nativeName: 'English' },
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
