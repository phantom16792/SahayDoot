let emergency_btn = document.getElementById("emer_btn");

function gotlocation(location) {
  console.log(
    `latitude: ${location.coords.latitude}\nlongitude: ${location.coords.longitude}`
  );
  // Usage
  getLocationFromCoords(
    location.coords.latitude,
    location.coords.longitude
  ).then((location) => console.log(location));
}

function nolocation() {
  console.log("error");
}

emergency_btn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(gotlocation, nolocation);
});

async function getLocationFromCoords(lat, lon) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}


let info = document.querySelector("infor");
info.textContent = "aloo";