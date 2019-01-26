const path = require("path");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const pkg = require("../package.json");
const common = require("./webpack.common");

const optionalCSS = [];

if (pkg.devDependencies["css-loader"]) {
  const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
  const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
  const sass = require("./webpack.sass");

  const optimizeCSS = {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    }
  };

  optionalCSS.push(sass, optimizeCSS);
}

const prod = {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve(__dirname, "..")
    })
  ]
};

const WebConfig = merge.smart(common, prod, ...optionalCSS);
const NodeConfig = merge.smart(WebConfig, {
  target: "node"
});

const targets = [];

// https://webpack.js.org/concepts/targets/
if (pkg.browser) {
  targets.push(WebConfig);

  if (/\.node\.js$/.test(pkg.main)) {
    // avoid name conflicts
    NodeConfig.output.filename = NodeConfig.output.filename.replace(
      ".js",
      ".node.js"
    );
    targets.push(NodeConfig);
  }
} else {
  targets.push(NodeConfig);
}

module.exports = targets;
