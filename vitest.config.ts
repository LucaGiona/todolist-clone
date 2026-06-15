import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'e2e'],
    env: {
      DATABASE_URL: 'postgresql://test:test@localhost/test',
      NEON_AUTH_BASE_URL: 'https://example.neonauth.us-east-2.aws.neon.tech/test/auth',
      NEON_AUTH_COOKIE_SECRET: 'test-secret-at-least-32-characters-long-here',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
