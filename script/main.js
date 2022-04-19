var cargarPagina = (id) => {
    document.getElementById("menuPage").style.display = "none"
    document.getElementById("homePage").style.display = "none"
    document.getElementById("estacionesPage").style.display = "none"
    document.getElementById("guiaPage").style.display = "none"
    document.getElementById("aboutPage").style.display = "none"
    document.getElementById("contactPage").style.display = "none"
    document.getElementById("premiosPage").style.display = "none"

    document.getElementById(id).style.display = "contents"
}
cargarPagina("homePage")


//////////Loader
var preloader = document.getElementById("page-splash")
setTimeout(function () {
    preloader.style.display = "none"
}, 1000);
////////////////


var app = new Vue({
    el: '#app',
    data: {
        estaciones: {
            PRUEBA: [],
            paradas: [],
            paradasActivas: [],
            paradasCoordsString: [],
            paradasTitle: []
        },
        localizacion: {
            viajeDistancia: [],
            viajeDuracion: [],
            destinoFinal: [],
            destinoFinalInfo: []
        },
        map: {
            mapita: [],
            puntos: []
        },
        ubicacionActual: [],
        ubicacionActualCoords: []
    }
});


function geoFindMe() {
    var errorWindow = document.getElementById('geolocationError');

    if (errorWindow.style.display = 'flex') {
        errorWindow.style.display = 'none'
    }

    // pide ubicacion actual
    function success(position) {
        if (errorWindow.style.display = 'flex') {
            errorWindow.style.display = 'none'
        }

        showPosition(position)
    }
    // si el usuario no da la ubicacion actual o hay algun error te pide reintentar o ir a ver las recompensas
    function error() {
        errorWindow.style.display = 'flex'
    }

    navigator.geolocation.getCurrentPosition(success, error);
}

function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();

    var myLatLng = { lat: -34.921719670338945, lng: -57.95368585242721 };
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: myLatLng,
        disableDefaultUI: true,
        streetViewControl: true,
    });
    directionsRenderer.setMap(map);

    app.map.mapita = map;

    const Estaciones = [
        [
            "Plaza Moreno",
            -34.922302402883496,
            -57.95493732361004,
            "-34.922302402883496,-57.95493732361004",
            "Avenida 53 calle 14, La Plata"
        ],
        [
            "Estado Atenea",
            -34.925389445729145,
            -57.94945585469184,
            "-34.925389445729145,-57.94945585469184",
            "Avenida 13 calle 58, La Plata"
        ],
        [
            "Parque San Martín",
            -34.93175604944046,
            -57.96808955054438,
            "-34.93175604944046,-57.96808955054438",
            "Avenida 25 calle 50, La Plata"
        ],
        [
            "Parque Saavedra",
            -34.932282008849725,
            -57.94182764344423,
            "-34.932282008849725,-57.94182764344423",
            "Avenida 66 calle 14, La Plata"
        ],
        [
            "Estadio Único Diego Armando Maradona",
            -34.91641772378313,
            -57.98857278451355,
            "-34.91641772378313, -57.98857278451355",
            "Avenida 25 calle 531, La Plata"
        ],
        [
            "Plaza Dardo Rocha",
            -34.921026322517925,
            -57.94165555669854,
            "-34.921026322517925,-57.94165555669854",
            "Diagonal 73 calle 59, La Plata"

        ],
        [
            "Parque Alberti",
            -34.922870985445115,
            -57.97918891483258,
            "-34.922870985445115,-57.97918891483258",
            "Avenida 25 calle 39, La Plata"
        ],
        [
            "Paseo del Bosque",
            -34.91110634016815,
            -57.940740752464094,
            "-34.91110634016815,-57.940740752464094",
            "Avenida 1 calle 54, La Plata"
        ],
        [
            "Parque Castelli",
            -34.941878408342916,
            -57.953977553541776,
            "-34.941878408342916,-57.953977553541776",
            "Avenida 25 calle 65, La Plata"
        ],
        [
            "Florencio Varela",
            -34.81082801652776,
            -58.274777515795776,
            "-34.81082801652776,-58.274777515795776",
            "Avenida Tte. Gral. Juan Domingo Perón 165"
        ],
        [
            "La Costera",
            -34.61206473154328,
            -58.358234267640896,
            "-34.61206473154328,-58.358234267640896",
            "Avenida Dr. Tristán Achával Rodríguez 1353, CABA"
        ],
        [
            "Plaza Constitución",
            -34.62725243775753,
            -58.38074033013085,
            "-34.62725243775753,-58.38074033013085",
            "Avenida Juan de Garay 1125, CABA"

        ],
        [
            "Parque Lezama",
            -34.626383220031585,
            -58.37082245137918,
            "-34.626383220031585,-58.37082245137918",
            "Avenida Caseros y Defensa, CABA"
        ]
    ]

    for (let i = 0; i < Estaciones.length; i++) {
        const Estacion = Estaciones[i];

        var puntos = new google.maps.Marker({
            title: Estacion[0],
            position: { lat: Estacion[1], lng: Estacion[2] },
            info: Estacion[3],
            map,
        })

        var puntos2 = new google.maps.Marker({
            title: 'title',
            position: { lat: 123, lng: 321 },
            info: 'info',
            map,
        })

        app.estaciones.paradasCoordsString.push(Estaciones[i][3])

        app.map.puntos = puntos2;

        const puntosTitle = puntos.title;
        const puntosPosition = [];

        for (let d = 0; d < Estaciones.length; d++) {
            if (Estaciones[d][0] === puntosTitle) {
                app.estaciones.paradasTitle.push(Estacion[4]);
            }
        }

        puntos.addListener("click", () => {
            puntosPosition.push({ lat: Estacion[1], lng: Estacion[2] })

            var paradasActivas = [];
            var paradasActivasInfo = [];

            // da las variables de cada estacion y llama al directionsService en esa estacion especifica

            for (let u = 0; u < Estaciones.length; u++) {
                if (Estaciones[u][0] === puntosTitle) {
                    paradasActivas.push(Estaciones[u][3])
                    paradasActivasInfo.push(Estaciones[u])

                    app.estaciones.paradasActivas = paradasActivasInfo
                    var probando = paradasActivas

                    document.getElementById("ubicacion").style.display = 'none'

                    calculateAndDisplayRoute(directionsService, directionsRenderer, probando)
                }
            }
        });
    }
    app.estaciones.paradas = Estaciones;
}

function mostrarUbicacionActual() {
    app.map.mapita.panTo(app.ubicacionActualCoords)
}

function showPosition(position) {
    // convierte la ubicacion actual a un string usable por el directionsService

    app.ubicacionActualCoords = { lat: position.coords.latitude, lng: position.coords.longitude };

    var ubicacion = { lat: position.coords.latitude, lng: position.coords.longitude };
    var ubicacionActualCoordenadas = ubicacion = `${ubicacion.lat},${ubicacion.lng}`;

    const ubicacionActual = ubicacionActualCoordenadas.split(",", 2);
    const ubicacionCoords = {
        lat: parseFloat(ubicacionActual[0]),
        lng: parseFloat(ubicacionActual[1]),
    };

    var ubicacionCoordenadasFinal = `${ubicacionCoords.lat},${ubicacionCoords.lng}`;

    app.ubicacionActual = ubicacionCoordenadasFinal;
    distance()
}

function distance() {
    // calcula la distancia entre la ubicacion actual y cada parada

    var origin = app.ubicacionActual;
    var allDestination = app.estaciones.paradasCoordsString;

    var service = new google.maps.DistanceMatrixService();

    for (let s = 0; s < allDestination.length; s++) {
        service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [allDestination[s]],
                travelMode: 'WALKING',
            }, callback);
        function callback(response, status) {

            var allParadas = app.estaciones.paradas;
            var allDistance = [];

            if (status == 'OK') {
                allDistance.push(response.rows[0].elements[0].distance.value)

                allParadas[s].push(allDistance[0])
            }
        }
    }
    // espera a que todas las paradas consigan su distancia
    setTimeout(function () {
        ordenar()
    }, 700);
}

function ordenar() {
    // ordena por distancia las paradas de menor a mayor

    function compare(a, b) {
        if (a[5] < b[5]) {
            return -1;
        }
        return 0;
    }

    app.estaciones.paradas.sort(compare);

    app.localizacion.viajeDistancia.push(app.estaciones.paradas[0][5])
    app.localizacion.destinoFinal.push(app.estaciones.paradas[0])

    var probando = [];

    // envia la informacion para mostrar las direcciones de la parada mas cercana

    probando.push(app.localizacion.destinoFinal[0][3])
    calculateAndDisplayRoute(directionsService, directionsRenderer, probando)
}


function calculateAndDisplayRoute(directionsService, directionsRenderer, probando) {
    var direccionDePrueba = "-34.94486276284149,-57.96170227030192"

    directionsService
        .route({
            origin: {
                query: app.ubicacionActual,
            },
            destination: {
                query: probando[0],
            },
            travelMode: google.maps.TravelMode.WALKING,
        })
        .then((response) => {
            // se muestra las direcciones

            directionsRenderer.setDirections(response);

            // se oculta y muestra las direcciones que pidas

            if (document.getElementById("ubicacion").innerHTML = `<h4> Estacion: ${app.localizacion.destinoFinal[0][0]}</h4> <br> <h4>Estás a ${response.routes[0].legs[0].distance.text} de distancia <br> Estás a ${response.routes[0].legs[0].duration.text} de cuidar el planeta :)</h4> <br><br> <h4> Direccion: ${app.localizacion.destinoFinal[0][4]}</h4>`) {
                document.getElementById('ubicacion2').style.display = 'block'

                document.getElementById('ubicacion2').innerHTML = `<h4> Estacion: ${app.estaciones.paradasActivas[0][0]}</h4> <br> <h4>Estás a ${response.routes[0].legs[0].distance.text} de distancia <br> Estás a ${response.routes[0].legs[0].duration.text} de cuidar el planeta :)</h4> <br><br> <h4> Direccion: ${app.localizacion.destinoFinal[0][4]}</h4>`
            } 

            document.getElementById('ubicacion').innerHTML = `<h4> Estacion: ${app.localizacion.destinoFinal[0][0]}</h4> <br> <h4>Estás a ${response.routes[0].legs[0].distance.text} de distancia <br> Estás a ${response.routes[0].legs[0].duration.text} de cuidar el planeta :)</h4> <br><br> <h4> Direccion: ${app.localizacion.destinoFinal[0][4]}</h4>`
            document.getElementById('ubicacion').style.display = 'block'

            if (document.getElementById('ubicacion').innerHTML = `<h4> Estacion: ${app.localizacion.destinoFinal[0][0]}</h4> <br> <h4>Estás a ${response.routes[0].legs[0].distance.text} de distancia <br> Estás a ${response.routes[0].legs[0].duration.text} de cuidar el planeta :)</h4> <br><br> <h4> Direccion: ${app.localizacion.destinoFinal[0][4]}</h4>`) {
                document.getElementById('ubicacion').style.display = 'none'
            }
        })
        .catch();
}

/////Premios
var premio =
    [
        {
            "cantEcoins": "7000",
            "img": "https://cdn.shopify.com/s/files/1/0390/9527/1556/products/ECO03-Taupe_0_1_600x.jpg?v=1641942413",
            "descripcion": "Zapatillas Greenway",
            "": ""
        },
        {
            "cantEcoins": "1500",
            "img": "https://www.nurorganic.com/wp-content/uploads/2019/09/copa-menstrual-nur.jpg",
            "descripcion": "Copita Menstrual",
            "": ""
        },
        {
            "cantEcoins": "300",
            "img": "https://www.hola.com/imagenes/estar-bien/20191212155436/cepillos-dientes-bambu-inconvenientes-gt/0-753-977/dientes-t.jpg?filter=w600",
            "descripcion": "Cepillo de bambu",
            "": ""
        },
        {
            "cantEcoins": "250",
            "img": "https://www.supergutierrez.com/img_blog/porque-debo-usas-bolsas-ecologicas.jpg",
            "descripcion": "Bolsas Ecologicas",
            "": ""
        },
        {
            "cantEcoins": "700",
            "img": "https://www.misharastrera.com/wp-content/uploads/2018/11/WEB-Shampoo-Solido-Rulos-II-70g-.jpg",
            "descripcion": "Shampoo Solido",
            "": ""
        },
        {
            "cantEcoins": "300",
            "img": "https://th.bing.com/th/id/R.e1b1020b67b2eab8a8c9a27dfceed30d?rik=6MGRdPgiExahww&pid=ImgRaw&r=0",
            "descripcion": "Agua Villavicencio Sport 750ml",
            "": ""
        },
        {
            "cantEcoins": "500",
            "img": "https://www.elite.cl/assets/uploads/images/5f946-cl-banner-panuelos-faciales-desktop.png",
            "descripcion": "Panuelitos Elite x6",
            "": ""
        },
        {
            "cantEcoins": "650",
            "img": "https://static-01.daraz.pk/p/362a89e71c35a9ac654cf589505044ed.jpg",
            "descripcion": "Taza de madera",
            "": ""
        },
        {
            "cantEcoins": "300",
            "img": "https://www.hods.eu/wp-content/uploads/vasopla_hods_web_01.jpg",
            "descripcion": "Vasos Reciclables X12 (ECO)",
        },
        {
            "cantEcoins": "700",
            "img": "https://firebasestorage.googleapis.com/v0/b/genbrug-1ff7a.appspot.com/o/gorragw_img.jpg?alt=media&token=b6974455-07f5-43a3-9acf-efe54f88063b",
            "descripcion": "Gorra Greenway",
            "": ""
        },
        {
            "cantEcoins": "1000",
            "img": "https://firebasestorage.googleapis.com/v0/b/genbrug-1ff7a.appspot.com/o/remeragw_img.jpg?alt=media&token=9ec40c14-699f-4895-a383-d626596056d5",
            "descripcion": "Remera Greenway",
            "": ""
        },
        {
            "cantEcoins": "150",
            "img": "https://firebasestorage.googleapis.com/v0/b/genbrug-1ff7a.appspot.com/o/llavero_img.jpg?alt=media&token=756945a1-526b-4919-9fd0-6dfd10dc7f32",
            "descripcion": "Llavero Greenway",
            "": ""
        },
        // {
        //     "cantEcoins": "3500",
        //     "img": "https://http2.mlstatic.com/D_NQ_NP_716341-MLA49195073584_022022-O.webp",
        //     "descripcion": "Pendrive 16gb Con Figuras Personajes",
        //     "": ""
        // },
        // {
        //     "cantEcoins": "1000",

        //     "descripcion": "PARLANTE Bluetooth Gatito LED",
        //     "img": "https://i.ytimg.com/vi/ZgNk5yD3EZQ/maxresdefault.jpg"
        // },
        // {
        //     "cantEcoins": "520",
        //     "img": "https://http2.mlstatic.com/D_NQ_NP_719817-MLA48711411906_122021-O.webp",
        //     "descripcion": "Parlante Portátil Bluetooth Forma De Perro Bull Dog",
        // },
        // {
        //     "cantEcoins": "200",
        //     "img": "https://http2.mlstatic.com/D_NQ_NP_751486-MLA43126884549_082020-O.webp",
        //     "descripcion": "Pendrive Usb 16gb De Marvel",
        // },
        // {
        //     "cantEcoins": "200",
        //     "img": "https://http2.mlstatic.com/D_NQ_NP_959445-MLA48451496063_122021-O.webp",
        //     "descripcion": "PEN DRIVE STAR WARS 64 GB ",
        // },
        // {
        //     "cantEcoins": "200",
        //     "img": "https://http2.mlstatic.com/D_NQ_NP_687993-MLA48137226317_112021-O.webp",
        //     "descripcion": "Parlante Bluetooth Bitty Boomers Star Wars: The Mandalorian",
        // },
        // {
        //     "cantEcoins": "3500",
        //     "img": "https://i.pinimg.com/564x/b8/c2/c8/b8c2c8414a269a2327677f8b82f3c611.jpg",
        //     "descripcion": "Pendrive Harry Potter USB",
        //     "": ""
        // },
        // {
        //     "cantEcoins": "3500",
        //     "img": "https://i.pinimg.com/564x/53/2e/fd/532efd8d8f2eda802ce55b882799cdfa.jpg",
        //     "descripcion": "Pendrive Harry Potter USB",
        //     "": ""
        // },
        // {
        //     "cantEcoins": "3500",
        //     "img": "https://m.media-amazon.com/images/I/31OS6DHQVoL._SL500_.jpg",
        //     "descripcion":  "Pendrive Harry Potter USB",
        //     "": ""
        // },
    ]

premioCoins = new Vue({
    el: "#winner",
    data: { premio: [] }
})
premioCoins.premio = premio



// /////Login
// const auth = firebase.auth()
// const fs = firebase.firestore()

// //Links
// const loggedOutLinks = document.querySelectorAll('.logged-out')
// const loggedInLinks = document.querySelectorAll('.logged-in')

// const loginCheck = user => {
//     if (user){
//         console.log("funca1")
//         loggedInLinks.forEach(link => link.style.display = 'block')
//         loggedOutLinks.forEach(link => link.style.display = 'none')
//     }
//     else{
//       console.log("funca2")
//         loggedInLinks.forEach(link => link.style.display = 'none')
//         loggedOutLinks.forEach(link => link.style.display = 'block')
//     }
// }
// //SignUp

// const signUpForm = document.querySelector('#signUp-form')

// signUpForm.addEventListener('submit', (e) => {
//     e.preventDefault()

//     const email = document.querySelector('#signUp-email').value
//     const password = document.querySelector('#signUp-password').value

//     console.log(email,password)

//     auth
//         .createUserWithEmailAndPassword(email, password)
//         .then(userCredentential => {

//             //Clear the form
//             signUpForm.reset() 

//             //close the modal
//             $('#signUpModal').modal('hide')
//             console.log('sign up')
//         })
// })

// //SignIn

// const signInForm = document.querySelector('#login-form')

// signInForm.addEventListener('submit', e => {
//     e.preventDefault()
//     const email = document.querySelector('#login-email').value
//     const password = document.querySelector('#login-password').value
//     console.log(email,password)
//     auth
//         .signInWithEmailAndPassword(email, password)
//         .then(userCredentential => {

//             //Clear the form
//             signUpForm.reset()

//             //close the modal
//             $('#signUpModal').modal('hide')
//             console.log('sign in')
//         })
// })

// //LogOut

// const logOut = document.querySelector('#logOut')

// logOut.addEventListener('click', e => {
//     e.preventDefault()
//     auth.signOut().then(() => {
//         console.log('sign out')
//     })
// })
// //Google Login

// const googleBtn = document.querySelector('#googleLogin-btn')

// googleBtn.addEventListener('click', e => {
//     const provider = new firebase.auth.GoogleAuthProvider()
//     auth.signInWithPopup(provider)
//         .then(result => {
//             console.log("google sig in")

//             //Clear the form
//             signUpForm.reset()

//             //close the modal
//             $('#signUpModal').modal('hide')
//         })
// })

// //Facebook Login

// const facebookBtn = document.querySelector('#facebookLogin-btn')

// facebookBtn.addEventListener('click', e => {
//     e.preventDefault()
//     const provider = new firebase.auth.FacebookAuthProvider()
//     auth.signInWithPopup(provider)
//         .then(result => {
//             console.log(result)
//             console.log('facebook sign in')
//         })
//         .catch(err => {
//             console.log(err)
//         })
// })

// //list for auth state changes
// auth.onAuthStateChanged(user => {
//     if (user) {
//         console.log('auth: sign in')
//         fs.collection('posts')
//             .get()
//             .then((snapshot) => {
//               loginCheck(user)
//                 /* setUpPosts(snapshot.docs) */
//             }) 
//     }
//     else {
//       loginCheck(user)
//         /* setUpPosts([]) */
//     }
// })

//////LoadingPage


// const bdark = document.querySelector('#bdark')
// const body = document.querySelector('body');

// load();

// bdark.addEventListener('click', e => {
//   body.classList.toggle('darkmode');
//   store(body.classList.contains('darkmode'));
// })

// function load() {
//   const dm = localStorage.getItem('darkmode');

//   if (!dm) {
//     store('false');
//   } else if (dm == 'true') {
//     body.classList.add('darkmode');
//   }
// }

// function store(value) {
//   localStorage.setItem('darkmode', value)
// }

