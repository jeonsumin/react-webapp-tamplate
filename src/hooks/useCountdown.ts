import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCountdownOptions {
  /** 카운트다운 시작 시간 (ms) */
  duration: number;
  /** 자동 시작 여부 (기본값: false) */
  autoStart?: boolean;
  /** tick 간격 ms (기본값: 1000) */
  interval?: number;
  /** 0이 됐을 때 호출되는 콜백 */
  onComplete?: () => void;
  /** tick마다 호출되는 콜백 */
  onTick?: (remaining: number) => void;
}

interface UseCountdownReturn {
  /** 남은 시간 (ms) */
  remaining: number;
  /** 남은 시간을 { hours, minutes, seconds, ms } 로 분해한 값 */
  time: TimeParts;
  /** 0 ~ 1 사이의 진행률 (1 = 시작, 0 = 완료) */
  progress: number;
  isRunning: boolean;
  isCompleted: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  toggle: () => void;
  /** duration을 새 값으로 교체하고 리셋 */
  restart: (newDuration?: number) => void;
}

interface TimeParts {
  hours: number;
  minutes: number;
  seconds: number;
  ms: number;
}

function toTimeParts(ms: number): TimeParts {
  const clamped = Math.max(0, ms);
  const totalSeconds = Math.floor(clamped / 1000);
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    ms: clamped % 1000,
  };
}

/**
 * 카운트다운 타이머 훅.
 *
 * @example
 * const { time, progress, isCompleted, start, reset } = useCountdown({
 *   duration: 60_000,   // 60초
 *   onComplete: () => toast.info('시간 종료!'),
 * });
 * `${time.minutes}:${String(time.seconds).padStart(2, '0')}`
 */
export function useCountdown(options: UseCountdownOptions): UseCountdownReturn {
  const { autoStart = false, interval = 1000, onComplete, onTick } = options;

  const durationRef = useRef(options.duration);
  const [remaining, setRemaining] = useState(options.duration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isCompleted, setIsCompleted] = useState(false);

  const startedAtRef = useRef<number | null>(null);
  const remainingAtPauseRef = useRef(options.duration);
  const onCompleteRef = useRef(onComplete);
  const onTickRef = useRef(onTick);
  onCompleteRef.current = onComplete;
  onTickRef.current = onTick;

  useEffect(() => {
    if (!isRunning) return;
    startedAtRef.current = performance.now();

    const id = setInterval(() => {
      const elapsed = performance.now() - (startedAtRef.current ?? performance.now());
      const next = Math.max(0, remainingAtPauseRef.current - elapsed);
      setRemaining(next);
      onTickRef.current?.(next);

      if (next <= 0) {
        clearInterval(id);
        setIsRunning(false);
        setIsCompleted(true);
        onCompleteRef.current?.();
      }
    }, interval);

    return () => clearInterval(id);
  }, [isRunning, interval]);

  const start = useCallback(() => {
    if (isCompleted) return;
    setIsRunning(true);
  }, [isCompleted]);

  const pause = useCallback(() => {
    if (startedAtRef.current !== null) {
      const elapsed = performance.now() - startedAtRef.current;
      remainingAtPauseRef.current = Math.max(0, remainingAtPauseRef.current - elapsed);
      startedAtRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    startedAtRef.current = null;
    remainingAtPauseRef.current = durationRef.current;
    setRemaining(durationRef.current);
    setIsRunning(false);
    setIsCompleted(false);
  }, []);

  const toggle = useCallback(() => {
    if (isCompleted) return;
    setIsRunning((prev) => {
      if (prev && startedAtRef.current !== null) {
        const elapsed = performance.now() - startedAtRef.current;
        remainingAtPauseRef.current = Math.max(0, remainingAtPauseRef.current - elapsed);
        startedAtRef.current = null;
      }
      return !prev;
    });
  }, [isCompleted]);

  const restart = useCallback((newDuration?: number) => {
    const d = newDuration ?? durationRef.current;
    durationRef.current = d;
    startedAtRef.current = null;
    remainingAtPauseRef.current = d;
    setRemaining(d);
    setIsRunning(true);
    setIsCompleted(false);
  }, []);

  return {
    remaining,
    time: toTimeParts(remaining),
    progress: remaining / durationRef.current,
    isRunning,
    isCompleted,
    start,
    pause,
    reset,
    toggle,
    restart,
  };
}
