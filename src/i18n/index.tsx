import I18n from 'i18n-js';

import en from './locales/en';
import vi from './locales/vi';

I18n.fallbacks = true;
I18n.defaultLocale = 'vi';
I18n.locale = 'vi';

// choose a different default separator
// so it's allowed to use dots in i18n keys
I18n.defaultSeparator = '/';
I18n.translations = {
  en,
  vi
};

export const LANG = {
  EN: 'en',
  VI: 'vi'
};

export const setLang = (lang: string) => {
  I18n.defaultLocale = lang;
  I18n.locale = lang;
};

export const getLang = () => {
  return I18n.locale;
};

export default I18n;
