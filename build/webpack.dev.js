const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const pkg = require("../package.json");

const dev = {
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    overlay: true,
    host: "0.0.0.0",
    port: "8080",
    public: "localhost:8080"
  }
};

const config = [common, dev];

if (pkg.devDependencies["css-loader"]) {
  config.push(require("./webpack.sass"));
}

module.exports = merge(...config);
