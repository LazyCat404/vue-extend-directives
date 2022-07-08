import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import packageJson from './package.json';

const getPackageName = () => {
  return packageJson.name;
};

const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, char => char[1].toUpperCase());
  } catch (err) {
    throw new Error('Name property in package.json is missing.');
  }
};

module.exports = defineConfig({
  base: './',
  build: {
    lib: {
      entry: path.resolve(__dirname, 'packages/index.ts'),
      name: getPackageNameCamelCase()
    }
  },
  plugins: [Vue()]
});
