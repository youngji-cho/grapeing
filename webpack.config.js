module.exports = {
    entry: __dirname + '/Fermi-Client/render.js',

    output: {
        path: __dirname + '/Fermi-Client',
        filename: 'bundle.js'
    },
    // bundle.js에서 최종적으로 실행된다.

    devServer: {
        inline: true,
        port: 4000,
        contentBase: __dirname + '/Fermi-Client',
        historyApiFallback: true
    },

    module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015', 'react']
                    }
                },
                {
                  test:/\.css$/,
                  use:['style-loader','css-loader']
                }
            ],

        },
    node: {
              fs: 'empty'
    },
    externals: [
      {
        './cptable': 'var cptable'
      }
    ],
    watch:true
};
