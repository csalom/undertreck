$(document).ready(function () {
	var mapa = L.map('mapa');
	// Llamando capas OSM

	var OSM = L.tileLayer('../mapes/' + '{z}/{x}/{y}.png', {
		attribution: 'Mapa data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
		maxZoom: 15
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
});


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