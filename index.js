const Twit = require('twit');
const axios = require('axios');
const keys = require('./keys.json');


const T = new Twit({
//PUT TWITTER DEV DEETS IN HERE
    consumer_key:         keys.consumer_key,
    consumer_secret:      keys.consumer_secret,
    access_token:         keys.access_token,
    access_token_secret:  keys.access_token_secret,
    timeout_ms:           60 * 1000,
});

const rain = [500,501,502,503,504,511,520,521,522,531];
const drizzle = [300,301,302,310,311,312,313,314,321];

setInterval(() => {
    return axios.get('http://api.openweathermap.org/data/2.5/weather?q=Vancouver&appid=' + keys.weatherKey).then(
        response=> {
    
            const weather = response.data.weather[0];
            const weatherId = weather.id;
            const weatherName = weather.main;
            console.log(weatherId);
            console.log(weatherName);
    
            if (!rain.includes(weatherId) || drizzle.includes(weatherId)) {
                console.log("It's raining in Vancouver! ... again.");
                T.get('statuses/user_timeline', (err,data,response) => {
                    var reg = /\d+/
                    const num = reg.exec(data[0].text);
                    var count = num[0];
    
                    T.post(
                        'statuses/update',
                        {status: "It's raining in Vancouver! ... again.   Rain-Count: [" + (parseInt(count)+1) + "] "},
                        (err,data,response) => {
                           console.log(data);
                        }
                    );
    
                });
    
            }
        })
        .catch(error => {
            console.log(error);
        })
}, 21600000);
