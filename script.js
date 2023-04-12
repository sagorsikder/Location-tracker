//get element by id and declare neccessary variable
const display = document.getElementById("display");
const error = document.getElementById("error");
let isOfice = false;
const user_id = '@test';
const user_pass = '123';
const officeLatitude = 23.8682112; 
const oficeLongitude = 90.3970816;


function login() {
    if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(showPosition, showError);
        //navigator.geolocation.watchPosition(showPosition, showError);

    }
    else {
        display.innerHTML("Geolocation is not available in your browser!");
    }

}


function showPosition(position) {

    //Now get current coordinates
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
      
    //Now compare and get distance
    var distance = employeeDistance(officeLatitude, oficeLongitude, lat, lng);
    
    //Check user accessability
    var threshold = 200;
    if (distance < threshold) {
        
        isOfice = true;
        display.innerHTML = "Employee at offece"


        const userName = document.getElementById("username");
        const password = document.getElementById("password");

  
            if (user_id === userName.value && user_pass === password.value) {
                userName.value = '';
                password.value = '';
                alert('Employee login successfully')
                error.innerHTML = "";
            }
            else {
                error.innerHTML = "Email or password incorrect";
            }
    }
    else {

        isOfice = false;
        display.innerHTML = "Employee not at offece";
    }

}





//This function find out distance between office and user
function employeeDistance(lat1, lon1, lat2, lon2) {
    var earthRadiusMeters = 6371e3;

    var phi1 = lat1 * Math.PI / 180;
    var phi2 = lat2 * Math.PI / 180;
    var deltaPhi = (lat2 - lat1) * Math.PI / 180; 
    var deltaLambda = (lon2 - lon1) * Math.PI / 180; 

    var a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 

    var distanceMeters = earthRadiusMeters * c; 
    return distanceMeters;
}



//This function maintain geolocation error
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            display.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            display.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            display.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            display.innerHTML = "An unknown error occurred.";
            break;
    }
}