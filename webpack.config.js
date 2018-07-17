const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'src')],
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    compilerOptions: {
                        module: 'esnext'
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader?modules&localIdentName=[local]-[hash:base64:5]',
                    'postcss-loader',
                    'less-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|mp4|webm|otf|webp)$/,
                use: ['url-loader?limit=10240']
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.ejs'),
            chunksSortMode: 'dependency'
        }),
        new webpack.DefinePlugin({
            __DEV__: process.env.NODE_ENV !== 'production'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        compress: true,
        port: 8000,
        host: '0.0.0.0'
    }
}
