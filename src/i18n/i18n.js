import i18n from 'i18next';
import backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import ruIcon from '../assets/img/russia_round_icon_64.png';
import enIcon from '../assets/img/united_kingdom_round_icon_64.png';
import frIcon from '../assets/img/france_round_icon_64.png';

export const supportedLanguages = [
  {
    code: 'en',
    icon: enIcon,
  },
  {
    code: 'ru',
    icon: ruIcon,
  },
  {
    code: 'fr',
    icon: frIcon,
  },
];

i18n.use(backend).use(initReactI18next);

export default i18n;
