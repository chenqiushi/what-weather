#! /usr/bin/env node

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
var exec = require('child_process').exec;

program
    .version('0.0.1')
    .description('What\'s the weather like? Input: weather <city> // eg: weather Shanghai'
        + '\n  Get weather of current city? Input: weather')
    .usage('<city>')
    .parse(process.argv);

getWeatherInfo(program.args);

/**
 * Request wttr.in to get weather infomation
 *
 * @param  {string} city name of city
 */
function getWeatherInfo(city) {
    var cityName = city || '';
    var shellCommand = 'curl -4 wttr.in/' + cityName;

    exec(shellCommand, function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            return;
        }

        // Cut unnecessary infomations then print
        var weatherInfo = stdout.replace(/Check\snew\sFeature[\s\S]*/, '');
        console.log(weatherInfo);
    });
}
