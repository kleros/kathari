module.exports = {
  extends: 'solium:recommended',
  plugins: ['security'],
  rules: {
    quotes: ['error', 'double'],
    indentation: ['error', 4],
    'error-reason': ['error'],
    'security/no-block-members': ['off'],
    'security/no-send': ['off'],
    'security/no-inline-assembly': ['off']
  }
}
