#!/usr/bin/env node

// require dependencies that are needed to run the app
require('dotenv').config();
var readline = require('readline');
var request  = require('request');
var Twitter  = require('twitter');

// Twitter parameters for the tweeter API
var tweet = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret:process.env.access_token_secret
});

console.log('Welcome to the WEATHER and TWEET API');

// function that is called at the beginning of the application
function intro() {
  console.log('Press "1" to get the weather of a location');
  console.log('Press "2" to post a tweet on tweeter');
  console.log('Type "exit" to exit the application');
}
intro();

// Initiate the Questions asked to the user
var read = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
read.prompt();

read.on('line',(line) => {
  switch(line.trim()) {
    // displays the weather information of a place given by the user
    case '1':
      read.question('Enter the name of the city you want to know the weather for: ', function(answer) {
        // put in your api key in the part with "xxxxxxxxxxxxxxxxx"
        var link = "http://api.openweathermap.org/data/2.5/weather?q="+answer+"&mode=json&appid="+process.env.openweather_key;
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

    // Displays an option to send a post request to twitter on your timeline
    case '2':
      read.question('Enter some text you want to post on twitter: ', function(answer) {
        if(answer.length < 140) {
          var results = "";
          tweet.post('statuses/update', { status: answer }, function(err, data, response) {
            var object = data;
            console.log('Your tweet has been posted. Here are some information');
            console.log('Your tweet was posted at: ',object.created_at);
            console.log('Your tweet was: ',object.text);
            console.log('Your name is: ',object.user.name);
            console.log('Your are a: ',object.user.description);
            console.log('Your are at: ',object.user.time_zone);
            intro();
          })
        } else {
          console.log('');
          console.log('Your text is longer than 140 characters');
          console.log('');
          intro();
        }
      });
      break;

    case 'exit':
      read.close();
      break;

    default:
      intro();
  }
});
