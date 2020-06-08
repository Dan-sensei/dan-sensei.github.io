var firebaseConfig = {
	apiKey: "AIzaSyCQwa2zMFrHq3MV1qFrXbZ7Q5yKoIvLK1I",
	authDomain: "winter-s-crown.firebaseapp.com",
	databaseURL: "https://winter-s-crown.firebaseio.com",
	projectId: "winter-s-crown",
	storageBucket: "winter-s-crown.appspot.com",
	messagingSenderId: "964000776884",
	appId: "1:964000776884:web:69c727e990d6c0d6088de1",
	measurementId: "G-GLFRMKYGLJ"
};

const FACTION2IMG = 
{
	"hms": "https://cdn.discordapp.com/attachments/456503841060421634/715072251195555930/Royal_Navy.png" ,
	"uss": "https://cdn.discordapp.com/attachments/456503841060421634/715072248096096276/Eagle_Union.png" ,
	"ijn": "https://cdn.discordapp.com/attachments/456503841060421634/715072252928065616/Sakura_Empire.png",
	"kms": "https://cdn.discordapp.com/attachments/456503841060421634/715072249803309086/Ironblood.png",
	"dgn": "https://cdn.discordapp.com/attachments/676881737262956546/715075084242649088/Calvo.png"
}

let table = null;

$( document ).ready(function() {
	init();
	
	firebase.initializeApp(firebaseConfig);

	firebase.database().ref().once('value').then(function(data) {
		let Output = [];
		let DATA = Object.entries(data.val());
		DATA.forEach(function(e) {
			e = e[1];
			let content = [
				e.username, 
				e.uid, 
				e.server, 
				"<img class='faction' src="+FACTION2IMG[e.faccion]+" />",
				"<span class='d-inline-block pl-3'>" + e.pts_start + "</span>",
				"<img class='init_image' src='" + e.image_start + "' alt ='Image_Starto'/>"
				
			];
			Output.push(content);
		});
		
		table = $('#nambawan').DataTable( {
			"data": Output,
			"initComplete": function(settings, json) {
				var $image = $('#image');
				// View a list of images
				$('#nambawan td:last-child').viewer({
					inline: false,
					viewed: function() {
						$image.viewer('zoomTo', 1);
					},
					navbar: 0,
					toolbar: 0,
				});
				
			},
			"language":
			{
				"sProcessing":     "Procesando...",
				"sLengthMenu":     "Mostrar _MENU_ registros",
				"sZeroRecords":    "No se encontraron resultados",
				"sEmptyTable":     "Ningún dato disponible en esta tabla",
				"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
				"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
				"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
				"sInfoPostFix":    "",
				"sSearch":         "Buscar:",
				"sUrl":            "",
				"sInfoThousands":  ",",
				"sLoadingRecords": "Cargando...",
				"oPaginate": {
					"sFirst":    "Primero",
					"sLast":     "Último",
					"sNext":     "Siguiente",
					"sPrevious": "Anterior"
				},
				"oAria": {
					"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
					"sSortDescending": ": Activar para ordenar la columna de manera descendente"
				},
				"buttons": {
					"copy": "Copiar",
					"colvis": "Visibilidad"
				}
			}
		});
	});
});


function FilterByFaction(faction){
	table
		.column( 2 )
		.search(faction)
		.draw();
}


function init() {
    for(let i = 0; i < 20; ++i){
        let x = Math.random() * 101;
        let delay = Math.random()*10;
        let size = Math. random()*20 + 20;
        let rotation = Math.random()*91;

        let div = `<div style="

        bottom: -100px;
        opacity: 0.5;
        position: fixed;
        background: #e4c5d4;
        box-shadow: 0 0 10px #e4c5d4;
        width: ` + size + `px;
        height: ` + size + `px;
        left: ` + x + `%;
        transform: rotation(` + rotation + `deg);
        animation: particle 2s ease-in ` + delay + `s infinite;
        "></div>`;
        $("body").append(div);

    }
}


