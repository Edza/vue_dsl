module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENVIRONMENT === 'production' ? 'error' : 0,
    'no-debugger': process.env.NODE_ENVIRONMENT === 'production' ? 'error' : 0,
    'space-before-function-paren': ['error'],
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'only-multiline',
      'imports': 'never',
      'exports': 'never',
      'functions': 'ignore'
    }]
  }
}
