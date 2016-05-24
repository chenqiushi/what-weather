#!/usr/bin/env node

/**
 * what-weather
 * Quick, fast CLI tools based on NodeJs
 *
 * @file index.js Entrance
 * @author chenqiushi(tracy909@126.com)
 *
 * Update Time: 2016-05-19
 */

var program = require('commander');
var http = require('http');

program
    .version('0.0.3')
    .description('What\'s the weather like? Input: weather <city> // eg: weather Shanghai'
        + '\n  Get weather of current city? Input: weather')
    .usage('<city>')
    .parse(process.argv);

// Deal city name with white space, such as 'Los Angeles'
var cityName = program.args.join('');
getWeatherInfo(cityName);

/**
 * Request wttr.in to get weather infomation
 *
 * @param  {string} city name of city
 */
function getWeatherInfo(city) {
    var path = city ? '/' + city : '';

    var req = http.request({
        host: 'wttr.in',
        path: path,
        headers: {
            'user-agent': 'curl'
        }
    }, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            // Beautify output
            var weatherInfo = chunk.replace(/Check\snew\sFeature[\s\S]*/, '');
            console.log(weatherInfo);
        });
    });

    req.on('error', function (e) {
        console.log(e.message);
    });

    req.end();
}
