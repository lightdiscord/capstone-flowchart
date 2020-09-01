const CssPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: process.env.NODE_ENV === "production" ? "production": "development",

    entry: {
        frontend: require.resolve("@capstone-flowchart/frontend")
    },

    output: {
        filename: "[name].[hash].js"
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

    plugins: [
        new (require("clean-webpack-plugin").CleanWebpackPlugin),
        new (require("html-webpack-plugin"))({
            template: require.resolve("@capstone-flowchart/frontend/src/index.html"),
            chunks: ["frontend"]
        }),
        new (require("vue-loader/lib/plugin")),
        new CssPlugin()
    ]
};
