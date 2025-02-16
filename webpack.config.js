const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.tsx",
  output: {
    path: path.resolve(__dirname, "./public"),    
    publicPath: "/public/",
    filename: "bundle.js"    
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "/"),
    },
    port: 8081,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader',],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', ".scss"],
  },
}
