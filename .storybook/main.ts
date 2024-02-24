import type { StorybookConfig } from "@storybook/react-vite";
import alias from '@rollup/plugin-alias';

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config, options) {
    config.plugins.push(alias({ entries: [{ find: /^@\/(.*)/, replacement: 'src/$1' }] }))
    return config;
  },
};
export default config;
