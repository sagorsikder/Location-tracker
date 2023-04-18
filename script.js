

function login() {
    const information = {
        user_Id: "admin",
        user_Pass: "Imfas@2000"
    }

    fetch('http://localhost/IMFASLOCALSvc/AndroidService.svc/UserValidityCheck', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(information)
    })
   .then(function (response) {
       return response.json();
   })
   .then(function (response) {
       console.log(response.m_Item1);
     
       if (response.m_Item1 == 'valid') {

           if (navigator.geolocation) {
               navigator.geolocation.getCurrentPosition(showPosition, showError);
               //navigator.geolocation.watchPosition(showPosition, showError);



           }
           else {
               display.innerHTML("Geolocation is not available in your browser!");
           }
       }
   })
   .catch(function (error) {
       console.error(error);
   });

}







function showPosition(position) {

    //Now get neccessary information
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const userName = document.getElementById("username");
    const password = document.getElementById("password");
    const now = new Date();

    const year = now.getFullYear().toString().padStart(4, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');

    const currentDateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    console.log(currentDateTime);


    getAddress(lat, lng)


    function getAddress(latitude, longitude) {

        const url = "https://nominatim.openstreetmap.org/reverse?lat=" + latitude + "&lon=" + longitude + "&format=json";

        fetch(url)
          .then(function (response) {
              return response.json();
          })
          .then(function (data) {
              console.log(data)
              const address = data.display_name;
              console.log(address);

              const userInformation = {
                  user_Id: "admin",
                  user_Pass: "Imfas@2000",
                  userName: userName.value,
                  password: password.value,
                  time: currentDateTime,
                  latitude: lat,
                  longitude: lng,
                  address: address
              }

              // Set a value in sessionStorage
              const myObjectString = JSON.stringify(userInformation);
              sessionStorage.setItem('myData', myObjectString);

              window.location.href = "secondPage.html";
            
              //window.location.replace("secondPage.html");
          })
          .catch(function (error) {
              console.error(error);
          });
    }
    }
   





function UserInformation(information) {
    fetch('http://localhost/IMFASLOCALSvc/AndroidService.svc/UserInformationStored', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(information)
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response.m_Item1);
        
      
        window.location.href = "thirdPage.html";

        
        //alert(response.m_Item1)
        //window.location.replace("secondPage.html");
       
    })
    .catch(function(error) {
        console.error(error);
    });
}



       
function sessionStorageGet() {
           // Retrieve a value from localStorage
           const myData = sessionStorage.getItem('myData');
           var userInformation = JSON.parse(myData);
           const comment = document.getElementById("comment");
           const selectedPlace = document.getElementById("place");

           userInformation.comment = comment.value;
           userInformation.place = selectedPlace.value;
           console.log(userInformation);
           UserInformation(userInformation)
       }
       






//This function find out distance between office and user
//function employeeDistance(lat1, lon1, lat2, lon2) {
//    var earthRadiusMeters = 6371e3;

//    var phi1 = lat1 * Math.PI / 180;
//    var phi2 = lat2 * Math.PI / 180;
//    var deltaPhi = (lat2 - lat1) * Math.PI / 180; 
//    var deltaLambda = (lon2 - lon1) * Math.PI / 180; 

//    var a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
//            Math.cos(phi1) * Math.cos(phi2) *
//            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2); 
//    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 

//    var distanceMeters = earthRadiusMeters * c; 
//    return distanceMeters;
//}



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