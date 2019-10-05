const Twit = require('twit');
const axios = require('axios');
const keys = require('./keys.json');

/*
Twitter component commented out awaiting Dev Account approval.
*/
// const T = new Twit({
// //PUT TWITTER DEV DEETS IN HERE
// });

const rain = [500,501,502,503,504,511,520,521,522,531];
const drizzle = [300,301,302,310,311,312,313,314,321];

axios.get('http://api.openweathermap.org/data/2.5/weather?q=Vancouver&appid=' + keys.weatherKey).then(
    response=> {

        const weather = response.data.weather[0];
        const weatherId = weather.id;
        const weatherName = weather.main;
        console.log(weatherId);
        console.log(weatherName);

        if (rain.includes(weatherId) || drizzle.includes(weatherId)) {
            console.log("It's raining in Vancouver! ... again.");
            // T.post(
        //     'statuses/update',
        //     {status: 'It's raining in Vancouver! ... again.},
        //     (err,data,response) => {
        //         console.log(err,data,response);
        //     }
        // );
        }
    })
    .catch(error => {
        console.log(error);
    })