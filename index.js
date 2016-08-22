#!/usr/bin/env node

var rl = require('readline');
var request = require('request');

var read = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});
read.question('Enter the name of the city you want to know the weather for ', function(answer) {
  var link = "http://api.openweathermap.org/data/2.5/forecast?q="+answer+"&mode=json&appid=d2088317ea35009392201419e1b5d2af";
  var results = "";
  request({
    url: link, //URL to hit
    qs: {from: 'Open Weather', time: +new Date()}, //Query string data
    method: 'GET', //Specify the method
    headers: { //We can define headers too
        'Content-Type': 'MyContentType',
        'Custom-Header': 'Custom Value'
      }
  }, function(error, response, body){
      if(error) {
          console.log(error);
      } else {
          console.log(response.statusCode, body);
      }
});
  read.close();
});
