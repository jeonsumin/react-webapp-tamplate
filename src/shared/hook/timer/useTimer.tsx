import { useEffect, useRef, useState } from 'react'

type TimerID = ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>

export const useTimer = () => {
    const timerIDs = useRef<Set<TimerID>>(new Set())

    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)
    const [isRunning, setIsRunning] = useState(false)
    const [timeLeft, setTimeLeft] = useState<number>(0)

    const setTimer = (callback: () => void, delay: number): TimerID => {
        const id = setTimeout(() => {
            callback()
            timerIDs.current.delete(id)
        }, delay)
        timerIDs.current.add(id)
        return id
    }

    const setIntervalTimer = (callback: () => void, delay: number): TimerID => {
        const id = setInterval(callback, delay)
        timerIDs.current.add(id)
        return id
    }

    const clearTimer = (id: TimerID) => {
        clearTimeout(id)
        clearInterval(id)
        timerIDs.current.delete(id)
    }

    const clearAllTimers = () => {
        timerIDs.current.forEach((id) => {
            clearTimeout(id)
            clearInterval(id)
        })
        timerIDs.current.clear()
    }

    const startTimer = (time: number = 10) => {
        setTimeLeft(time)
        if (isRunning) return

        setIsRunning(true)
        const id = setIntervalTimer(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    stopTimer()
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        setTimerId(id)
    }

    /** 타이머 멈춤 */
    const stopTimer = () => {
        if (timerId) {
            clearTimer(timerId)
            setTimerId(null)
        }
        setIsRunning(false)
    }

    useEffect(() => {
        return () => clearAllTimers()
    }, [])

    return {
        setTimer,
        setIntervalTimer,
        clearTimer,
        clearAllTimers,
        startTimer,
        stopTimer,
        timeLeft,
    }
}
