var request = require('request');
var GITHUB_USER = "glowychan";
var GITHUB_TOKEN = "a0e2139a1431cd3a2604429330c76083e57260e4";

var repoOwner = "jquery";
var repoName = "jquery";

var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
console.log(requestURL);

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
}

// Invoke function with hard-coded values
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});