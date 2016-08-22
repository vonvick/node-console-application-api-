#!/usr/bin/env node

// require dependencies that are needed to run the app
var readline = require('readline');
var request = require('request');
var Twitter = require('twitter');

// Twitter parameters for the tweeter API
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

console.log('Welcome to the WEATHER and TWEET API');

// function that is called at the beginning of the application
function intro() {
  console.log('Press "1" to get the weather of a location');
  console.log('Press "2" to post a tweet on tweeter');
  console.log('Press "3" to exit the application');
}
intro();

// Initiate the Questions asked to the user
read.prompt();

read.on('line',(line) => {
  switch(line.trim()) {
    case '1':
      read.question('Enter the name of the city you want to know the weather for: ', function(answer) {
        var link = "http://api.openweathermap.org/data/2.5/weather?q="+answer+"&mode=json&appid=d2088317ea35009392201419e1b5d2af";
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
              console.log('The city name is: ', object.name);
              console.log('The weather will have: ', object.weather[0].description);
              console.log('The temperature is: ', object.main.temp -273, 'celcius');
              console.log('The humidity is: ', object.main.humidity, '%');
              console.log('');
              intro();
            }
        });
      });
      break;

    case '2':
      read.question('Enter some text you want to post on tweeter: ', function(answer) {
        var results = "";
        tweet.post('statuses/update', { status: answer }, function(err, data, response) {
          var object = data;
          console.log('Your tweet has been posted. Here are some information');
          console.log('Your tweet was posted at: ',object.created_at);
          console.log('Your tweet was: ',object.text);
          console.log('Your name is: ',object.user.name);
          console.log('Your are a: ',object.user.description);
          console.log('Your are at: ',object.user.time_zone);
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
