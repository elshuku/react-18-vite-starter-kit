import {useState, memo, useCallback, ReactNode, FC} from "react";
import useTimer from "@/timer/useTimer";

/**
 * Represents a standard button component with click event handling.
 * This is used to keep the code clean from all the class names and future configurations that affects standard buttons.
 * In a real application this would come from a component library inside or outside the application.
 *
 * @param {string|React.ReactNode} props.children - The content of the button.
 * @param {function} props.onClick - The event handler for the click event.
 * @returns {React.ReactNode} - The rendered button component.
 */

type StandardButtonPropTypes = {
  children: ReactNode,
  onClick: () => void
}

const StandardButton: FC<StandardButtonPropTypes> = ({children, onClick}) => {
  return <button type="button" onClick={onClick}
                 className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
    {children}
  </button>
}

export enum PAGE_STATE {
  INITIALISED = 'INITIALISED',
  TIMER_RUNNING = 'TIMER_RUNNING',
  TIMER_STOPPED = 'TIMER_STOPPED',
}

type ButtonPanelPropTypes =
  {
    startStopButtonLabel: string,
    onStartStopClicked: () => void,
    onResetClicked: () => void
  }

const ButtonsPanel: FC<ButtonPanelPropTypes> = memo(({startStopButtonLabel, onStartStopClicked, onResetClicked}) =>
  <aside className={"basis-3/4 flex flex-col"}>
    <div className={"p-4 basis-1/4"}>
      <StandardButton onClick={onStartStopClicked}>
        {startStopButtonLabel}
      </StandardButton>
    </div>
    <div className={"p-4 basis-1/4"}>
      <StandardButton onClick={onResetClicked}>
        Reset
      </StandardButton>
    </div>
  </aside>
);

type DisplayPanelPropTypes = { displayedTime: number, isTimerRunning: boolean }
const DisplayPanel: FC<DisplayPanelPropTypes> = ({displayedTime, isTimerRunning}) => {
  const timerDisplayClasses = ['p-8 m-8 timer-display'].concat(isTimerRunning ? 'border-solid border-2 border-indigo-600' : '');
  return <main aria-label="timer-display" className={"basis-1/4"}>
    <div className={timerDisplayClasses.join(' ')}>
      {displayedTime}
    </div>
  </main>
};

export default ({initialTimerValue = 0}) => {
  const [stateName, setStateName] = useState(PAGE_STATE.INITIALISED);
  const [isTimerRunning, displayedTime, startTimer, stopTimer, resetTimer] = useTimer({initialValue: initialTimerValue});
  const startStopButtonLabel = isTimerRunning ? 'Stop' : 'Start';

  const onStartClicked = () => {
    setStateName(PAGE_STATE.TIMER_RUNNING);
    startTimer();
  }

  const onStopClicked = () => {
    setStateName(PAGE_STATE.TIMER_STOPPED);
    stopTimer();
  }

  const onResetClicked =
    useCallback(
      () => {
        setStateName(PAGE_STATE.INITIALISED);
        resetTimer();
      }, [stateName]);

  const onStartStopClicked = useCallback(
    () => {
      if (isTimerRunning) {
        onStopClicked();
      } else {
        onStartClicked();
      }
    }, [stateName]);


  return <section aria-label="timer-container" className={`${stateName} container mx-auto`}>
    <div className="flex flex-row">
      <DisplayPanel displayedTime={displayedTime} isTimerRunning={isTimerRunning}/>
      <ButtonsPanel startStopButtonLabel={startStopButtonLabel} onStartStopClicked={onStartStopClicked}
                    onResetClicked={onResetClicked}/>
    </div>
  </section>
}