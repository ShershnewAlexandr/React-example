require('dotenv').config({ path: '.env.test' });

const testImgSrc = 'testImg.png';
const testServerUrl = process.env.REACT_APP_testServerUrl;
const testUser = {
  login: 'admin@noveogroup.com',
  password: 'password',
};

const education = {
  skip: {
    blocks: [],
  },
  emptyFields: {
    blocks: [
      {
        schoolName: '',
        startYear: '',
        endYear: '',
        now: false,
      },
      {
        schoolName: '',
        startYear: '',
        endYear: '',
        now: false,
      },
    ],
  },
  correctData: {
    blocks: [
      {
        schoolName: 'testSchoolName1',
        startYear: '11112001',
        endYear: '10122005',
        now: false,
      },
      {
        schoolName: 'testSchoolName2',
        startYear: '11112006',
        endYear: '10122007',
        now: true,
      },
    ],
  },
};

const experience = {
  skip: {
    blocks: [],
  },
  emptyFields: {
    blocks: [
      {
        companyName: '',
        profile: '',
        startYear: '',
        endYear: '',
        now: false,
      },
      {
        companyName: '',
        profile: '',
        startYear: '',
        endYear: '',
        now: false,
      },
    ],
  },
  correctData: {
    fieldsNumber: 5,
    blocks: [
      {
        companyName: 'testSchoolName1',
        profile: 'testProfile1',
        startYear: '11112001',
        endYear: '10122005',
        now: false,
      },
      {
        companyName: 'testSchoolName2',
        profile: 'testProfile2',
        startYear: '11112006',
        endYear: '10122007',
        now: true,
      },
    ],
  },
};

const supportedLanguages = [
  {
    code: 'en',
  },
  {
    code: 'ru',
  },
  {
    code: 'fr',
  },
];

const baseURL = process.env.REACT_APP_baseURL;
const storageURL = process.env.REACT_APP_storageURL;

const rest = {
  appKey: process.env.REACT_APP_appKey,
  baseURL,
  storageURL,
  login: '/login',
  register: '/register',
  currentUser: '/user',
  avatar: id => `/users/${id}/avatar`,
  contacts: id => `/users/${id}`,
  education: id => `/users/${id}/educations`,
  experience: id => `/users/${id}/experiences`,
  languagesList: '/languages',
  languages: id => `/users/${id}/languages`,
  educationUp: (id, idEd) => `/users/${id}/educations/${idEd}`,
  experienceUp: (id, idEx) => `/users/${id}/experiences/${idEx}`,
  posts: '/posts',
  post: id => `/posts/${id}`,
  likePost: id => `/posts/${id}/like`,
};

const routes = {
  EDUCATION: `/information/education`,
  EXPERIENCE: `/information/experience`,
};

module.exports = {
  testImgSrc,
  testServerUrl,
  testUser,
  education,
  experience,
  supportedLanguages,
  rest,
  routes,
};
