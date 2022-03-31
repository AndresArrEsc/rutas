var map = L.map('map-template').setView([21.16729076280168, -100.93106351719217], 15);
L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
  maxZoom: 20,
   subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);

const ruta = "";
// Socket Io
const socket = io.connect();

// Marker
const entrada = L.marker([21.167770036431936, -100.93225382580987]); 
entrada.bindPopup('Entrada UTNG');
map.addLayer(entrada);

const rectoria = L.marker([21.167507773175053, -100.93093414342891]); 
rectoria.bindPopup('Edificio de Rectoria');
map.addLayer(rectoria);

const adminis = L.marker([21.16731576105675, -100.9314926734032]); 
adminis.bindPopup('Economico Administrativo');
map.addLayer(adminis);

const vinculacion = L.marker([21.168043391754622, -100.93160263950473]); 
vinculacion.bindPopup('Economico Vinculacion');
map.addLayer(vinculacion);

const biblioteca = L.marker([21.167277798206193, -100.93025838542128]); 
biblioteca.bindPopup('Edificio Biblioteca');
map.addLayer(biblioteca);

const cafe = L.marker([21.168110696492533, -100.930772630272]); 
cafe.bindPopup('Edificio de Cafetería');
map.addLayer(cafe);

const efe = L.marker([21.16756384461089, -100.9296629440152]); 
efe.bindPopup('Edificio TICS');
map.addLayer(efe);

const cgti = L.marker([21.166097582282905, -100.93091894550652]); 
cgti.bindPopup('Edificio CGTI');
map.addLayer(cgti);

const de = L.marker([21.166734127568365, -100.9303894550031]); 
de.bindPopup('Edificio Área Academica Industrial');
map.addLayer(de);

const gimna = L.marker([21.16853666619477, -100.931454815427]); 
gimna.bindPopup('Edificio Gimnasio Auditorio');
map.addLayer(gimna);

const cutroejes = L.marker([21.166386685903618, -100.93146655374603]); 
cutroejes.bindPopup('Laboratorio 4 Ejes');
map.addLayer(cutroejes);

const sieteejes = L.marker([21.166894750718026, -100.93158878289297]); 
sieteejes.bindPopup('Laboratorio 7 Ejes');
map.addLayer(sieteejes);

const sieteejesdos = L.marker([21.167828741101, -100.93022359051066]); 
sieteejesdos.bindPopup('Laboratorio 4 Ejes 2');
map.addLayer(sieteejesdos);

const ce = L.marker([21.16599644867333, -100.93032566096916]); 
ce.bindPopup('Edificio Área Vinculacion y Servicios Tecnologicos');
map.addLayer(ce);

//Routing
/*
L.Routing.control({
  waypoints: [
    L.latLng(21.167727418867184, -100.93224363159511),
    L.latLng(21.166967070293524, -100.92945408708228)
  ]
}).addTo(map);
 */

function ShowSelected(){
  
  var url = document.getElementById("producto").value;
  const ruta = omnivore.kml(url);
  map.addLayer(ruta);

  document.getElementById('quitar-marcadores').addEventListener('click', function() {
    map.removeLayer(ruta);
  });
}




//GPX
//omnivore.gpx('../data/UTNG.gpx').addTo(map);

// Geolocation
map.locate({enableHighAccuracy: true})
map.on('locationfound', (e) => {
  const coords = [e.latlng.lat + 0.5, e.latlng.lng + 0.5];
  const newMarker = L.marker(coords);
  newMarker.bindPopup('Tu hubicacion');
  map.addLayer(newMarker);
  socket.emit('userCoordinates', e.latlng);
});

// socket new User connected
socket.on('newUserCoordinates', (coords) => {
  console.log(coords);
  const newUserMarker = L.marker([coords.lat, coords.lng]);
  newUserMarker.bindPopup('Nuevo usuario');
  map.addLayer(newUserMarker);
}); 

