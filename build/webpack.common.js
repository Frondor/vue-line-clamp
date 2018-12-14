const fs = require("fs");
const path = require("path");
const pkg = require("../package.json");

const libName = pkg.name;

const plugins = [];

if (fs.existsSync(path.resolve(__dirname, "../dev/index.html"))) {
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  plugins.push(
    new HtmlWebpackPlugin({
      title: "Development Workspace",
      template: "./dev/index.html",
      inject: "head"
    })
  );
}

module.exports = {
  entry: {
    [libName]: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    library: libName,
    libraryTarget: "umd",
    libraryExport: "default"
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "../src")],
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [
      ".wasm",
      ".mjs",
      ".js",
      ".json",
      ".sass",
      ".scss",
      ".ts",
      ".tsx"
    ]
  },
  externals: [
    // Everything that starts with "lodash/"
    // /^lodash\/.+$/
  ]
};
