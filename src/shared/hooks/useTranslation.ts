import { useLocaleStore } from '@/shared/store/localeStore';

/**
 * 현재 locale의 t() 함수와 언어 전환 함수를 반환.
 *
 * @example
 * const { t, locale, setLocale } = useTranslation();
 * t('common.save')                        // '저장'
 * t('greeting', { name: '홍길동' })       // 보간 지원
 */
export function useTranslation() {
  const { t, locale, setLocale, locales } = useLocaleStore();
  return { t, locale, setLocale, locales };
}
