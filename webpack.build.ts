import path from "path";
import webpack from "webpack";

module.exports = {
  entry: "./src/components/index.ts",
  output: {
    path: path.join(__dirname, "build"),
    filename: "index.js",
    library: "my-library",
    libraryTarget: "umd",
  },
  mode: "production",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      src: path.resolve(__dirname, "src/"),
      components: path.resolve(__dirname, "src/components/"),
      constants: path.resolve(__dirname, "src/constants/"),
      api: path.resolve(__dirname, "src/api/"),
    },
  },
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
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        API_URL: JSON.stringify("https://errormornitorring.herokuapp.com"),
      },
    }),
  ],
};
