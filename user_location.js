// <script>
// Initialize map
var map = L.map("map").setView([20.5937, 78.9629], 5);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);

// Custom icons
const blueIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// City markers
const locations = [
  { name: "Mumbai", coords: [19.076, 72.8777], icon: redIcon },
//   { name: "Delhi", coords: [28.6139, 77.209], icon: redIcon },
//   { name: "Bangalore", coords: [12.9716, 77.5946], icon: redIcon },
//   { name: "Chennai", coords: [13.0827, 80.2707], icon: redIcon },
//   { name: "Hyderabad", coords: [17.385, 78.4867], icon: redIcon },
//   { name: "NAGPUR", coords: [21.09743, 79.144492], icon: redIcon },
];

// Add markers
locations.forEach((loc) => {
  const marker = L.marker(loc.coords, { icon: loc.icon })
    .addTo(map)
    .bindPopup(
      `<b>${loc.name}</b><br><button onclick="routeTo('${loc.name}')">Get Route</button>`
    );
});

let userMarker, accuracyCircle, userLat, userLon;
let routingControl = null;

// Update user location
function updatePosition(position) {
  userLat = position.coords.latitude;
  userLon = position.coords.longitude;
  var accuracy = position.coords.accuracy;

  if (!userMarker) {
    userMarker = L.marker([userLat, userLon], { icon: blueIcon })
      .addTo(map)
      .bindPopup("You are here")
      .openPopup();
  } else {
    userMarker.setLatLng([userLat, userLon]);
  }

  if (accuracyCircle) {
    map.removeLayer(accuracyCircle);
  }
  accuracyCircle = L.circle([userLat, userLon], { radius: accuracy }).addTo(
    map
  );

  map.setView([userLat, userLon], 10);
}

function handleError(error) {
  console.error("Geolocation error:", error);
  alert("Unable to access your location.");
}

// Watch user location
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(updatePosition, handleError, {
    enableHighAccuracy: true,
  });
} else {
  alert("Geolocation not supported by your browser.");
}

// Route function
window.routeTo = function (cityName) {
  if (!userLat || !userLon) {
    alert("Your current location is not detected yet!");
    return;
  }

  const city = locations.find((l) => l.name === cityName);
  if (!city) return;

  if (routingControl) {
    map.removeControl(routingControl);
  }

  routingControl = L.Routing.control({
    waypoints: [
      L.latLng(userLat, userLon),
      L.latLng(city.coords[0], city.coords[1]),
    ],
    lineOptions: {
      styles: [{ color: "blue", weight: 4 }],
    },
    routeWhileDragging: false,
    createMarker: function () {
      return null;
    }, // hide route markers
  }).addTo(map);
};
