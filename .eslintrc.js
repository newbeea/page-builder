module.exports = {
  root: true,
  env: {
    node: true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.ts'],
      },
    },
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/typescript/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'airbnb-base',
  ],
  rules: {
    'linebreak-style': [0, 'error', 'windows'],
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/ban-types': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
