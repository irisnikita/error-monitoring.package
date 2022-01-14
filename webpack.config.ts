import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";

module.exports = {
  devtool: 'eval-source-map',
  entry: "./src/docs/index.tsx",
  output: {
    path: path.join(__dirname, "build"),
    filename: "index.js",
  },
  mode: "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      src: path.resolve(__dirname, "src/"),
      components: path.resolve(__dirname, "src/components/"),
      constants: path.resolve(__dirname, "src/constants/"),
      api: path.resolve(__dirname, "src/api/"),
    },
  },
  devServer: { contentBase: path.join(__dirname, "docs"), port: 9000 },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        API_URL: JSON.stringify("https://errormornitorring.herokuapp.com"),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "docs", "index.html"),
    }),
  ],
};
