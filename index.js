#!/usr/bin/env node


var readline = require('readline');
var request = require('request');

getWeather();

// function that outputs the weather of a particular location
function getWeather() {
  var read = readline.createInterface({
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
          'Content-Type': 'application/json; charset=utf-8'
        }
    }, function(error, response, body){
         if(error) {
           console.log(error);
        } else {
          var object = JSON.parse(body);
          console.log('Your status code is: ',response.statusCode);
          console.log('The city name is: ', object.city.name);
          console.log('The weather will have: ', object.list[1].weather[0].description);
        }
  });
    read.close();
  });
}
