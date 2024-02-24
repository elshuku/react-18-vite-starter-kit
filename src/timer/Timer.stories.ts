import type { Meta, StoryObj } from '@storybook/react';

import Timer from './Timer.tsx';
import {expect, userEvent, within} from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'App/Timer',
  component: Timer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    initialTimerValue: { control: 'number' },
  },
} satisfies Meta<typeof Timer>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    initialTimerValue: 0,
  },
};

export const Primed = {
  args: {
    initialTimerValue: 1000,
  },
};


export const Started: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const startButton = canvas.getByRole('button', { name: /Start/i });
    await expect(startButton).toBeInTheDocument();
    await userEvent.click(startButton);

    setTimeout( () => {
      const stopButton = canvas.getByRole('button', { name: /Stop/i });
      userEvent.click(stopButton);
    }, 1500)
  },
};