module.exports = function (context) {
  return {
    plugins: {
      'postcss-global-import': {},
      'postcss-cssnext': {
        browsers: ['last 2 versions', 'Firefox > 20'],
      },
      'postcss-focus': {},
      'postcss-reporter': {
        clearMessages: true,
      },
    },
  };
};
