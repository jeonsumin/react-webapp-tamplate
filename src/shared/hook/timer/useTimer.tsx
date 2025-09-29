import {useEffect, useRef} from "react";

type TimerID = NodeJS.Timeout;

export const useTimer = () => {
    const timerIDs = useRef<Set<TimerID>>(new Set());
    const setTimer = (callback: () => void, delay: number) => {
        const id = setTimeout(callback, delay);
        timerIDs.current.add(id);
        return id;
    };
    const clearTimer = (id: TimerID) => {
        clearTimeout(id);
        timerIDs.current.delete(id);
    };
    const clearAllTimers = () => {
        timerIDs.current.forEach(clearTimeout);
        timerIDs.current.clear();
    };
    useEffect(() => {
        return () => clearAllTimers();
    }, []);
    return {setTimer, clearTimer, clearAllTimers};

}
