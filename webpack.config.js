// module.exports = require('./config/webpack.dev.js');
/**
 * @author: @AngularClass
 */

// Look in ./config folder for webpack.dev.js
var args = require('yargs').argv 
var env = args.env || 'dev';   
switch (env) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.config.prod.js');
    break;
  case 'test':
  case 'testing':
    module.exports = require('./config/webpack.config.test.js');
    break;
  case 'dev':
  case 'development':
  case 'mock': 
  case 'mockp2r':
  case 'mockp2rhot':
  case 'hot':
  case 'mockhot':
  default:
    module.exports = require('./config/webpack.config.dev.js');
}
