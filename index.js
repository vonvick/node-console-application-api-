#!/usr/bin/env node


var readline = require('readline');
var request = require('request');
var Twitter = require('twitter');

// Twitter parameters for the
var tweet = new Twitter({
  consumer_key: 'JyQl49m1TtOxbTZ4Iu4rSCgmo',
  consumer_secret: 'KgH7Uk8Mt9jX4RbmQ12tUjuZeTOHHqEp3tQ9pOL78FzcSkmWXL',
  access_token_key: '237870436-QmPt2K6k0LDmEWKfyXELYLte5Z5dmHIWccFTJ9er',
  access_token_secret: '6wkVIM15qwSHSXlpqszcrDHhvzUmJjlKTVVrHQNTAXT0G'
});

var read = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Press "1" to get the weather of a location');
console.log('Press "2" to post a tweet on tweeter');
console.log('Press "3" to exit the application');

read.prompt();

read.on('line',(line) => {
  switch(line.trim()) {
    case '1':
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
      });
      break;

    case '2':
      read.question('Enter some text you want to post on tweeter', function(answer) {
        tweet.post('statuses/update', { status: answer }, function(err, data, response) {
          console.log(data)
        })
      });
      break;

    case 'exit':
      read.close();
      break;

    default:
      console.log('Enter a text');
  }
});
// }
