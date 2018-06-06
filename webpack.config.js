const path = require('path');
var nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
  entry: {
    server: './src/server.ts'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      'main.server': path.join(__dirname, 'dist', 'server', 'main.bundle.js')
    }
  },
  target: 'node',
  externals: [nodeExternals(
    {
     whitelist: [
      /^angular-datatables/,
      /^angular2-toaster/,
      /^ngx-bootstrap/,
     ]
   })
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
    rules: [
      {test: /\.ts$/, loader: 'ts-loader'}
    ]
  },
  plugins: [
   new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "typeof window": JSON.stringify("object")
        }),
    new webpack.DefinePlugin({
        navigator: undefined,
        //document: undefined,
        // location: JSON.stringify({
        //     protocol: 'https',
        //     host: `localhost`,
        // })
    })

  ]

}
