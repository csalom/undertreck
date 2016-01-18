var points;
var nou_temps;
var lat = 0;
var lon = 0;


var mapa = L.map('mapa_e');//.setView([39.71412744373083, 2.621712042018771], 11); //// Nivel del zoom inicial
// Llamando capas OSM

var OSM = L.tileLayer('../mapes/' + '{z}/{x}/{y}.png', {
	attribution: 'Mapa data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
	maxZoom: 17
	}).addTo(mapa);

var marker_icon = L.icon({
    iconUrl: '../img/marcador.png',
    iconSize:     [25, 45], // size of the icon
    iconAnchor:   [12, 44], // point of the icon which will correspond to marker's location
});

gpx_name = asignar_gpx(localStorage.idExcursio);

$.get('../gpx/' + gpx_name).done(function (gpx, status, jqXHR) {
	points = $(gpx).find("trkpt");
	marker = L.marker([points.attr("lat"), points.attr("lon")], {icon: marker_icon}).addTo(mapa);
	mapa.setView([$(gpx).find("trkpt").first().attr("lat"), $(gpx).find("trkpt").first().attr("lon")], 14);
	var runLayer = omnivore.gpx.parse(gpx).on('ready', function() {
		mapa.fitBounds(runLayer.getBounds());
	}).addTo(mapa);
});


// capturar posicions gps i mostrar-les al mapa. Aturar i reiniciar amb un botó 
//Fent-ho més d'un cop. Sistema per simular posició GPS (app FakeGPS)
function getLocation() {
	if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else { 
		alert("La geolocation no esta activada.");
	}
	
};

	
function showPosition(position) {
	lat = position.coords.latitude;
	lon = position.coords.longitude;

	mapa.removeLayer(marker);
	marker = L.marker([lat, lon], {icon: marker_icon}).addTo(mapa);

	calcul_temps_restant(lat, lon);
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


$("#aturar").click(function() {
	if(inttemps !== ""){
		window.clearInterval(inttemps);
		inttemps="";
	}
	if(intloc !== ""){
		window.clearInterval(intloc);
		intloc="";
	}
});


$("#reiniciar").click(function() {
	inttemps = window.setInterval('actualitza_temps()', 1000);
	intloc = window.setInterval('getLocation()', 5000);
});


$("#acabar").click(function() {
	if(inttemps !== ""){
		window.clearInterval(inttemps);
		inttemps = "";
	}
	if(intloc !== ""){
		window.clearInterval(intloc);
		intloc = "";
	}
	guardarExcursio();
	
	var end = new Date();
	localStorage.temps_excursio = temps_transcorregut(end-start);
	location.href = 'final.html';
});


function actualitza_temps(){

	var temps = new Date();
	nou_temps = temps_transcorregut(temps-start);
	var t = $("#t_caminat");
	t.children('h4').remove();
	t.append('<h4 class="vermell text-center temps_taula">' + nou_temps + 'h </h4>');
};

function calcul_temps_restant(lat, lon){
	//calcul del temps restant aproximat
	distancia = 10000;
	var distancia_aux;
	var temps;
	var primer_temps = new Date(points.find("time").first().text());
	var darrer_temps = new Date(points.find("time").last().text());
	var temps_total = temps_transcorregut(darrer_temps - primer_temps);
	var temps_total_min = to_minutes(temps_total);
	var hora_min = to_minutes(nou_temps);

	points.each(function(){
		distancia_aux = calcul_distancia($(this).attr("lat"), $(this).attr("lon"), lat, lon);
		if (distancia_aux < distancia){
			distancia = distancia_aux;
			temps = new Date($(this).find("time").text());
		}
		
	});

	temps = temps_transcorregut(temps - primer_temps);
	var temps_min = to_minutes(temps);
	
	var temps_aux = hora_min * temps_total_min;
	temps_aux = temps_aux / temps_min;
	var temps_restant_aux = temps_aux - hora_min;
	var temps_restant = to_hours(temps_restant_aux);

	var t = $("#t_restant");
	t.children('h4').remove();
	t.append('<h4 class="vermell text-center temps_taula">' + temps_restant + 'h </h4>');
};

function to_hours(temps){
	var hores = parseInt(temps/60);
	var minuts = parseInt(temps%60);
	if (minuts < 10 ){
		minuts = "0" + minuts;
	}
	return hores + ":" + minuts;
};

function to_minutes(temps){
	var arr = new Array();
	arr = temps.split(":")
	var res = parseInt(arr[0]) * 60 + parseInt(arr[1]) + parseInt(arr[2])/60;
	return res;

};

function calcul_distancia(lat, lon, lat_aux, lon_aux){
	return Math.pow(Math.pow((lat_aux - lat), 2) + Math.pow((lon_aux - lon), 2), 0.5);
};

function temps_transcorregut(temps){
	//obtenir temps transcorregut
	hora = temps / (60*60*1000);
	hora = parseInt(hora);

	aux_minuts = temps % (60*60*1000);
	minuts = aux_minuts / (60 * 1000);
	if (parseInt(minuts) < 10 ){
		minuts = "0" + parseInt(minuts);
	}else{
		minuts = parseInt(minuts);
	}

	aux_segons = aux_minuts % (60 * 1000);
	segons = aux_segons / 1000;
	if (parseInt(segons) < 10 ){
		segons = "0" + parseInt(segons);
	}else{
		segons = parseInt(segons);
	}			

	return hora + ":" + minuts + ":" + segons;
};


function guardarExcursio(){
	//guardar l'excursió a dins l'historial
	var separador = "|";
	//posar nom excursió real
	var date = new Date();
	var excur = localStorage.nomExcursio + " " + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
	if (typeof(localStorage.historial) !== "undefined"){
		localStorage.historial = excur + separador + localStorage.historial;
	} else{
		localStorage.historial = excur + separador;
	}
};

function asignar_gpx(idExcursio){
	if (idExcursio === "0"){
		nom = 'travessa-tramuntana.gpx';
	}else if(idExcursio === "1"){
		nom = 'santelm-estellencs.gpx';
	}else if (idExcursio === "2"){
		nom = 'estellencs-esporles.gpx';
	}else if (idExcursio === "3"){
		nom = 'esporles-valldemossa.gpx';
	}else if (idExcursio === "4"){
		nom = 'valldemossa-deia.gpx';
	}else if (idExcursio === "5"){
		nom = 'deia-soller.gpx';
	}else if (idExcursio === "6"){
		nom = 'soller-cuber.gpx';
	}else if (idExcursio === "7"){
		nom = 'cuber-lluc.gpx';
	}else{
		nom = 'lluc-pollenca.gpx';
	}
	return nom;
};