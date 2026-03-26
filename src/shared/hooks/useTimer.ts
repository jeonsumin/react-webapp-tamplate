import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerOptions {
  /** 자동 시작 여부 (기본값: false) */
  autoStart?: boolean;
  /** tick 간격 ms (기본값: 1000) */
  interval?: number;
  /** tick마다 호출되는 콜백 */
  onTick?: (elapsed: number) => void;
}

interface UseTimerReturn {
  /** 경과 시간 (ms) */
  elapsed: number;
  /** 경과 시간을 { hours, minutes, seconds, ms } 로 분해한 값 */
  time: Timeparts;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  /** 일시정지 ↔ 실행 토글 */
  toggle: () => void;
}

interface Timeparts {
  hours: number;
  minutes: number;
  seconds: number;
  ms: number;
}

function toTimeParts(ms: number): Timeparts {
  const totalSeconds = Math.floor(ms / 1000);
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    ms: ms % 1000,
  };
}

/**
 * 스톱워치 형태의 타이머 훅.
 * elapsed 는 ms 단위로 증가하며, time 으로 분해된 값을 편하게 사용 가능.
 *
 * @example
 * const { time, isRunning, start, pause, reset } = useTimer({ autoStart: true });
 * `${time.minutes}:${String(time.seconds).padStart(2, '0')}`
 */
export function useTimer(options: UseTimerOptions = {}): UseTimerReturn {
  const { autoStart = false, interval = 1000, onTick } = options;

  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(autoStart);
  const startedAtRef = useRef<number | null>(null);
  const accumulatedRef = useRef(0);
  const onTickRef = useRef(onTick);
  onTickRef.current = onTick;

  useEffect(() => {
    if (!isRunning) return;
    startedAtRef.current = performance.now();

    const id = setInterval(() => {
      const now = performance.now();
      const total = accumulatedRef.current + (now - (startedAtRef.current ?? now));
      setElapsed(total);
      onTickRef.current?.(total);
    }, interval);

    return () => clearInterval(id);
  }, [isRunning, interval]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    if (startedAtRef.current !== null) {
      accumulatedRef.current += performance.now() - startedAtRef.current;
      startedAtRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    accumulatedRef.current = 0;
    startedAtRef.current = null;
    setIsRunning(false);
    setElapsed(0);
  }, []);

  const toggle = useCallback(() => {
    setIsRunning((prev) => {
      if (prev && startedAtRef.current !== null) {
        accumulatedRef.current += performance.now() - startedAtRef.current;
        startedAtRef.current = null;
      }
      return !prev;
    });
  }, []);

  return { elapsed, time: toTimeParts(elapsed), isRunning, start, pause, reset, toggle };
}
