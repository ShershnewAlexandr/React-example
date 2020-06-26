import { List } from 'immutable';
import { TypedMap } from './commonTypes';

export interface LoginFormData {
  login: string;
  password: string;
}

export interface Language {
  id: number;
  name: string;
  native_name: string;
  code: string;
  level: number;
  avereness: number;
  avg_knowledge_level: number;
}

export interface Education {
  id: number;
  schoolName: string;
  startYear: string;
  endYear: string;
}

export interface Experience {
  id: number;
  companyName: string;
  profile: string;
  startYear: string;
  endYear: string;
}

export interface AvatarFields {
  base64: string;
  fileInfo: { type: string };
}

export interface StartEducation {
  institution: string;
  enrolled_on: string;
  graduated_on: string;
  id: number;
}

export interface StartExperience {
  company_name: string;
  position: string;
  hired_on: string;
  quit_on: string;
  id: number;
}

export type Educations = List<TypedMap<Education>>;

export type Experiences = List<TypedMap<Experience>>;

export type StartEducations = List<StartEducation>;

export type StartExperiences = List<StartExperience>;

export type Avatar = TypedMap<AvatarFields>;

export type Languages = TypedMap<Language>;
