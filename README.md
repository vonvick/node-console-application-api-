# node-console-application-api

This is a little application that was built to test RESTful APIs from different website.
It makes use of two APIs. I consumed an API from [Openweather](www.openweather.org) and also [Twitter](https://twitter.com). You can actually request a weather report for a particular location and also tweet a post on your twitter timeline.

## Procedure
To use both APIs, you need to register on their various website to obtain your key to be used within your application. After getting the key, you need to create a .env file and store your details in the following format and save:
1. consumer_key='input your consumer_key here'
2. consumer_secret='input your consumer_secret key here'
3. access_token_key='input your access_token_key here'
4. access_token_secret='input your access_token_secret key here'
5. openweather_key='input your openweather_key here'
After saving the file, you can start using the application.

## Instructions
When the application starts it asks for an input between 1 and 2 to get the weather report or tweet a post respectively.
For the weather , it takes a location entered by the user and returns the weather information of the place.
For twitter, it takes a post entered by the user and posts it on twitter...
To exit the application, you can type "exit" and leave the application.
