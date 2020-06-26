const information = '/information';

const routes = {
  REGISTER: '/register',
  INFORMATION: information,
  CONTACTS: `${information}/contacts`,
  EDUCATION: `${information}/education`,
  EXPERIENCE: `${information}/experience`,
  LANGUAGES: `${information}/languages`,
  SIGNIN: '/signin',
  CARDLIST: '/cardlist',
  NEWCARD: '/newcard',
  EDITCARD: '/editcard/:id',
  EDITCARDID: (id: number) => `/editcard/${id}`,
};

const baseURL = process.env.REACT_APP_baseURL;
const storageURL = process.env.REACT_APP_storageURL;

export const defaultI18nLang = 'en';

const rest = {
  appKey: process.env.REACT_APP_appKey,
  baseURL,
  storageURL,
  login: '/login',
  register: '/register',
  currentUser: '/user',
  avatar: (id: number) => `/users/${id}/avatar`,
  contacts: (id: number) => `/users/${id}`,
  education: (id: number) => `/users/${id}/educations`,
  experience: (id: number) => `/users/${id}/experiences`,
  languagesList: '/languages',
  languages: (id: number) => `/users/${id}/languages`,
  educationUp: (id: number, idEd: number) => `/users/${id}/educations/${idEd}`,
  experienceUp: (id: number, idEx: number) =>
    `/users/${id}/experiences/${idEx}`,
  posts: '/posts',
  post: (id: number) => `/posts/${id}`,
  likePost: (id: number) => `/posts/${id}/like`,
};

const progressBarSteps = [
  {
    icon: 'face',
    translationKey: 'progressBar.contacts',
  },
  {
    icon: 'school',
    translationKey: 'progressBar.education',
  },
  {
    icon: 'work',
    translationKey: 'progressBar.experience',
  },
  {
    icon: '',
    translationKey: '',
  },
];

const steps = {
  CONTACTS: 1,
  EDUCATION: 2,
  EXPERIENCE: 3,
  LANGUAGES: 4,
  CARDLIST: 5,
};

export { routes, rest, progressBarSteps, steps };
