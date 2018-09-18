// extension of storybook's webpack config, per:
// https://storybook.js.org/configurations/custom-webpack-config/#extend-mode

const path = require('path');
const glob = require('glob');

module.exports = (baseConfig, env, config) => {
  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      loader: require.resolve('awesome-typescript-loader'),
    },
    {
      test: /\.css$/,
      use: ['babel-loader', 'raw-loader', 'postcss-loader'],
    },
    {
      test: /\.s(a|c)ss$/,
      use: [
        'babel-loader',
        'raw-loader',
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            includePaths: ['styles/*', 'node_modules']
              .map(d => path.join(__dirname, d))
              .map(g => glob.sync(g))
              .reduce((a, c) => a.concat(c), []),
          },
        },
      ],
    }
  );

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
  // module: {
  //   rules: extensionRules
  // }
};
