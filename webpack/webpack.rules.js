const { isDev } = require('./webpack.helpers')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = [
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    },
  },
  // CSS Loader
  {
    test: /\.css$/,
    use: [
      { loader: isDev() ? 'style-loader' : MiniCssExtractPlugin.loader },
      { loader: 'css-loader' },
    ],
  },
  // SCSS Loader
  // {
  //   test: /\.module\.scss$/,
  //   use: [
  //     { loader: isDev() ? 'style-loader' : MiniCssExtractPlugin.loader },
  //     {
  //       loader: 'css-loader',
  //       options: {
  //         modules: true,
  //         sourceMap: isDev(),
  //       },
  //     },
  //     {
  //       loader: 'sass-loader',
  //       options: {
  //         sourceMap: isDev(),
  //       },
  //     },
  //   ],
  // },
  {
    test: /\.s[ac]ss$/i,
    // exclude: /\.module\.scss$/,
    use: [
      { loader: isDev() ? 'style-loader' : MiniCssExtractPlugin.loader },
      { loader: 'css-loader' },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: isDev(),
        },
      },
    ],
  },
  {
    // Assets loader
    // More information here https://webpack.js.org/guides/asset-modules/
    test: /\.(gif|jpe?g|tiff|png|webp|bmp|svg|eot|ttf|woff|woff2)$/i,
    type: 'asset',
    generator: {
      filename: 'assets/[hash][ext][query]',
    },
  },
]
