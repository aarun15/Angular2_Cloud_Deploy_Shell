/**
 * @author: @AngularClass
 */

const webpack = require('webpack');
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const StringReplacePlugin = require('string-replace-loader');

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var autoprefixer = require('autoprefixer');

var ExtractTextPlugin = require('extract-text-webpack-plugin');


const ProvidePlugin = require('webpack/lib/ProvidePlugin');
/*
 * Webpack Constants
 */
const METADATA = {
  title: 'BayDirected Packdown',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {

  /*
   * Static metadata for index.html
   *
   * See: (custom attribute)
   */
  metadata: METADATA,

  /*
   * Cache generated modules and chunks to improve performance for multiple incremental builds.
   * This is enabled by default in watch mode.
   * You can pass false to disable it.
   *
   * See: http://webpack.github.io/docs/configuration.html#cache
   */
   //cache: false,

  /*
   * The entry point for the bundle
   * Our Angular.js app
   *
   * See: http://webpack.github.io/docs/configuration.html#entry
   */
  entry: {

    'polyfills': './src/polyfills.ts',
    'vendor':    './src/vendor.ts',
     'main':      './src/main.ts'

  },

  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#resolve
   */
   resolve: {
    // root: [ path.join(__dirname, 'src') ],

    root: helpers.root('src'),
     
    // only discover files that have those extensions
    extensions: ['', '.ts', '.js', '.json', '.css', '.sass', '.html','.svg','.woff','.ttf','.gif'],
   
  },

  module: {
   /*
     * An array of applied pre and post loaders.
     *
     * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
     */
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'string-replace-loader',
        query: {
          search: '(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import\\((.+)\\)',
          replace: '$1.import($3).then(mod => mod.__esModule ? mod.default : mod)',
          flags: 'g'
        },
         exclude: [/\.(spec|e2e)\.ts$/] 
      } ],
    loaders: [
     // .ts files for TypeScript
       { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
         exclude: [/\.(spec|e2e)\.ts$/] },
  
        
    
    
       { test: /\.sass$/, loaders: ['raw-loader', 'postcss', 'sass-loader']},
    
{
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file?name=assets/fonts/[name].[hash].[ext]'
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        loader: 'file?name=assets/img/[name].[hash].[ext]'
      },
      { 
       test: /\.(html)$/, 
      loader: 'raw-loader'
    },

    { test: /\.css$/, exclude: helpers.root('src', 'app'),  loader: 'to-string!css-loader!postcss-loader'},
      //    {
      //   test: /\.css$/,
      //   exclude: helpers.root('src', 'app'),
      //   loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      // },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw'
      },
        // Bootstrap 4
        { test: /bootstrap\/dist\/js\//, loader: 'imports?jQuery=jquery', exclude: [ helpers.root('node_modules')] },
         {test: /\.json$/, loader: 'json', exclude: [ helpers.root('node_modules')]},
    ],
    postLoaders: [{
          test: /\.js$/,
          loader: 'string-replace',
          query: {
            multiple: [
              {
            search: 'var sourceMappingUrl = extractSourceMappingUrl\\(cssText\\);',
            replace: 'var sourceMappingUrl = "";',
            flags: 'g'
              },
              {
                search: 'sourceMappingURL=[.a-zA-Z0-9_-]*\.js.map',
                replace: 'sourceMappingUrl = ""',
                flags: 'g'
              }
            ]
          }
        }]
  },

postcss: [autoprefixer],

  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  
  plugins: [

new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('./src'), // location of your src
        {} // a map of your routes 
      ),
      
new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      
  new ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
             "Tether": 'tether',
            "window.Tether": "tether"
        }),
 
    /*
     * Plugin: ForkCheckerPlugin
     * Description: Do type checking in a separate process, so webpack don't need to wait.
     *
     * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
     */
    new ForkCheckerPlugin(),
    /*
     * Plugin: CommonsChunkPlugin
     * Description: Shares common code between the pages.
     * It identifies common modules and put them into a commons chunk.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
     * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
     */
    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),

    /*
     * Plugin: CopyWebpackPlugin
     * Description: Copy files and directories in webpack.
     *
     * Copies project static assets.
     *
     * See: https://www.npmjs.com/package/copy-webpack-plugin
     */
    new CopyWebpackPlugin([{
      from: 'src/app/assets/fonts',
      to: 'assets/fonts'
    }]),
      new CopyWebpackPlugin([{
      from: 'src/app/assets/css/uxicon-master',
      to: 'assets/uxicon-master'
    }]),
      new CopyWebpackPlugin([{
      from: 'src/app/assets/fonts',
      to: 'assets/fonts'
    }]),
        new CopyWebpackPlugin([{
      from: 'src/app/assets/fonts',
      to: 'fonts'
    }]),
     new CopyWebpackPlugin([{
      from: 'src/plugins',
      to: 'plugins'
    }]),

     new CopyWebpackPlugin([{
      from: 'src/app/assets/img',
      to: 'assets/img'
    }]),

     new CopyWebpackPlugin([{
      from: 'src/app/assets/css',
      to: 'assets/css'
    }]),


    /*
     * Plugin: HtmlWebpackPlugin
     * Description: Simplifies creation of HTML files to serve your webpack bundles.
     * This is especially useful for webpack bundles that include a hash in the filename
     * which changes every compilation.
     *
     * See: https://github.com/ampedandwired/html-webpack-plugin
     */
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    /*
     * Plugin: HtmlHeadConfigPlugin
     * Description: Generate html tags based on javascript maps.
     *
     * If a publicPath is set in the webpack output configuration, it will be automatically added to
     * href attributes, you can disable that by adding a "=href": false property.
     * You can also enable it to other attribute by settings "=attName": true.
     *
     * The configuration supplied is map between a location (key) and an element definition object (value)
     * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
     *
     * Example:
     *  Adding this plugin configuration
     *  new HtmlElementsPlugin({
     *    headTags: { ... }
     *  })
     *
     *  Means we can use it in the template like this:
     *  <%= webpackConfig.htmlElements.headTags %>
     *
     * Dependencies: HtmlWebpackPlugin
     */
    new HtmlElementsPlugin({
      headTags: require('./head-config.common')
    }),

  ],

  /*
   * Include polyfills or mocks for various node stuff
   * Description: Node configuration
   *
   * See: https://webpack.github.io/docs/configuration.html#node
   */
  node: {
    global: 'window',
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

};