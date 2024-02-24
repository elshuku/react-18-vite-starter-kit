import {render, screen, waitFor} from '@testing-library/react'
import {composeStories} from '@storybook/testing-react';
import * as stories from '../Timezones.stories';
import server, {addMocksFromStory} from "../../../mswServer.ts";
import {ERROR_CONDITIONS, ERROR_MESSAGES, LOADING_STATE} from "@/util/async.ts";
import '@testing-library/jest-dom/matchers'

const {Primary, NetworkTimeout} = composeStories(stories);
describe('Timezones', () => {
  beforeEach( () => {
    addMocksFromStory(server, Primary);
  });

  it('empty list is displayed in the initial render', async () => {
    render(<Primary/>);
    const listing = await screen.findByRole('list')
    expect(listing).toBeInTheDocument();
    expect(listing.children.length).toBe(0);
  });

  it('list of timezones is displayed once api returns', async () => {
    render(<Primary/>);
    const listing = await screen.findByRole('list');

    await waitFor( () => {
      expect(listing).toHaveClass(`loading-state-${LOADING_STATE.SUCCESS}`);
      expect(listing.children.length).toBeGreaterThan(10);
    });
  });
});

describe('Timezones', () => {
  beforeEach( () => {
    addMocksFromStory(server, NetworkTimeout);
  });

  it('list of timezones is displayed once api returns', async () => {
    render(<NetworkTimeout/>);
    const error = await screen.findByRole('alert');
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent(ERROR_MESSAGES[ERROR_CONDITIONS.TypeError]);
    const listing = await screen.getByRole('list');
    expect(listing).toHaveClass(`loading-state-${LOADING_STATE.FAIL}`);
  });
});