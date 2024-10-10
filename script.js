const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
//const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
//const inputCadence = document.querySelector('.form__input--cadence');
//const inputElevation = document.querySelector('.form__input--elevation');
const copyrightText = document.querySelector('.copyright');

// Make these two global variables, so we can access them in other functions, outside scope, still in this file btw.
let map, mapEvent;

let arr_of_tennant = [
    { name: 'Bruce', ic: '000123456789', currStatus: 'good', lat: 5.391502764281349, lng: 100.29951095581055 },
    { name: 'Clark', ic: '123445567899', currStatus: 'warning', lat: 5.341450504069681, lng: 100.28766632080078 },
    { name: 'Diana', ic: '123125365758', currStatus: 'error', lat: 5.451115939009762, lng: 100.19514083862306 },
];

// When geolocation successfully get user's current location
function success(position) {
    console.log(position);

    // Destructure latitude and longitude
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    console.log('Current position: ', latitude, longitude);

    // The "map" inside the map() method, is the ID of an element, where we want to display the map.
    // L is a namespace
    // The setView() method expects two arguments.
    // 1st argument: an array of latitude and longitude
    // 2nd argument: how zoomed in or zoomed out the map should be, on the coordinate provided.
    // The higher the value, the more zoomed in
    // setView() basically displays where the map should be at, when it is loaded.
    // In this case, it should be at user's current location
    map = L.map('map').setView([latitude, longitude], 13);

    // The map being displayed, is made up of tiles. And the tiles comes from this url below
    // We can change the url below, to change the appearance of the map
    // Here are some alternative styling: https://leaflet-extras.github.io/leaflet-providers/preview/
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // L.marker([latitude, longitude]).addTo(map).bindPopup("Yoooooo.<br> Where I'm at.").openPopup();

    // Display all markers
    for (const currTenant of arr_of_tennant) {
        let popupStyle;

        if (currTenant.currStatus == 'good') {
            popupStyle = 'running-popup';
        } else if (currTenant.currStatus == 'warning') {
            popupStyle = 'cycling-popup';
        } else {
            popupStyle = 'error-popup';
        }

        L.marker([currTenant.lat, currTenant.lng])
            .addTo(map)
            .bindPopup(
                L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    className: popupStyle, // Add your own custom styling to your popup
                })
            )
            .setPopupContent(currTenant.name)
            .openPopup();
    }

    // on() method is comming from leaflet library, not javascript itself
    // What happens when the user click anywhere on the map
    map.on('click', function (mapE) {
        mapEvent = mapE;

        // Display the form by removing the hidden class
        form.classList.remove('hidden');

        // For better user experience, after opening up the form, make the browser focus on inputDistance field.
        inputDistance.focus();

        // There is no submit button for the form. The user will have to press the enter key to submit the form. So, we will listen for the enter key event listener
    });
}

// When geolocation fails to get user's current location
function fail() {
    alert('Could not get your position.');
}

// Check if navigator exists (older browsers don't support navigator)
if (navigator.geolocation) {
    // Get user's current location
    // 1st callback function is when the browser successfully grabbed the user's current location
    // 2nd callback function is when it fails
    // 3rd argument: To get more accurate current location
    navigator.geolocation.getCurrentPosition(success, fail);
} else {
    console.log('Geolocation is not supported by this browser.');
}

// When the user press the enter key, for a form
form.addEventListener('submit', function (e) {
    // Prevent the form from automatically refresh the page when the form is submitted
    e.preventDefault();

    // Remove the form
    form.classList.add('hidden');

    // Clear input fields
    // inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

    // Display the marker
    // mapEvent is an object, which contain some useful data such as the latitude and longitude of the clicked position
    console.log(mapEvent);

    // Destructure lat and lng properties from latlng object
    const { lat } = mapEvent.latlng;
    const { lng } = mapEvent.latlng;

    console.log(lat, lng);

    // Display a marker exactly where the user clicked it
    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
            L.popup({
                maxWidth: 250,
                minWidth: 100,
                className: 'running-popup', // Add your own custom styling to your popup
            })
        )
        .setPopupContent('1')
        .openPopup();
});
