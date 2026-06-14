import baseConfig from '@dinos/eslint-config/base';
import nextConfig from '@dinos/eslint-config/next';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  ...nextConfig,
  { ignores: ['.next/**', 'out/**', 'build/**'] },
];
