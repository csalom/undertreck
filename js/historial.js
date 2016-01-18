$(document).ready(function () {
	var separador = "|";
	var mostra = localStorage.historial.split(separador);
	
	if (typeof(mostra) !== "undefined"){
		$("#noHistorial").hide();

		var ul = $("#hExcur");
		for(i = 0; i < mostra.length-1; i++){
			//mostra.length - 1 --> degut a que la dreta del darrer separador també es crea una posició de l'array buida
			var li = $("<li class='nomHistorial text-center list-group-item list-group-item-success'>" + mostra[i] + "</li>");
			ul.append(li);
		}

		$("#historial").show();

		//eliminar el historial
		$("#historial").click(function () {
			localStorage.removeItem("historial");
		});
	}
});

