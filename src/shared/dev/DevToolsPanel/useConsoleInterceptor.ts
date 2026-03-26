import { useEffect } from 'react';
import { useDevStore, type LogLevel } from '@/shared/store/devStore';

const LEVELS: LogLevel[] = ['log', 'info', 'warn', 'error'];

/**
 * 전역 console을 가로채서 devStore에 로그를 기록.
 * 컴포넌트 언마운트 시 원본 console 복원.
 */
export function useConsoleInterceptor() {
  const addLog = useDevStore((s) => s.addLog);

  useEffect(() => {
    const originals = Object.fromEntries(
      LEVELS.map((level) => [level, console[level].bind(console)])
    ) as Record<LogLevel, (...args: unknown[]) => void>;

    LEVELS.forEach((level) => {
      console[level] = (...args: unknown[]) => {
        originals[level](...args);
        addLog(level, args.map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' '));
      };
    });

    return () => {
      LEVELS.forEach((level) => {
        console[level] = originals[level];
      });
    };
  }, [addLog]);
}
