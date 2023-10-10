window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpam = document.querySelector('.temperature span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const apiKey = 'dd00ce2f995b40ab9b6212208230110';

            const api = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${long}`;
            fetch(api)
                .then(response => {
                    // console.log(response.);
                    return response.json();
                })
                .then(data => {
                    const temperature = data.current.temp_f;
                    const summary = data.current.condition.text;
                    //const timeOfDay = data.current.is_day == 0 ? '_DAY' : '_NIGHT';
                    const icon = data.current.condition.text;
                    //Set Dom Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.location.tz_id;
                    //FORUMULA FOR CELSIUS
                    let celsius = (temperature - 32) * (5 / 9);

                    //Set Icon
                    setIcons(icon, document.querySelector('.icon'));

                    //Change temperature to Celsius/Farenheit
                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpam.textContent === 'F'){
                            temperatureSpam.textContent = 'C';
                            temperatureDegree.textContent = Math.floor(celsius);
                        }else{
                            temperatureSpam.textContent = 'F';
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });

    }
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/ /g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});