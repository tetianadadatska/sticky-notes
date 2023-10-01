window.addEventListener('load', ()=> {
    let long;
    let lat;

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
                    console.log(data);
                });

        });
    }
});