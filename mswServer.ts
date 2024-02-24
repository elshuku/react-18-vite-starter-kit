import {SetupServer, setupServer} from 'msw/node'
import {RestHandler} from "msw";
import {StoryObj} from "@storybook/react";

/**
 * setup msw for jest tests
 *
 */
const server = setupServer()

export const addMocks = (server: SetupServer, mocks: [RestHandler]) => {
  server.use(...mocks);
}

export const addMocksFromStory = (server: SetupServer, story: StoryObj) => {
  const mswHandlers = story?.parameters?.msw?.handlers;
  addMocks(server, mswHandlers);
}

export default server;
