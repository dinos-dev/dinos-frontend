import baseConfig from '@dinos/eslint-config/base';
import reactConfig from '@dinos/eslint-config/react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  ...reactConfig,
  { ignores: ['.expo/**', 'metro.config.js'] },
];
