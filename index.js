#!/usr/bin/env node

var rl = require('readline');
var request = require('request');

var read = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});

read.question('Enter the name of the city you want to know the weather for', function(answer) {
  getGithubInfo(answer);
  read.close();
});

getGithubInfo(username) {
  var url = "https://api.github.com/users/"+username+"?client_id=040ef52088c5ac0f062c&client_secret=b814fe0eac4d1e082915afb9e52e479e9ad2f848"
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body); // Show the HTML for the Modulus homepage.
    }
});
};