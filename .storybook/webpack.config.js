const path = require('path')
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin')
module.exports = (baseConfig, env, config) => {
    config.module.rules = config.module.rules.concat([
        {
            test: /\.(ts|tsx)$/,
            loader: require.resolve('ts-loader'),
            options: {
                transpileOnly: true,
                compilerOptions: {
                    allowSyntheticDefaultImports: false,
                    module: 'esnext'
                }
            }
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
    ])
    config.plugins.push(new TSDocgenPlugin())
    config.resolve.extensions.push('.ts', '.tsx')
    return config
}
