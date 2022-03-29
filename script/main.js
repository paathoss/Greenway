var app = new Vue({
	el: '#app',
	data: {
		estaciones: {
			paradas: [],
			paradasActivas: [],
			paradasActivasInfo: []
		}
	}
});

function initMap() {
	const myLatLng = { lat: -34.921719670338945, lng: -57.95368585242721 };
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 14,
		center: myLatLng,
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

		var puntos = new google.maps.Marker({
			title: Estacion[0],
			position: { lat: Estacion[1], lng: Estacion[2] },
			info: Estacion[3] ,
			map,
		})

		const puntosTitle = puntos.title;
		const puntosInfo = puntos.info;

		puntos.addListener("click", show);
		function show() {
			/* map.addListener("click", shownt); */
			
			if (shownt.eventListener==="click") {
				/* map.addListener("click", shownt); */
				console.log("si")
			}else if(/* map.addListener("click", shownt */ shownt.Listener===""){
				/* map.addListener("", shownt) */console.log("no")
			}
			var toggle = document.getElementById('sidebar').classList.toggle('active');
			/* var blur = document.getElementById("map");
	
				if (toggle = 'active') {
					document.getElementById('map').classList.add('blureado');
					document.getElementById('map').style.zIndex = 100;
				  }
				  if (blur.style.display === "block") {
					blur.style.display = "none";
				  } else {
					blur.style.display = "block";
				  } */
			  

			var paradaActiva = [];
			var paradaActivaInfo = [];

			for (let u = 0; u < Estaciones.length; u++) {
				if (Estaciones[u][0] === puntosTitle) {
					paradaActiva.push(puntosTitle)
					paradaActivaInfo.push(puntosInfo)
				}
			}
			console.log(paradaActiva)
			app.estaciones.paradasActivas = paradaActiva;
			app.estaciones.paradasActivasInfo = paradaActivaInfo;
		};
	}
	app.estaciones.paradas = Estaciones;

	
	function shownt() {
		document.getElementById('sidebar').classList.toggle('active');
	}
	// function showNewRect() {
	// 	const contentString =
	// 	  "<b>Rectangle moved.</b><br>" +
	// 	  "New north-east corner: " +
	// 	  ne.lat() +
	// 	  ", " +
	// 	  ne.lng() +
	// 	  "<br>" +
	// 	  "New south-west corner: " +
	// 	  sw.lat() +
	// 	  ", " +
	// 	  sw.lng();

	// 	// Set the info window's content and position.
	// 	infoWindow.setContent(contentString);
	// 	infoWindow.setPosition(ne);
	// 	infoWindow.open(map);
	//   }
	/* class USGSOverlay extends google.maps.OverlayView {
		bounds;
		image;
		div;
		constructor(bounds, image) {
		  super();
		  this.bounds = bounds;
		  this.image = image;
		}} */

	/* onAdd() ;{
		this.div = document.createElement("div");
		this.div.style.borderStyle = "none";
		this.div.style.borderWidth = "0px";
		this.div.style.position = "absolute";
	  
		// Create the img element and attach it to the div.
		const img = document.createElement("img");
	  
		img.src = this.image;
		img.style.width = "100%";
		img.style.height = "100%";
		img.style.position = "absolute";
		img.style.backgroundColor = "red";
		this.div.appendChild(img);
	  
		// Add the element to the "overlayLayer" pane.
		const panes = this.getPanes();
	  
		panes.overlayLayer.appendChild(this.div);
	  }  */



}