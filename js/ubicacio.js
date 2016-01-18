var mapa = L.map('ubicacio').setView([39.621559, 2.981926], 8); //// Nivel del zoom inicial
		// Llamando capas OSM
var OSM = L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
	attribution: 'Mapa data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
	maxZoom: 18
	}).addTo(mapa);

//Funció que mostra a un avis allà on s'ha clicat sobre el mapa amb un pop-up, detectant l'event

var popup = L.popup();

function onMapClick(e) {
	popup.setLatLng(e.latlng).setContent("Has clicat a la posició: " + e.latlng.toString()).openOn(mapa);
};

mapa.on('click', onMapClick);

function getLocation() {
	if(intval !== ""){
		window.clearInterval(intval);
		intval="";
	}

	if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else { 
		alert("La geolocation no esta activada.");
	}	
};

var marker_icon = L.icon({
    iconUrl: '../img/marcador.png',
    iconSize:     [25, 45], // size of the icon
    iconAnchor:   [12, 44], // point of the icon which will correspond to marker's location
});
	
function showPosition(position) {
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	mapa.setView([lat, lon], 15);
	var marker = L.marker([lat, lon], {icon: marker_icon}).addTo(mapa);
};

function showError(error) {
	switch(error.code) {
	        case error.PERMISSION_DENIED:
		    alert("L'usuari a denegat la petició de la ubicació.");
	            break;
	        case error.POSITION_UNAVAILABLE:
		    alert("La informació de la ubicació no esta disponible.");
	            break;
	        case error.TIMEOUT:
		    alert("La petició de la posició de l'usuari s'ha excedit de temps.");
	            break;
	        case error.UNKNOWN_ERROR:
        	    alert("Error desconegut.");
		    break;
	}
};
