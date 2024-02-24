import {act, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Page, {PAGE_STATE} from '../Timer.tsx'

describe('Timer Page', () => {
  it('renders in initialised position', () => {
    render(<Page/>)

    const timerContainer = screen.getByRole('region', {name: /timer-container/i})
    expect(timerContainer).toBeInTheDocument();
    expect(timerContainer).toHaveClass(PAGE_STATE.INITIALISED);

    const timerDisplay = screen.getByRole('main', {name: /timer-display/i})
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
    expect(timerDisplay).toBeInTheDocument();
    expect(timerDisplay).toHaveTextContent('0');
  });

  it('renders in started position', async () => {
    const user = userEvent.setup()
    render(<Page/>)

    await act(async () => {
      await user.click(screen.getByRole('button', {name: /Start/i}))
    })

    const timerContainer = screen.getByRole('region', {name: /timer-container/i})
    expect(timerContainer).toHaveClass(PAGE_STATE.TIMER_RUNNING);

    const timerDisplay = screen.getByRole('main', {name: /timer-display/i})
    await waitFor(() => {
        expect(timerDisplay.textContent).not.toEqual('0')
      }
    )
  });

  it('renders correct timer after 100ms wait', async () => {
    const user = userEvent.setup()
    render(<Page/>)

    await act(async () => {
      await user.click(screen.getByRole('button', {name: /Start/i}))
    })

    const timerDisplay = screen.getByRole('main', {name: /timer-display/i})
    await waitFor(() => {
        expect(timerDisplay).toHaveTextContent('0.1')
      }
      , {
        /**
         * The time must be updated to 0.1 within 0.199 seconds
         */
        timeout: 199,
      }
    )
  });
})