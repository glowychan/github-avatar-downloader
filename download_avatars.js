var request = require('request');
var GITHUB_USER = "glowychan";
var GITHUB_TOKEN = "a0e2139a1431cd3a2604429330c76083e57260e4";

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
  url: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
  headers: { 'User-Agent': 'GitHub Avatar Downloader - Student Project' }
  };

  request(options, cb);
}

var callback =  function (error, response, body) {
                  console.log('error:', error);
                  console.log('statusCode:', response && response.statusCode);
                  var data = JSON.parse(body);
                  data.forEach(person => console.log(person.avatar_url));
                };

console.log(getRepoContributors("jquery", "jquery", callback));