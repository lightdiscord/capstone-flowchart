const path = require("path");
const CssPlugin = require("mini-css-extract-plugin");

process.traceDeprecation = true;

module.exports = {
    mode: process.env.NODE_ENV === "production" ? "production": "development",

    entry: {
        frontend: require.resolve("@capstone-flowchart/frontend")
    },

    output: {
        filename: "assets/[id].[name].[fullhash].js",
        path: path.resolve(__dirname, "..", "dist")
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.sass$/,
                use: [
                    "vue-style-loader",
                    CssPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },

    resolve: {
        alias: {
            '@': path.dirname(require.resolve("@capstone-flowchart/frontend/src"))
        }
    },

    devServer: {
        hot: true,
        overlay: {
            warnings: true,
            errors: true
        }
    },

    plugins: [
        new (require("clean-webpack-plugin").CleanWebpackPlugin),
        new (require("html-webpack-plugin"))({
            template: require.resolve("@capstone-flowchart/frontend/src/index.html"),
            chunks: ["frontend"]
        }),
        new (require("vue-loader/lib/plugin")),
        new CssPlugin({
            filename: "assets/[id].[name].[contenthash].css"
        })
    ]
};
