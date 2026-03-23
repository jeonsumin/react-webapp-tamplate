/** 번역 파일(public/locales/*.json)의 구조 정의 — 새 키 추가 시 여기에 먼저 추가 */
export interface Translations {
  common: {
    save: string;
    cancel: string;
    confirm: string;
    delete: string;
    edit: string;
    close: string;
    loading: string;
    error: string;
    retry: string;
    search: string;
    noData: string;
  };
  nav: {
    home: string;
    about: string;
  };
  home: {
    title: string;
    subtitle: string;
  };
}

/** 지원 언어 */
export type Locale = 'ko' | 'en';

/**
 * 중첩 객체의 모든 leaf 키를 점 표기법 문자열로 추출
 * 예: 'common.save' | 'common.cancel' | 'nav.home' | ...
 */
type DotPaths<T, Prefix extends string = ''> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? DotPaths<T[K], `${Prefix}${K & string}.`>
    : `${Prefix}${K & string}`;
}[keyof T];

export type TranslationKey = DotPaths<Translations>;

/** t() 함수 타입 — 보간 변수 지원 */
export type TFunction = (key: TranslationKey, vars?: Record<string, string | number>) => string;
