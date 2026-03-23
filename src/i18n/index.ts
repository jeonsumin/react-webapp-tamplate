import type { Locale, Translations, TranslationKey, TFunction } from './types';

export type { Locale, TranslationKey, TFunction, Translations };

export const LOCALES: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
};

const SUPPORTED_LOCALES = Object.keys(LOCALES) as Locale[];
const STORAGE_KEY = 'locale';

/** fetch한 번역 데이터를 메모리에 캐싱 */
const cache: Partial<Record<Locale, Translations>> = {};

/** 저장된 locale 또는 브라우저 언어 기반으로 초기값 결정 */
export function getInitialLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored && SUPPORTED_LOCALES.includes(stored)) return stored;
  const browser = navigator.language.split('-')[0] as Locale;
  return SUPPORTED_LOCALES.includes(browser) ? browser : 'ko';
}

export function saveLocale(locale: Locale) {
  localStorage.setItem(STORAGE_KEY, locale);
}

/** public/locales/{locale}.json 을 fetch — 이미 로드한 경우 캐시 반환 */
export async function fetchTranslations(locale: Locale): Promise<Translations> {
  if (cache[locale]) return cache[locale]!;
  const res = await fetch(`/locales/${locale}.json`);
  if (!res.ok) throw new Error(`Failed to load locale: ${locale}`);
  const data = (await res.json()) as Translations;
  cache[locale] = data;
  return data;
}

/** 점 표기법 키로 중첩 객체에서 값 추출 */
function resolvePath(obj: Record<string, unknown>, path: string): string {
  const result = path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
  return typeof result === 'string' ? result : path;
}

/** 보간: {{name}} 형태의 변수를 치환 */
function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => String(vars[key] ?? `{{${key}}}`));
}

export function createT(translations: Translations): TFunction {
  const messages = translations as unknown as Record<string, unknown>;
  return (key, vars) => interpolate(resolvePath(messages, key), vars);
}
