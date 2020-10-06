import $ from 'jquery';
export const getUserAddress = (loc) => {
    console.log(loc);
    console.log(loc.latitude);
    const lat = loc.latitude;
    console.log(loc.longitude);
    const long = loc.longitude;

    $.get('https://maps-proxy-dpewu.run-ap-south1.goorm.io/lat/13.0425937/long/80.2298991', (data) => {
            console.log(data);
        })
        // return fetch(`https://maps-proxy-dpewu.run-ap-south1.goorm.io/lat/${lat}/long/${long}`, {
        //         method: "GET",
        //         mode: "cors"
        //     })
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
}