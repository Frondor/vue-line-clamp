const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.s[c|a]ss$/,
        include: path.resolve(__dirname, "../src/sass"),
        use: [
          // fallback to style-loader in development for HMR
          // until mini-css-extract-plugin implements it
          process.argv.includes("--hot")
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ],
        sideEffects: true
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
};
