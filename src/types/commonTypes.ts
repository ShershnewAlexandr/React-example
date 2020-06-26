import { Map } from 'immutable';
import { LoginActionTypes } from '../ducks/login/types';
import { MainActionTypes } from '../ducks/root/types';
import { ProgressBarActionTypes } from '../ducks/progressBar/types';
import { Language } from './formDataTypes';
import { CardsActionTypes } from '../ducks/cards/types';

export type AppActions =
  | LoginActionTypes
  | MainActionTypes
  | ProgressBarActionTypes
  | CardsActionTypes;

export type TypedMap<DataType> = ITypedMap<DataType> & DataType;

export interface ITypedMap<DataType> extends Map<any, any> {
  toJS(): DataType;
  get<K extends keyof DataType>(key: K, notSetValue?: DataType[K]): DataType[K];
  set<K extends keyof DataType>(key: K, value: DataType[K]): this;
  setIn<
    K1 extends keyof DataType,
    K2 extends keyof DataType[K1],
    K3 extends keyof DataType[K1][K2],
    K4 extends keyof DataType[K1][K2][K3],
    K5 extends keyof DataType[K1][K2][K3][K4],
    K6 extends keyof DataType[K1][K2][K3][K4][K5],
    K7 extends keyof DataType[K1][K2][K3][K4][K5][K6]
  >(
    path: [K1, K2, K3, K4, K5, K6, K7],
    val: DataType[K1][K2][K3][K4][K5][K6][K7],
  ): this;
  setIn<
    K1 extends keyof DataType,
    K2 extends keyof DataType[K1],
    K3 extends keyof DataType[K1][K2],
    K4 extends keyof DataType[K1][K2][K3],
    K5 extends keyof DataType[K1][K2][K3][K4],
    K6 extends keyof DataType[K1][K2][K3][K4][K5]
  >(
    path: [K1, K2, K3, K4, K5, K6],
    val: DataType[K1][K2][K3][K4][K5][K6],
  ): this;
  setIn<
    K1 extends keyof DataType,
    K2 extends keyof DataType[K1],
    K3 extends keyof DataType[K1][K2],
    K4 extends keyof DataType[K1][K2][K3],
    K5 extends keyof DataType[K1][K2][K3][K4]
  >(
    path: [K1, K2, K3, K4, K5],
    val: DataType[K1][K2][K3][K4][K5],
  ): this;
  setIn<
    K1 extends keyof DataType,
    K2 extends keyof DataType[K1],
    K3 extends keyof DataType[K1][K2],
    K4 extends keyof DataType[K1][K2][K3]
  >(
    path: [K1, K2, K3, K4],
    val: DataType[K1][K2][K3][K4],
  ): this;
  setIn<
    K1 extends keyof DataType,
    K2 extends keyof DataType[K1],
    K3 extends keyof DataType[K1][K2]
  >(
    path: [K1, K2, K3],
    val: DataType[K1][K2][K3],
  ): this;
  setIn<K1 extends keyof DataType, K2 extends keyof DataType[K1]>(
    path: [K1, K2],
    val: DataType[K1][K2],
  ): this;
  setIn<K1 extends keyof DataType>(path: [K1], val: DataType[K1]): this;
  getIn<
    K1 extends keyof DataType,
    K2 extends keyof DataType[K1],
    K3 extends keyof DataType[K1][K2],
    K4 extends keyof DataType[K1][K2][K3],
    K5 extends keyof DataType[K1][K2][K3][K4],
    K6 extends keyof DataType[K1][K2][K3][K4][K5],
    K7 extends keyof DataType[K1][K2][K3][K4][K5][K6]
  >(
    path: [K1, K2, K3, K4, K5, K6, K7],
  ): DataType[K1][K2][K3][K4][K5][K6][K7];
  getIn<
    K1 extends keyof DataType,
    K2 extends keyof DataType[K1],
    K3 extends keyof DataType[K1][K2],
    K4 extends keyof DataType[K1][K2][K3],
    K5 extends keyof DataType[K1][K2][K3][K4],
    K6 extends keyof DataType[K1][K2][K3][K4][K5]
  >(
    path: [K1, K2, K3, K4, K5, K6],
  ): DataType[K1][K2][K3][K4][K5][K6];
  getIn<
    K1 extends keyof DataType,
    K2 extends keyof DataType[K1],
    K3 extends keyof DataType[K1][K2],
    K4 extends keyof DataType[K1][K2][K3],
    K5 extends keyof DataType[K1][K2][K3][K4]
  >(
    path: [K1, K2, K3, K4, K5],
  ): DataType[K1][K2][K3][K4][K5];
  getIn<
    K1 extends keyof DataType,
    K2 extends keyof DataType[K1],
    K3 extends keyof DataType[K1][K2],
    K4 extends keyof DataType[K1][K2][K3]
  >(
    path: [K1, K2, K3, K4],
  ): DataType[K1][K2][K3][K4];
  getIn<
    K1 extends keyof DataType,
    K2 extends keyof DataType[K1],
    K3 extends keyof DataType[K1][K2]
  >(
    path: [K1, K2, K3],
  ): DataType[K1][K2][K3];
  getIn<K1 extends keyof DataType, K2 extends keyof DataType[K1]>(
    path: [K1, K2],
  ): DataType[K1][K2];
  getIn<K1 extends keyof DataType>(path: [K1]): DataType[K1];
}

export const createTypedMap = <DataType>(data: DataType): TypedMap<DataType> =>
  Map(data as any) as any;

export interface ProgressBarState {
  step: number;
  avatar?: any;
  isLoading: boolean;
}

export interface LoginState {
  token: string;
  isLogining: boolean;
  user?: string;
  languagesList?: Array<Language>;
}

export interface RootState {
  form: any;
  login: TypedMap<LoginState>;
  progressBar: TypedMap<ProgressBarState>;
}

export interface CardsState {
  posts: { [key: string]: ICard };
  isLoading: boolean;
  postsMeta: {
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
  };
  editPost: {
    title?: string;
    content?: string;
  };
}

export interface ICard {
  id: number;
  title: string;
  content: string;
  liked: boolean;
  total_likes: number;
}
