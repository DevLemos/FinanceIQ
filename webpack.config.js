const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    login: "./src/js/login.js",
    painel: "./src/js/painel.js",
  },
  // "./src/js/script.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: "development",
  module: {
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      {
        test: /\.(png|jpg|jpeg|svg)$/,
        use: [
          {
            loader: "url-loader", // Ou 'file-loader'
            options: {
              limit: 8192, // Arquivos com tamanho abaixo de 8kb serão embutidos como base64
              name: "images/[name].[hash].[ext]", // Defina a pasta de destino para as imagens no diretório dist
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Template do seu HTML
      filename: "index.html",
      chunks: ["login"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/painel.html", // Template do seu HTML
      filename: "painel.html",
      chunks: ["painel"],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, "dist"), // Serve os arquivos da pasta dist
    open: true, // Abre automaticamente o navegador
    hot: true, // Habilita o Hot Module Replacement (HMR)
    port: 3000, // Porta do Webpack Dev Server
    proxy: [
      {
        context: ["/backend"], // Rota ou conjunto de rotas para interceptar
        target: "http://localhost/xampp/FinanceIQ", // URL para redirecionar
        changeOrigin: true, // Permitir que o cabeçalho "Host" seja alterado
        secure: false, // Permitir conexões inseguras (se necessário)
      },
    ],
  },
};
