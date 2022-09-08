const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      static : {
        directory : path.join(__dirname, "dist")
      },
      port: 5500,
      devMiddleware:{
         publicPath: "https://localhost:5500",
      },
      hot: "only",
    },
};
