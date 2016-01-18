$(document).ready(function () {
	//agafar informació del gpx descarregat
	var titol = $("#nom_excursio");
	titol.append("<strong> " + localStorage.nomExcursio + " </strong>");

	var taprox = $("#temps_aproximat");
	taprox.append("<strong>" + durada_aprox + " " + localStorage.temps_aproximat + " </strong>");

	var tutilitzat = $("#temps_utilitzat");
	tutilitzat.append("<strong>" + temps_utilitzat + " " + localStorage.temps_excursio + " </strong>");

	//Quan es cliqui per guardar les dades del contacte
	$("#back_inici").click(function () {
		localStorage.removeItem("temps_excursio");
		localStorage.removeItem("temps_aproximat");
	});
});