import $ from 'jquery';
export const getUserAddress = (loc) => {
        console.log(loc);
        console.log(loc.latitude);
        const lat = loc.latitude;
        console.log(loc.longitude);
        const long = loc.longitude;

        // $.ajax({

        //     url: "http://apis.mapmyindia.com/advancedmaps/v1/fk32zq2ah4l4s5l3v7xcjvd6n2i2gj1u/rev_geocode?lat=" + lat + "&lng=" + long,
        //     type: 'GET',
        //     crossDomain: true,
        //     dataType: 'jsonp',
           
        // });

     
        //
        return $.get(`https://maps-proxy-dpewu.run-ap-south1.goorm.io/lat/${lat}/long/${long}`,(data) => {
            console.log(data);
        });

    } //fk32zq2ah4l4s5l3v7xcjvd6n2i2gj1u
    //https://apis.mapmyindia.com/advancedmaps/v1/3ued3vtxjbr54bno48ls64sj43f1jnel/rev_geocode?lat=10.904851&lng=76.997719

//https://apis.mapmyindia.com/advancedmaps/v1/'+MMAPINDIA_KEY+'/rev_geocode?lat='+latitude+'&lng='+longitude

//http://apis.mapmyindia.com/advancedmaps/v1/fk32zq2ah4l4s5l3v7xcjvd6n2i2gj1u/rev_geocode?lat=13.0425937&lng=80.2298991

//https://maps-proxy-dpewu.run-ap-south1.goorm.io