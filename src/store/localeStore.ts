import { create } from 'zustand';
import {
  getInitialLocale,
  saveLocale,
  fetchTranslations,
  createT,
  LOCALES,
  type Locale,
  type TFunction,
} from '@/i18n';

interface LocaleStore {
  locale: Locale;
  t: TFunction;
  isLoading: boolean;
  locales: typeof LOCALES;
  setLocale: (locale: Locale) => Promise<void>;
}

/** 로딩 중 fallback: 키를 그대로 반환 */
const fallbackT: TFunction = (key) => key;

export const useLocaleStore = create<LocaleStore>((set) => {
  // 스토어 생성 시 초기 언어 즉시 fetch
  const initialLocale = getInitialLocale();
  fetchTranslations(initialLocale).then((translations) => {
    set({ t: createT(translations), isLoading: false });
  });

  return {
    locale: initialLocale,
    t: fallbackT,
    isLoading: true,
    locales: LOCALES,
    setLocale: async (locale) => {
      set({ isLoading: true });
      saveLocale(locale);
      const translations = await fetchTranslations(locale);
      set({ locale, t: createT(translations), isLoading: false });
    },
  };
});

/** 컴포넌트 외부(유틸, API 레이어 등)에서 사용할 때 */
export const getT = (): TFunction => useLocaleStore.getState().t;
