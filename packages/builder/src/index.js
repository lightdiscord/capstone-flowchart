module.exports = {
    mode: process.env.NODE_ENV === "production" ? "production": "development",

    entry: {
        frontend: require.resolve("@capstone-flowchart/frontend")
    },

    output: {
        filename: "[name].[hash].js"
    },

    plugins: [
        new (require("clean-webpack-plugin").CleanWebpackPlugin),
        new (require("html-webpack-plugin"))({
            template: require.resolve("@capstone-flowchart/frontend/src/index.html"),
            chunks: ["frontend"]
        })
    ]
};
