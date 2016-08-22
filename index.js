#!/usr/bin/env node

var rl = require('readline');
var request = require('request');

var read = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});
read.question('Enter the name of the city you want to know the weather for', function(answer) {
  request.get('http://www.modulus.io', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body); // Show the HTML for the Modulus homepage.
    }
  });
  read.close();
});
