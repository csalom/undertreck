$(document).ready(function () {
	//llegir gpx segons idExcursio

	gpx_name = asignar_gpx(localStorage.idExcursio);

	$.get('../gpx/' + gpx_name).done(function (gpx, status, jqXHR) {
			
		var dif = $("#dificultad");
		var dificultad = asignar_dificultad(localStorage.idExcursio);
		dif.append("<strong> " + dificultat + ": " + dificultad + " </strong>");

		times = $(gpx).find("time");
		var start = new Date(times.first().text());
		var end = new Date(times.last().text());
		var temps_aproximat = temps_excursio(end-start);
		var dur = $("#durada");
		dur.append("<strong>"+ durada_aprox + " " + temps_aproximat + " </strong>");
		
		var desnivell = calcul_desnivell(gpx);	
		var des = $("#desnivell");
		des.append("<strong> " + desnivell_maxim + " " + desnivell + "m</strong>");
		localStorage.temps_aproximat = temps_aproximat;
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

function asignar_dificultad(idExcursio){
	if (idExcursio === "0"){
		result = dif_molt_alta;	
	}else if(idExcursio === "1"){
		result = dif_molt_alta;	
	}else if (idExcursio === "2"){
		result = dif_baixa;	
	}else if (idExcursio === "3"){
		result = dif_alta;	
	}else if (idExcursio === "4"){
		result = dif_alta;
	}else if (idExcursio === "5"){
		result = dif_molt_baixa;	
	}else if (idExcursio === "6"){
		result = dif_molt_alta;	
	}else if (idExcursio === "7"){
		result = dif_molt_alta;	
	}else{
		result = dif_mitjana;	
	}
	return result;
};

function calcul_desnivell(gpx){
	mAlt = 0;
	mBaix = 2000;
	$(gpx).find("ele").each(function(){
		altura = parseFloat($(this).text());
		if (altura > mAlt){
			mAlt = altura;
		}
		if (altura < mBaix){
			mBaix = altura;
		}
	});
	return Math.round((mAlt - mBaix) * 100) / 100;
};

function temps_excursio(temps){
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