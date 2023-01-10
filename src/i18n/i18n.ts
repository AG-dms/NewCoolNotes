import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Language } from './../utils/enums/language';
import actionRu from './locales/ru/action.json';
import formsRu from './locales/ru/forms.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  returnNull: false,
  lng: Language.RU,
  react: {
    useSuspense: false,
  },
  fallbackLng: Language.RU,
  defaultNS: 'action',
  keySeparator: '.',
  nsSeparator: ':',
  resources: {
    ru: {
      action: actionRu,
      forms: formsRu,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});
