function setIcon(iconname) {
    var elem = document.getElementById('sky');
    elem.className = "wi " + iconname
}
function updateWeather() {
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=Stockholm&APPID=cd00bfa3539685a36a8e237fbdb9426f', function(data) {
        var code = data.weather[0].id;
        console.log(code);
        if (code >=200 && code <= 299) {
            // Thunderstorm
            console.log("Thunderstorm");
            setIcon('wi-thunderstorm');
        } else if (code >=300 && code <= 399) {
            // Drizzle
            console.log("Drizzle");
            setIcon('wi-showers');
        } else if (code >=500 && code <= 599) {
            // Rain
            console.log("Rain");
            setIcon('wi-rain');
        } else if (code >=600 && code <= 699) {
            // Snow
            console.log("Snow");
            setIcon('wi-snow-wind');
        } else if (code >=700 && code <= 799) {
            // Atmosphere
            console.log("Atmosphere");
            setIcon('wi-dust');
        } else if (code == 800) {
            // Clear
            console.log("Clear");
            setIcon('wi-day-sunny');
        } else if (code >=801 && code <= 899) {
            // Clouds
            console.log("Clouds");
            setIcon('wi-day-cloudy');
        } else if (code >=900 && code <= 949) {
            // Extreme
            console.log("Extreme");
            setIcon('wi-sandstorm');
        } else if (code >=951 && code <= 962) {
            // Additional
            console.log("Additional");
            setIcon('wi-strong-wind');
        } else {
            // Unknown
            console.log("Unknown");
            setIcon('wi-alien');
        }
        console.log(Math.round(data.main.temp-273.15));
        document.getElementById('temp').innerHTML = Math.round(data.main.temp-273.15) + "&degC";
    });
    setInterval(updateWeather, 60000);
}
updateWeather();

/*[200, 'thunderstorm with light rain', 'wi-thunderstorm]
201	thunderstorm with rain	 11d
202	thunderstorm with heavy rain	 11d
210	light thunderstorm	 11d
211	thunderstorm	 11d
212	heavy thunderstorm	 11d
221	ragged thunderstorm	 11d
230	thunderstorm with light drizzle	 11d
231	thunderstorm with drizzle	 11d
232	thunderstorm with heavy drizzle	 11d
300	light intensity drizzle	 09d
301	drizzle	 09d
302	heavy intensity drizzle	 09d
310	light intensity drizzle rain	 09d
311	drizzle rain	 09d
312	heavy intensity drizzle rain	 09d
313	shower rain and drizzle	 09d
314	heavy shower rain and drizzle	 09d
321	shower drizzle	 09d
500	light rain	 10d
501	moderate rain	 10d
502	heavy intensity rain	 10d
503	very heavy rain	 10d
504	extreme rain	 10d
511	freezing rain	 13d
520	light intensity shower rain	 09d
521	shower rain	 09d
522	heavy intensity shower rain	 09d
531	ragged shower rain	 09d
600	light snow	 13d
601	snow	 13d
602	heavy snow	 13d
611	sleet	 13d
612	shower sleet	 13d
615	light rain and snow	 13d
616	rain and snow	 13d
620	light shower snow	 13d
621	shower snow	 13d
622	heavy shower snow	 13d
701	mist	 50d
711	smoke	 50d
721	haze	 50d
731	sand, dust whirls	 50d
741	fog	 50d
751	sand	 50d
761	dust	 50d
762	volcanic ash	 50d
771	squalls	 50d
781	tornado	
800	clear sky	 01d  01n
801	few clouds	 02d  02n
802	scattered clouds	 03d  03n
803	broken clouds	 04d  03d
804	overcast clouds	 04d  04d
900	tornado
901	tropical storm
902	hurricane
903	cold
904	hot
905	windy
906	hail
951	calm
952	light breeze
953	gentle breeze
954	moderate breeze
955	fresh breeze
956	strong breeze
957	high wind, near gale
958	gale
959	severe gale
960	storm
961	violent storm
962	hurricane*/
