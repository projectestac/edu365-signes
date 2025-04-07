import path from 'node:path';
import pkg from './package.json' with {type: 'json'};
import TerserPlugin from 'terser-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';

const date = new Date();
const idStr = `${pkg.name} v${pkg.version} (${date.toISOString().substring(0, 10)})`;

const banner = `
${idStr}
${pkg.description}
${pkg.homepage}
 
(c) 2001-${date.getFullYear()} ${pkg.author.name || pkg.author}

Licensed under the EUPL, Version 1.2 or -as soon they will be approved by
the European Commission- subsequent versions of the EUPL (the "Licence");
You may not use this work except in compliance with the Licence.

You may obtain a copy of the Licence at:
https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12

Unless required by applicable law or agreed to in writing, software
distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
Licence for the specific language governing permissions and limitations
under the Licence.

For full license information of included components please see: components.LICENSE

WARNING: This is a compressed version of "${pkg.name}". Full source code is freely available at:
${pkg.repository.url}
`;

export default {
  entry: './src',
  output: {
    path: path.resolve(import.meta.dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg)$/,
        type: 'asset',
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        './public/index.html',
        './public/manifest.json',
        { from: './public/ico', to: 'ico' },
        { from: './public/screenshots', to: 'screenshots' },
        { from: './public/fonts', to: 'fonts' },
      ]
    }),
    new webpack.DefinePlugin({
      __PKGID__: JSON.stringify(idStr),
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 9001,
    open: true,
    static: {
      directory: path.join(import.meta.dirname, 'public'),
      watch: true,
    },
    client: {
      overlay: true,
      progress: true,
    },
  },
  performance: {
    maxEntrypointSize: 2000000,
    maxAssetSize: 2000000,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: {
          //condition: /^\!/,
          filename: 'components.LICENSE',
          banner: () => banner,
        },
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ],
  },
};
