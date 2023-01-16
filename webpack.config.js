const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 指定入口文件
  entry: "./src/index.ts",
  // 指定打包文件所在目录
  output: {
    // 指定打包文件的目录
    path: path.resolve(__dirname, "dist"),
    // 打包后的文件
    filename: "bundle.js",
    // 配置打包的环境
    environment: {
      // 不使用箭头函数语法
      arrowFunction: false,
      // 不使用const关键字定义常量
      const: false,
    },
  },

  mode: "production",

  // 指定webpack打包时要使用的模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test指定的是规则生效的文件
        test: /\.ts$/,
        // 要使用的loader，执行顺序为从后往前
        use: [
          {
            // 指定加载器
            loader: "babel-loader",
            // 设置babel
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境的插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      chrome: "88",
                      ie: "11",
                    },
                    // 指定corejs的版本
                    corejs: "3",
                    // 使用corejs的方式为按需加载
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        // 要排除的文件
        exclude: /node_modules/,
      },

      // 设置less文件的处理
      {
        test: /\.less$/,
        // 要使用的loader，执行顺序为从后往前
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  ["postcss-preset-env", { browsers: "last 2 versions" }],
                ],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title: "贪吃蛇",
      template: "./src/index.html",
    }),
  ],

  // 设置引用模块
  resolve: {
    // 扩展名为.ts和.js的文件都可以做为模块使用
    extensions: [".ts", ".js"],
  },
};
