function setIcon(iconname) {
    var elem = document.getElementById('sky');
    elem.className = "wi " + iconname
}

function updateWeather() {
    $.getJSON('http://localhost:2000/api/v1/weather', function(data) {
        var code = data.weather[0].id;
        var weather_set = false;
        for (var i = 0; i < weather.length; i++) {
            if (weather[i][0] == code) {
                setIcon(weather[i][2]);
                weather_set = true;
                break;
            }
        }
        if (!weather_set) {
            setIcon('wi-alien');
        }
        document.getElementById('temp').innerHTML = Math.round(data.main.temp-273.15) + "&degC";
    });
}

updateWeather();
setInterval(updateWeather, 60000);

var weather = [[200, 'thunderstorm with light rain', 'wi-storm-showers'],
[201, 'thunderstorm with rain', 'wi-rain-mix'],
[202, 'thunderstorm with heavy rain', 'wi-rain'],
[210, 'light thunderstorm', 'wi-storm-showers'],
[211, 'thunderstorm', 'wi-thunderstorm'],
[212, 'heavy thunderstorm', 'wi-thunderstorm'],
[221, 'ragged thunderstorm', 'wi-thunderstorm'],
[230, 'thunderstorm with light drizzle', 'wi-storm-showers'],
[231, 'thunderstorm with drizzle', 'wi-storm-showers'],
[232, 'thunderstorm with heavy drizzle', 'wi-thunderstorm'],
[300, 'light intensity drizzle', 'wi-rain-mix'],
[301, 'drizzle', 'wi-rain-mix'],
[302, 'heavy intensity drizzle', 'wi-rain-mix'],
[310, 'light intensity drizzle rain', 'wi-rain-mix'],
[311, 'drizzle rain', 'wi-rain-mix'],
[312, 'heavy intensity drizzle rain', 'wi-rain-mix'],
[313, 'shower rain and drizzle', 'wi-rain-mix'],
[314, 'heavy shower rain and drizzle', 'wi-rain-mix'],
[321, 'shower drizzle', 'wi-rain-mix'],
[500, 'light rain', 'wi-rain-mix'],
[501, 'moderate rain', 'wi-rain'],
[502, 'heavy intensity rain', 'wi-rain'],
[503, 'very heavy rain', 'wi-rain'],
[504, 'extreme rain', 'wi-rain'],
[511, 'freezing rain', 'wi-hail'],
[520, 'light intensity shower rain', 'wi-rain-mix'],
[521, 'shower rain', 'wi-rain'],
[522, 'heavy intensity shower rain', 'wi-rain'],
[531, 'ragged shower rain', 'wi-rain-mix'],
[600, 'light snow', 'wi-snow'],
[601, 'snow', 'wi-snow'],
[602, 'heavy snow', 'wi-snow'],
[611, 'sleet', 'wi-sleet'],
[612, 'shower sleet', 'wi-sleet'],
[615, 'light rain and snow', 'wi-sleet'],
[616, 'rain and snow', 'wi-sleet'],
[620, 'light shower snow', 'wi-snow'],
[621, 'shower snow', 'wi-snow'],
[622, 'heavy shower snow', 'wi-snow'],
[701, 'mist', 'wi-dust'],
[711, 'smoke', 'wi-dust'],
[721, 'haze', 'wi-dust'],
[731, 'sand, dust whirls', 'wi-dust'],
[741, 'fog', 'wi-dust'],
[751, 'sand', 'wi-dust'],
[761, 'dust', 'wi-dust'],
[762, 'volcanic ash', 'wi-volcano'],
[771, 'squalls', 'wi-sandstorm'],
[781, 'tornado', 'wi-tornado'],
[800, 'clear sky', 'wi-day-sunny'],
[801, 'few clouds', 'wi-day-cloudy'],
[802, 'scattered clouds', 'wi-day-cloudy'],
[803, 'broken clouds', 'wi-cloudy'],
[804, 'overcast clouds', 'wi-cloudy'],
[900, 'tornado', 'wi-tornado'],
[901, 'tropical storm', 'wi-sandstorm'],
[902, 'hurricane', 'wi-strong-wind'],
[903, 'cold', 'wi-snowflake-cold'],
[904, 'hot', 'wi-thermometer'],
[905, 'windy', 'wi-strong-wind'],
[906, 'hail', 'wi-hail'],
[951, 'calm', 'wi-day-sunny'],
[952, 'light breeze', 'wi-windy'],
[953, 'gentle breeze', 'wi-windy'],
[954, 'moderate breeze', 'wi-strong-wind'],
[955, 'fresh breeze', 'wi-strong-wind'],
[956, 'strong breeze', 'wi-strong-wind'],
[957, 'high wind, near gale', 'wi-strong-wind'],
[958, 'gale', 'wi-strong-wind'],
[959, 'severe gale', 'wi-strong-wind'],
[960, 'storm', 'wi-strong-wind'],
[961, 'violent storm', 'wi-strong-wind'],
[962, 'hurricane', 'wi-strong-wind']]
