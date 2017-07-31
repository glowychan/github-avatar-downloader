var request = require('request');
var GITHUB_USER = "glowychan";
var GITHUB_TOKEN = "a0e2139a1431cd3a2604429330c76083e57260e4";

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
  url: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
  headers: {
            'User-Agent': 'request'
           }
  };

  request(options, cb);
}

var callback =  function (error, response, body) {
                  console.log('error:', error);
                  console.log('statusCode:', response && response.statusCode);
                  console.log('body:', body);
                };

console.log(getRepoContributors("jquery", "jquery", callback));