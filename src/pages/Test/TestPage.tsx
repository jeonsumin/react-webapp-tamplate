import { Button } from "@/components/ui";
import { useCountdown } from "@/hooks/useCountdown";
import { useTimer } from "@/hooks/useTimer";
import { modal } from "@/store/modalStore";
import { toast } from "@/store/toastStore";

export const TestPage = () => {
  const openConfirm = () => {
    modal.open({
      title: "Confirm Action",
      content: "Are you sure you want to perform this action?",
      footer: (
        <>
          <Button onClick={() => modal.close()} variant="outline" size="sm">
            Cancel
          </Button>
          <Button onClick={() => modal.closeAll()} variant="danger" size="sm">
            Confirm & Close All
          </Button>
        </>
      ),
    });
  };

  const {
    time: timer,
    isRunning: isTimerRunning,
    start: timerStart,
    pause: timerPause,
    reset: timerReset,
    toggle: timerToggle,
  } = useTimer();

  const { time, progress, isCompleted, start, reset, restart } = useCountdown({
    duration: 5_000, // 60초
    onComplete: () => toast.info("시간 종료!"),
    onTick: (remaining) => console.log(remaining),
  });

  const startTimer = () => {
    timerStart();
  };

  const testLogs = () => {
    modal.open({
      title: "Test Modal",
      content:
        "This is a test modal. Click 'Open Nested' to stack another modal on top.",
      footer: (
        <>
          <Button onClick={() => modal.close()} variant="outline" size="sm">
            Close
          </Button>
          <Button onClick={openConfirm} size="sm">
            Open Nested
          </Button>
        </>
      ),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Test</h2>
        <p className="mt-1 text-sm text-gray-500">
          Test page for the template project.
        </p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col space-y-3">
        <div className="flex space-x-3 items-center">
          <p>Modal Test : </p>
          <Button variant="outline" onClick={testLogs}>
            Open Modal
          </Button>
        </div>

        <div className="flex space-x-3 items-center">
          <p>Timer Test : </p>
          <Button variant="outline" onClick={startTimer}>
            start Timer
          </Button>
          <span>{`${String(timer.hours).padStart(2, "0")}:${String(timer.minutes).padStart(2, "0")}:${String(timer.seconds).padStart(2, "0")}`}</span>
        </div>

        <div className="flex space-x-3 items-center">
          <p>CountDown Test : </p>
          <Button variant="outline" onClick={start}>
            Start CountDown
          </Button>
          <span>{`${String(time.hours).padStart(2, "0")}:${String(time.minutes).padStart(2, "0")}:${String(time.seconds).padStart(2, "0")}`}</span>
        </div>
      </div>
    </div>
  );
};
