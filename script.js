





// // Map init
//     var map = L.map('map').setView([21.1463, 79.0849], 12);
// // osm layer
// var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// });
// osm.addTo(map)

// // google satellite 
// googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
//     maxZoom: 20,
//     subdomains:['mt0','mt1','mt2','mt3']
// });

// // googleSat.addTo(map)

// //marker

// var singleMarker = L.icon({
//     iconUrl: 'location.png',
//     iconSize: [40, 40],
// });
// var singleMarker = L.marker([21.1463, 79.0849], { icon: myIcon, draggable: true});

// var popup = singleMarker.bindPopup('This is nagpur ' + singleMarker.getLatLng()).openPopup()

// popup.addTo(map);