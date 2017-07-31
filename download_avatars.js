// Modules needed for program
var request = require('request');
var fs = require('fs');

// Credentials for making API request
var GITHUB_USER = "glowychan";
var GITHUB_TOKEN = "a0e2139a1431cd3a2604429330c76083e57260e4";

// Arguments for command line
var owner = process.argv[2];
var repo = process.argv[3];

// Function to get user avatar urls
function getRepoContributors(repoOwner, repoName, cb) {

  if (repoOwner && repoName) {
      var options = {
        url: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
        headers: { 'User-Agent': 'GitHub Avatar Downloader - Student Project'
      }
    };

    request(options, cb);

  } else {
    console.log("Error processing request, Please ensure you enter the repo owner and name in the terminal");
  }
}

// Callback function to handle request for the given repo owner and name
function callback(error, response, body) {
  console.log('error:', error);
  console.log('statusCode:', response && response.statusCode);
  var data = JSON.parse(body);
  data.forEach(function(person) {
    var path = `./avatars/${person.login}.jpg`;
    var url = person.avatar_url;
    return downloadImageByURL(url, path);
  });
};

// Function to download images to user's file directory
function downloadImageByURL(url, filePath) {
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

// console.log(getRepoContributors("jquery", "jquery", callback)); should retrieve images from the jquery repo
console.log(getRepoContributors(owner, repo, callback)); // allow user to specify repo on the terminal

