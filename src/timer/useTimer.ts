import {useEffect, useState} from "react";

export type UseTimerProps = { initialValue: number };
export type RenderHookResult = [boolean, number, () => void, () => void, () => void];
const calculateLapsedTime = (initialLapsedTime: number, startTime: number, stoppedPeriods: number[]) => Math.floor((initialLapsedTime + Date.now() - startTime - stoppedPeriods.reduce((ac, cur) => ac + cur, 0)) / 100) / 10;
export default ({initialValue = 0}: UseTimerProps): RenderHookResult => {
  const [isTimerRunning, setTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [lastStoppedTime, setLastStoppedTime] = useState(0);
  const [stoppedPeriods, setStoppedPeriods] = useState<number[]>([]);
  const [displayedTime, setDisplayedTime] = useState(initialValue);

  const getLapsedTime = () => calculateLapsedTime(initialValue * 1000, startTime, stoppedPeriods);

  useEffect(() => {
    const ticker = setInterval(() => {
      if (isTimerRunning)
        setDisplayedTime(getLapsedTime());
    }, 100)
    return () => {
      clearInterval(ticker);
    }
  }, [isTimerRunning]);

  const startTimer = () => {
    setTimerRunning(true);
    if (!startTime)
      setStartTime(Date.now());

    if (lastStoppedTime) {
      setStoppedPeriods(stoppedPeriods.concat(Date.now() - lastStoppedTime))
      setLastStoppedTime(0);
    }
  }

  const stopTimer = () => {
    setTimerRunning(false);
    setLastStoppedTime(Date.now());
  }

  const resetTimer = () => {
    setTimerRunning(false);
    setStoppedPeriods([]);
    setLastStoppedTime(0);
    setStartTime(0);
    setDisplayedTime(initialValue);
  }

  return [isTimerRunning, displayedTime, startTimer, stopTimer, resetTimer];
}
