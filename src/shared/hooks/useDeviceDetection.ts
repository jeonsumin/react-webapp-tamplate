import { useState, useEffect } from 'react';

function detectMobile(): boolean {
  const mobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    navigator.userAgent
  );
  const touchDevice = window.matchMedia('(pointer: coarse)').matches;
  return mobileUA || touchDevice;
}

/**
 * 기기 타입을 감지하는 훅.
 * userAgent와 pointer 미디어 쿼리를 조합해 모바일 여부를 판별.
 * 창 크기 변경 시 재감지 (개발 중 테스트 용도).
 */
export function useDeviceDetection() {
  const [isMobile, setIsMobile] = useState<boolean>(() => detectMobile());

  useEffect(() => {
    const handler = () => setIsMobile(detectMobile());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return { isMobile };
}
