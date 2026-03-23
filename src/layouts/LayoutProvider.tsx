import { VIEW_MODE } from '@/config/app.config';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import { WebLayout } from './WebLayout';
import { MobileLayout } from './MobileLayout';

interface LayoutProviderProps {
  children: React.ReactNode;
}

/**
 * Selects the appropriate layout based on VIEW_MODE.
 * - 'web' | 'mobile': ENV로 강제 지정
 * - 'auto': userAgent + pointer 미디어 쿼리로 기기 자동 감지
 */
export function LayoutProvider({ children }: LayoutProviderProps) {
  const { isMobile } = useDeviceDetection();

  if (VIEW_MODE === 'web') return <WebLayout>{children}</WebLayout>;
  if (VIEW_MODE === 'mobile') return <MobileLayout>{children}</MobileLayout>;

  // auto 모드: 기기 감지 결과로 결정
  return isMobile ? <MobileLayout>{children}</MobileLayout> : <WebLayout>{children}</WebLayout>;
}
