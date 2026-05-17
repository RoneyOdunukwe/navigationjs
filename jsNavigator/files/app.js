'use strict'

const browser = document.querySelector('.bname')

const langPreferred = document.querySelector('.language');

const logicalProcessors = document.querySelector('.cpu');

const locationBtn = document.querySelector('.getLocation');

const cookies = document.querySelector('.cookiesen');

const platform = document.querySelector('.platform');

const operatingSystem = document.querySelector('.OS');

const locationp = document.querySelector('.location')

// Browser Name 

let b = 'Browser:'

let userAgent = navigator.userAgent;

if (userAgent.match(/chrome|chromium|crios/i)) browser.textContent = `${b} Chrome`;
    else if (userAgent.match(/firefox|fxios/i)) browser.textContent = `${b}Firefox`;
    else if (userAgent.match(/safari/i)) browser.textContent = `${b} Safari`;
    else if (userAgent.match(/opr\//i)) browser.textContent = `${b}Opera`;
    else if (userAgent.match(/edg/i)) browser.textContent = `${b} Edge`;
    else browser.textContent = "Unknown";

// preferredLanguage

langPreferred.textContent = `Preferred language: ${(navigator.languages[1]).toUpperCase()}`;

// Number of threads

logicalProcessors.textContent = `Logical Processors: ${navigator.hardwareConcurrency}`

if (navigator.cookieEnabled == true) {
    cookies.textContent = `Cookies are enabled`
}
if (navigator.cookieEnabled == false) {
    cookies.textContent = `Cookies are not enabled`
}

// platform

platform.textContent = `Platform: ${navigator.platform}, `;

// Operating system 

operatingSystem.textContent = `Operating System: ${navigator.userAgentData.platform}`;

// location button with eventListener 

    locationBtn.addEventListener('click', async () => {navigator.geolocation.getCurrentPosition( async(position) => {
        // console.log('latitude:', position.coords.latitude);
        // console.log('longitude:', position.coords.longitude);  
        locationp.textContent = `Location: Fetching Precise Location`;
        // geolocation();
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        const data = await res.json();
        console.log(data);
        
        locationp.textContent = `Location: ${data.display_name}`
        let wasteBin = [];
        
        wasteBin.push({
            brnm: navigator.userAgentData.brands[0].brand,
            Lng: navigator.languages[1],
            numberofThreads: navigator.hardwareConcurrency,
            areCEn: navigator.cookieEnabled,
            OS: navigator.userAgentData.platform,
            Lcn: `${data.display_name}`
        })
        localStorage.setItem('notUserInfo', JSON.stringify(wasteBin))
        console.log(localStorage.getItem('notUserInfo'));

        sendData()
    })
    
})






async function sendData(){
const data=JSON.parse(localStorage.getItem('notUserInfo'))
console.log(data)
if(data){
    await fetch(`http://127.0.0.1:1234/data`,{
        method:'POST',
        headers:{
'content-type':'application/json',
},
body:JSON.stringify(data)
    })
}
}

// function geolocation() {
    
//     async (position) => {
    
//         console.log(lat, lon);

//     console.log(data);
//     console.log(
//         `${data.address.city}, ${data.address.country}`);
//     }
//     (err) => {
//         locationp.textContent = `Location: Couldn't obtain location`
//     }
// }

//     })
//     })

// location tag 



    
    // locationp.textContent = fullAdress