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
	"dgn": "https://cdn.discordapp.com/attachments/456503841060421634/719105888979255366/DGNrados.png"
}

const localData = [["Dna","sandy","<img class='faction' src=https://cdn.discordapp.com/attachments/456503841060421634/715072252928065616/Sakura_Empire.png />","<span class='d-inline-block pl-3'>123</span>","<img class='init_image' src='https://cdn.discordapp.com/attachments/709111440665214987/719122090027909221/maxresdefault.jpg' alt ='Image_Starto'/>"],["trotugap205","washington","<img class='faction' src=https://cdn.discordapp.com/attachments/456503841060421634/715072252928065616/Sakura_Empire.png />","<span class='d-inline-block pl-3'>225531</span>","<img class='init_image' src='https://cdn.discordapp.com/attachments/715233206772957256/719122516131577876/unknown.png' alt ='Image_Starto'/>"],["SpaceDgn","washington","<img class='faction' src=https://cdn.discordapp.com/attachments/456503841060421634/719105888979255366/DGNrados.png />","<span class='d-inline-block pl-3'>0</span>","<img class='init_image' src='https://cdn.discordapp.com/attachments/714160573285138444/719616368579969024/Cubo_azur_lane.png' alt ='Image_Starto'/>"],["pedro","avrora","<img class='faction' src=https://cdn.discordapp.com/attachments/456503841060421634/719105888979255366/DGNrados.png />","<span class='d-inline-block pl-3'>1</span>","<img class='init_image' src='https://cdn.discordapp.com/attachments/710215702119841882/719122743727095839/moyi_angry.jpg' alt ='Image_Starto'/>"]];

let table = null;
let hallo = null;
$( document ).ready(function() {
	init();
	hallo = document.getElementById("HALLO");
	hallo.volume = 0.2;

	$('#servers input').change(function() {

		if(this.id === 'sandy_c' && $("#sandy_c").prop("checked"))
			hallo.play();
			
		let factions = "ff";
		if($("#amagi_c").prop("checked")) factions += "|amagi";
		if($("#avrora_c").prop("checked")) factions += "|avrora";
		if($("#lexington_c").prop("checked")) factions += "|lexington";
		if($("#sandy_c").prop("checked")) factions += "|sandy";
		if($("#washington_c").prop("checked")) factions += "|washington";

        FilterByFaction(factions);
	});
	
	initDatatbleFromServer();
});

function initDatatbleFromServer() {
	firebase.initializeApp(firebaseConfig);


	firebase.database().ref().once('value').then(function(data) {
		let Output = [];
		let DATA = Object.entries(data.val());
		DATA.forEach(function(e) {
			e = e[1];
			let content = [
				e.username,
				e.server, 
				"<img class='faction' src="+FACTION2IMG[e.faccion]+" />",
				"<span class='d-inline-block pl-3'>" + e.pts_start + "</span>",
				"<img class='init_image' src='" + e.image_start + "' alt ='Image_Starto'/>"
				
			];
			Output.push(content);
		});
		
		table = $('#nambawan').DataTable( {
			"data": Output,
			"search": { regex: true },
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
				"sLengthMenu":     "Mostrar _MENU_ shikikans",
				"sZeroRecords":    "No se encontraron resultados",
				"sEmptyTable":     "Ningún dato disponible en esta tabla",
				"sInfo":           "Mostrando shikikans del _START_ al _END_ de un total de _TOTAL_ shikikans",
				"sInfoEmpty":      "Mostrando shikikans del 0 al 0 de un total de 0 shikikans",
				"sInfoFiltered":   "(filtrado de un total de _MAX_ shikikans)",
				"sInfoPostFix":    "",
				"sSearch":         "Realisar buscación:",
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
}

function initDatatableFromLocal() {

	table = $('#nambawan').DataTable( {
		"data": localData,
		"search": { regex: true },
		"initComplete": function(settings, json) {
			var $image = $('#image');
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
			"sLengthMenu":     "Mostrar _MENU_ shikikans",
			"sZeroRecords":    "No se encontraron resultados",
			"sEmptyTable":     "Ningún dato disponible en esta tabla",
			"sInfo":           "Mostrando shikikans del _START_ al _END_ de un total de _TOTAL_ shikikans",
			"sInfoEmpty":      "Mostrando shikikans del 0 al 0 de un total de 0 shikikans",
			"sInfoFiltered":   "(filtrado de un total de _MAX_ shikikans)",
			"sInfoPostFix":    "",
			"sSearch":         "Realisar buscación:",
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

}

function FilterByFaction(factions){
	console.log(factions);
	table
		.column( 1 )
		.search(factions, true, false)
		.draw();
}

function del(){
	firebase.database().ref('130108062341005312').once('value').then(function(data) {
		console.log(data.val());
	});
	firebase.database().ref('130108062341005312').remove().then(function() {
		console.log("Borrao");
	});
	firebase.database().ref('130108062341005312').once('value').then(function(data) {
		console.log(data.val());
	});
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
        background: #fff;
        box-shadow: 0 0 10px #fff;
        width: ` + size + `px;
        height: ` + size + `px;
        left: ` + x + `%;
        transform: rotation(` + rotation + `deg);
        animation: particle 2s ease-in ` + delay + `s infinite;
        "></div>`;
        $("body").append(div);

    }
}


