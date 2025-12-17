import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.test.ts',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:3000'
  },
  workers: 1
});
