var path = require('path');
var webpack = require('webpack');
//var fs = require('fs');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    debug: true,
    devtool: "source-map",
    entry: {
      index:'./src/js/module/components/index.js',
      vendor : ['jquery','react','react-dom']
    },
    output: {
        //path: path.join(__dirname, "src/"),
        //publicPath: "src/",
        filename: "[name].js"
        //chunkFilename: "[chunkhash].js"
    },
    resolve: {
      extensions: ['', '.js','.json']
    },
    module: {
	          loaders: [
		            {test: /\.js$/, loader: "babel", query: {presets: ['react', 'es2015']}},	/*es6 to es5*/
		            {test: /\.jsx$/, loader: 'babel', query: {presets: ['react', 'es2015']}},	/*jsx to js,es5 to es6*/
		            {test: /\.css$/, loader: "style!css"},					                         	/*css to css*/
		            {test: /\.(jpg|png)$/, loader: "url?limit=8192"},			 	                  /*images 打包*/
		            {test: /\.scss$/, loader: "style!css!sass"}				 	                      /*sass to css*/
	          ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        React: "react",
        ReactDOM: "react-dom"
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        // (the commons chunk name)

        filename: "common.js",
        // (the filename of the commons chunk)

        minChunks: 2,
        // (Modules must be shared between 3 entries)

        // chunks: ["pageA", "pageB"],
        // (Only use these entries)
      }),
      new uglifyJsPlugin({
          compress: {
              warnings: false
          }
      })
    ]
};
