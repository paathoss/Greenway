var app = new Vue({
	el: '#app',
	data: {
		paradas: [],
	}
});

app.paradas = "Estaciones";

function initMap() {
	const myLatLng = { lat: -34.921719670338945, lng: -57.95368585242721 };
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 14,
		center: myLatLng,
	});

	const Estaciones = [
		[
			"Primer Estación (Plaza Moreno)",
			-34.922302402883496,
			-57.95493732361004
		],
		[
			"Segunda Estación (Estadio Atenas)",
			-34.925389445729145,
			-57.94945585469184
		],
		[
			"Tercera Estación (Plaza San Martin)",
			-34.93175604944046,
			-57.96808955054438
		],
		[
			"Cuarta Estación (Plaza Saavedra)",
			-34.932282008849725,
			-57.94182764344423
		]
	]


	for (let i = 0; i < Estaciones.length; i++) {
		const Estacion = Estaciones[i];

		var puntos = new google.maps.Marker({
			title: Estacion[0],
			position: { lat: Estacion[1], lng: Estacion[2] },
			map,
		})
		/* puntos.setMap(map); */
		puntos.addListener("click", show);

		function show() {
			var toggle = document.getElementById('sidebar').classList.toggle('active');
		};
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