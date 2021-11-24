const path = require('path');

module.exports = {
  entry: './build/output.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};