const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");
const copyrightText = document.querySelector(".copyright");

function success(position) {
  console.log(position);
  copyrightText.innerHTML =
    position.coords.latitude + " " + position.coords.longitude;
}

function fail() {
  alert("Could not get your position.");
}

// Check if navigator exists (older browsers don't support navigator)
if (navigator.geolocation) {
  // Get user's current location
  // 1st callback function is when the browser successfully grabbed the user's current location
  // 2nd callback function is when it fails
  // 3rd argument: To get more accurate current location
  navigator.geolocation.getCurrentPosition(success, fail);
} else {
  console.log("Geolocation is not supported by this browser.");
}
