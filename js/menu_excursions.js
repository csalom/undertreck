$(document).ready(function () {

$("li").click(function(){
		localStorage.idExcursio = $(this).attr("id");
		localStorage.nomExcursio = $(this).find("div").text();
		location.href = 'info.html';
	});
});