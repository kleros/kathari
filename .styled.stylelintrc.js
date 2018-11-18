module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-styled-components'
  ],
  plugins: ['stylelint-order'],
  rules: {
    // Selector List
    'selector-list-comma-newline-after': 'always-multi-line',

    // Order
    'order/order': [
      'dollar-variables',
      'at-variables',
      'less-mixins',
      'custom-properties',
      'declarations',
      'at-rules',
      'rules'
    ],
    'order/properties-alphabetical-order': true
  }
}
