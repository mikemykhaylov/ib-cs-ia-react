/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin');
const SitemapPlugin = require('sitemap-webpack-plugin').default;

const robotsTxtOptions = {
  policy: [
    {
      userAgent: 'Googlebot',
      disallow: '/login',
      crawlDelay: 2,
    },
    {
      userAgent: '*',
      allow: '/',
    },
  ],
  sitemap: "https://303bs.pl/sitemap.xml",
  host: "https://303bs.pl",
};

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'production',
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: '[name].[hash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { esModule: true },
          },
          { loader: 'css-loader', options: { esModule: true } },
        ],
      },
      {
        test: /\.(png|jpg|gif|woff2?)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 2017,
          },
          compress: {
            ecma: 5,
            warnings: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            ascii_only: true,
            comments: false,
          },
        },
        parallel: true,
        cache: true,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      hash: true,
      filename: './index.html', // target html
      template: './public/index.html', // source html
    }),
    new MiniCssExtractPlugin(),
    // new BundleAnalyzerPlugin(),
    new CompressionPlugin(),
    new FaviconsWebpackPlugin('./public/logo.svg'),
    new RobotstxtPlugin(robotsTxtOptions),
    new SitemapPlugin('https://303bs.pl', [
      '/',
      '/reserve/step1',
      '/reserve/step2',
      '/reserve/step3',
      '/reserve/step4',
      '/reserve/success',
      '/login',
      '/dashboard',
      '/forgotpassword'
    ]),
  ],
};
