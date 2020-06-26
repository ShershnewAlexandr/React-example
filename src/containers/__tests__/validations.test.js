import React from 'react';
import '../../setupTests';
import { fromJS } from 'immutable';
import ContactsFormValidate from '../contacts/validate';
import EducatioinFormValidate from '../education/validate';
import ExperienceFormValidate from '../experience/validate';
import LoginFormValidate from '../login/validate';
import RegisterFormValidate from '../register/validate';

describe('ContactsForm validation', () => {
  it('good values', () => {
    const values = fromJS({
      firstName: 'name',
      lastName: 'lastname',
      dateOfBirthday: '10-10-1999',
    });
    const errors = {};
    expect(ContactsFormValidate(values)).toEqual(errors);
  });

  it('required values', () => {
    const values = fromJS({
      firstName: '',
      lastName: '',
      dateOfBirthday: '',
    });
    const errors = {
      firstName: 'errors.required',
      lastName: 'errors.required',
      dateOfBirthday: 'errors.required',
    };
    expect(ContactsFormValidate(values)).toEqual(errors);
  });

  it('types values', () => {
    const values = fromJS({
      firstName: 2,
      lastName: true,
      dateOfBirthday: '10-10-2020',
    });
    const errors = {
      firstName: 'errors.notString',
      lastName: 'errors.notString',
      dateOfBirthday: 'errors.tooLate',
    };
    expect(ContactsFormValidate(values)).toEqual(errors);
  });
});

describe('EducationForm validation', () => {
  it('good values', () => {
    const values = fromJS({
      education: [
        {
          schoolName: 'schoolName',
          startYear: '10-10-1999',
          endYear: '10-10-2000',
        },
      ],
    });
    const errors = {};
    expect(EducatioinFormValidate(values)).toEqual(errors);
  });

  it('required values', () => {
    const values = fromJS({
      education: [
        {
          schoolName: '',
          startYear: '',
          endYear: '',
        },
      ],
    });
    const errors = {
      education: [
        {
          schoolName: 'errors.required',
          startYear: 'errors.required',
          endYear: 'errors.required',
        },
      ],
    };
    expect(EducatioinFormValidate(values)).toEqual(errors);
  });

  it('intersection values', () => {
    const values = fromJS({
      education: [
        {
          schoolName: 'schoolName',
          startYear: '10-10-1999',
          endYear: '10-10-2000',
        },
        {
          schoolName: 'schoolName',
          startYear: '10-10-1999',
          endYear: '10-10-2000',
        },
      ],
    });
    const errors = {
      education: [
        undefined,
        {
          startYear: 'errors.intersection',
        },
      ],
    };
    expect(EducatioinFormValidate(values)).toEqual(errors);
  });
});

describe('ExperienceForm validation', () => {
  it('good values', () => {
    const values = fromJS({
      experience: [
        {
          companyName: 'companyName',
          profile: 'profile',
          startYear: '10-10-1999',
          endYear: '10-10-2000',
        },
      ],
    });
    const errors = {};
    expect(ExperienceFormValidate(values)).toEqual(errors);
  });

  it('required values', () => {
    const values = fromJS({
      experience: [
        {
          companyName: '',
          profile: '',
          startYear: '',
          endYear: '',
        },
      ],
    });
    const errors = {
      experience: [
        {
          companyName: 'errors.required',
          profile: 'errors.required',
          startYear: 'errors.required',
          endYear: 'errors.required',
        },
      ],
    };
    expect(ExperienceFormValidate(values)).toEqual(errors);
  });

  it('3rd company error values', () => {
    const values = fromJS({
      experience: [
        {
          companyName: 'companyName',
          profile: 'profile',
          startYear: '10-10-1999',
          endYear: '10-10-2000',
        },
        {
          companyName: 'companyName',
          profile: 'profile',
          startYear: '10-10-1999',
          endYear: '10-10-2000',
        },
        {
          companyName: 'companyName',
          profile: 'profile',
          startYear: '10-10-1999',
          endYear: '10-10-2000',
        },
      ],
    });
    const errors = {
      experience: [
        undefined,
        undefined,
        {
          startYear: 'errors.3rdCompany',
        },
      ],
    };
    expect(ExperienceFormValidate(values)).toEqual(errors);
  });
});

describe('LoginForm validation', () => {
  it('good values', () => {
    const values = fromJS({
      login: 'login',
      password: 'password',
    });
    const errors = {};
    expect(LoginFormValidate(values)).toEqual(errors);
  });

  it('Required values', () => {
    const values = fromJS({
      login: '',
      password: '',
    });
    const errors = {
      login: 'errors.required',
      password: 'errors.required',
    };
    expect(LoginFormValidate(values)).toEqual(errors);
  });

  it('Types values', () => {
    const values = fromJS({
      login: 4,
      password: 32,
    });
    const errors = {
      login: 'errors.notString',
      password: 'errors.notString',
    };
    expect(LoginFormValidate(values)).toEqual(errors);
  });
});

describe('RegisterForm validation', () => {
  it('good values', () => {
    const values = fromJS({
      email: 'first@noveogroup.com',
      password: 'password',
      name: 'name',
    });
    const errors = {};
    expect(RegisterFormValidate(values)).toEqual(errors);
  });

  it('Required values', () => {
    const values = fromJS({
      email: '',
      password: '',
      name: '',
    });
    const errors = {
      email: 'errors.required',
      password: 'errors.required',
      name: 'errors.required',
    };
    expect(RegisterFormValidate(values)).toEqual(errors);
  });
});
