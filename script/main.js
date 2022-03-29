var punto = document.getElementsByClassName('.gm-style img')

/* if (punto) {
	console.log("patata")
} */

var cargarPagina = (id) => {
	document.getElementById("homePage").style.display = "none"
	document.getElementById("estacionesPage").style.display = "none"
	document.getElementById("guiaPage").style.display = "none"
	document.getElementById("aboutPage").style.display = "none"
	document.getElementById("contactPage").style.display = "none"
	document.getElementById(id).style.display = "block"
}
cargarPagina("contactPage")


var app = new Vue({
	el: '#app',
	data: {
		estaciones: {
			paradas: [],
			paradasActivas: [],
			paradasActivasInfo: [],
			coordenadas: []
		}
	}
});

function initMap() {
	const myLatLng = { lat: -34.921719670338945, lng: -57.95368585242721 };
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 14,
		center: myLatLng,
		disableDefaultUI: true,
		streetViewControl: true,
	});


	const Estaciones = [
		[
			"Primer Estación",
			-34.922302402883496,
			-57.95493732361004,
			"Información basica de la parada 1"
		],
		[
			"Segunda Estación",
			-34.925389445729145,
			-57.94945585469184,
			"Información basica de la parada 2"
		],
		[
			"Tercera Estación",
			-34.93175604944046,
			-57.96808955054438,
			"Información basica de la parada 3"
		],
		[
			"Cuarta Estación",
			-34.932282008849725,
			-57.94182764344423,
			"Información basica de la parada 4"
		]
	]

	for (let i = 0; i < Estaciones.length; i++) {
		const Estacion = Estaciones[i];

		app.estaciones.coordenadas = { lat: Estacion[1], lng: Estacion[2] };

		var puntos = new google.maps.Marker({
			title: Estacion[0],
			position: { lat: Estacion[1], lng: Estacion[2] },
			info: Estacion[3],
			map,
		})

		const puntosTitle = puntos.title;
		const puntosInfo = puntos.info;

		puntos.addListener("click", show);

		function show() {
			puntos.addListener("click", () => {
				map.setZoom(15);
				map.setCenter(puntos.getPosition());
			});

			document.getElementById('sidebar').classList.toggle('active');
			var blur = document.getElementById("blur");

			blur.style.display = 'block';
			blur.classList.add('blureado');
			blur.style.zIndex = 1200;

			var paradaActiva = [];
			var paradaActivaInfo = [];

			for (let u = 0; u < Estaciones.length; u++) {
				if (Estaciones[u][0] === puntosTitle) {
					paradaActiva.push(puntosTitle)
					paradaActivaInfo.push(puntosInfo)
				}
			}
			/* console.log(paradaActiva) */
			app.estaciones.paradasActivas = paradaActiva;
			app.estaciones.paradasActivasInfo = paradaActivaInfo;
		};
	}
	app.estaciones.paradas = Estaciones;
}

function shownt() {
	var toggle = document.getElementById('sidebar')
	var blur = document.getElementById("blur");

	toggle.classList.toggle('active');
	blur.style.display = "none";
}
















/* function initMap() {
	const myLatlng = { lat: -25.363, lng: 131.044 };
	const map = new google.maps.Map(document.getElementById("map"), {
	  zoom: 4,
	  center: myLatlng,
	});
	const marker = new google.maps.Marker({
	  position: myLatlng,
	  map,
	  title: "Click to zoom",
	});
  
	
  } */