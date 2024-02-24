import {describe, expect, it} from "@jest/globals";
import '@testing-library/jest-dom'
import {act, waitFor, renderHook} from '@testing-library/react'
import useTimer from "@/timer/useTimer";

describe('Timer Page', () => {

  const renderTimerHook = (initialValue: number) => renderHook(useTimer, {initialProps: {initialValue}});

  it('renders in initialised position', () => {
    const {result} = renderTimerHook(0);
    const [isTimerRunning, displayedTime] = result.current;
    expect(isTimerRunning).toEqual(false);
    expect(displayedTime).toEqual(0);
  });

  it('starts timer successfully', async () => {
    const {result} = renderTimerHook(0);
    const [,,startTimer] = result.current;
    act(() => {
      startTimer();
    });

    const [isTimerRunning, displayedTime] = result.current;
    expect(isTimerRunning).toEqual(true);
    expect(displayedTime).toEqual(0);

    await waitFor(() => {
      const [, displayedTime] = result.current;
      expect(displayedTime).toBeGreaterThan(0);
    })
  })

  it('stops timer successfully', () => {
    const {result} = renderTimerHook(0);
    const [isTimerRunning, displayedTime, startTimer, stopTimer] = result.current;
    expect(isTimerRunning).toEqual(false);

    act(() => {
      startTimer();
    });
    const [isTimerStillRunning] = result.current;
    expect(isTimerStillRunning).toEqual(true);

    act(() => {
      stopTimer();
    });
    const [newIsTimerRunning, newDisplayedTime] = result.current;
    expect(newIsTimerRunning).toEqual(false);
    expect(newDisplayedTime).toEqual(displayedTime);
  })
});