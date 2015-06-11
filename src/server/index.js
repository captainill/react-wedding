require('babel/register')({
  ignore: /node_modules\/(?!react-router)/,
  stage: 0
});
require('./server');
