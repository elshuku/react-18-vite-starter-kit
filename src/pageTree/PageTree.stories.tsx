import {rest} from 'msw'
import PageTree from './PageTree.tsx';
import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof PageTree> = {
  title: 'App/PageTree',
  component: PageTree,
}
export default meta;

type Story = StoryObj<typeof PageTree>;

export const Primary: Story = {}