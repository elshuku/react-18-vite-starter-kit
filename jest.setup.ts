import "@jest/globals";
import "@jest/types";
import '@testing-library/jest-dom/jest-globals'
import '@testing-library/jest-dom'
import 'cross-fetch/polyfill';
import server from "./mswServer";
import {afterAll, afterEach, beforeAll} from "@jest/globals";


beforeAll(() => {
  // Start the interception.
  server.listen()
})

afterEach(() => {
  // Remove any handlers you may have added
  // in individual tests (runtime handlers).
  server.resetHandlers()
})

afterAll(() => {
  // Disable request interception and clean up.
  server.close()
})