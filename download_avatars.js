var request = require('request');
var fs = require('fs');
var GITHUB_USER = "glowychan";
var GITHUB_TOKEN = "a0e2139a1431cd3a2604429330c76083e57260e4";

var owner = process.argv[2];
var repo = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb) {

  if(repoOwner && repoName) {
    var options = {
    url: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: { 'User-Agent': 'GitHub Avatar Downloader - Student Project' }
    };

    request(options, cb);
  } else {
    console.log("Error processing request - please ensure the repo owner and name is entered");
  }

}

var callback =  function (error, response, body) {
                  console.log('error:', error);
                  console.log('statusCode:', response && response.statusCode);
                  var data = JSON.parse(body);
                  data.forEach(function(person) {
                    var path = `./avatars/${person.login}.jpg`;
                    var url = `${person.avatar_url}`;
                    return downloadImageByURL(url, path);
                  });
                };

// console.log(getRepoContributors("jquery", "jquery", callback));


function downloadImageByURL(url, filePath) {
  // ...
  request.get(url)
         .on('error', function (err) {
          throw err;
         })
         .on('response', function(response) {
          console.log('Response Status: ', response.statusMessage);
          console.log('Content Type: ', response.headers['content-type']);
          console.log('Downloading image...');
         })
         .pipe(fs.createWriteStream(filePath))
         .on('close', function() {
            console.log('Download complete.');
          });
}

console.log(getRepoContributors(owner, repo, callback));

