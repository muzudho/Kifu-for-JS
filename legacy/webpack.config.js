const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const package = require('./package.json');

const DEV_SERVER_PORT = 8080;

module.exports = env => {
    const IS_PROD = env && env.production;
    const IS_ANALYZE = env && env.analyze;
    const BUNDLE_DIR = path.resolve(__dirname, './bundle');
    const common = {
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                "plugins": ["syntax-dynamic-import"],
                            }
                        }
                        ,
                        'ts-loader',
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.png$/,
                    use: [
                        'url-loader',
                        {
                            loader: 'img-loader',
                            options: {}
                        }
                    ]
                },
            ]
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx', '.png']
        },
        plugins: [
            // Deprecated: new CleanWebpackPlugin([BUNDLE_DIR]),
            new CleanWebpackPlugin(),
        ]
    };

    /*
    if (IS_PROD) {
        // common.plugins.push(new webpack.optimize.UglifyJsPlugin());
        common.plugins.push(new webpack.DefinePlugin({
            'process.env.NOVE_ENV': JSON.stringify('production')
        }))
    } else {
     */
    common.devServer = {
        progress: true,
        port: DEV_SERVER_PORT,
    };
    common.devtool = "cheap-module-eval-source-map";
    // }

    if (IS_ANALYZE) {
        common.plugins.push(new BundleAnalyzerPlugin());
    }

    // For browsers
    const bundle = merge(common, {
        entry: path.resolve(__dirname, './src/index.tsx'),
        output: {
            library: "KifuForJS",
            filename: IS_PROD ? `kifu-for-js-${package.version}.min.js` : 'kifu-for-js.js',
            path: BUNDLE_DIR,
            publicPath: "/bundle/"
        },
    });

    // For bookmarklets
    const bookmarklets = merge(common, {
        entry: {
            "bookmarklet": path.resolve(__dirname, './src/bookmarklet.ts'),
            "public-bookmarklet": path.resolve(__dirname, './src/public-bookmarklet.ts'),
        },
        output: {
            filename: `[name].min.js`,
            chunkFilename: `[name].min.js`,
            path: BUNDLE_DIR,
            publicPath: /* IS_PROD ? "https://na2hiro.github.io/Kifu-for-JS/out/" : */ `http://localhost:${DEV_SERVER_PORT}/bundle/`
        },
    });

    return bundle;
    // return [bundle, bookmarklets];
};
