var punto = document.getElementsByClassName('.gm-style img')
var ubicacion = document.getElementById('ubicacion')

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
cargarPagina("menuPage")


//////////Loader
var preloader = document.getElementById("page-splash")
setTimeout(function() {
    preloader.style.display = "none"
}, 1000);
////////////////

function prueba() {
    currentPosition()
}

var app = new Vue({
    el: '#app',
    data: {
        estaciones: {
            paradas: [],
            paradasActivas: [],
            paradasActivasNombre: [],
            paradasActivasInfo: [],
            paradasActivasCoords: [],
            coordenadas: [],
            destinoActual: [],
            paradasCoordsString: [],
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
    }
});

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
            "-34.922302402883496,-57.95493732361004"
        ],
        [
            "Estado Atenea",
            -34.925389445729145,
            -57.94945585469184,
            "-34.925389445729145,-57.94945585469184"
        ],
        [
            "Parque San Martín",
            -34.93175604944046,
            -57.96808955054438,
            "-34.93175604944046,-57.96808955054438"
        ],
        [
            "Parque Saavedra",
            -34.932282008849725,
            -57.94182764344423,
            "-34.932282008849725,-57.94182764344423"
        ],
        [
            "Parque PRUEBA",
            -34.91641772378313,
            -57.98857278451355,
            "-34.91641772378313, -57.98857278451355"
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
        const puntosInfo = puntos.info;
        const puntosPosition = [];

        puntos.addListener("click", () => {
            var destinoActual = [];
            if (navigator.geolocation) {
                destinoActual.push(app.estaciones.paradasActivasCoords[0])
                puntosPosition.push({ lat: Estacion[1], lng: Estacion[2] })
                app.estaciones.puntosPosition = puntosPosition
                app.estaciones.destinoActual = destinoActual
                currentPosition()
            } else {
                console.log("JAAAA")
            }
        });

        puntos.addListener("click", show);
        function show() {
            document.getElementById('sidebar').classList.toggle('active');
            var blur = document.getElementById("blur");

            blur.style.display = 'block';
            blur.classList.add('blureado');
            blur.style.zIndex = 1200;

            var paradaActivaNombre = [];
            var paradaActivaInfo = [];
            var paradasActivasCoords = [];

            for (let u = 0; u < Estaciones.length; u++) {
                if (Estaciones[u][0] === puntosTitle) {
                    paradaActivaNombre.push(puntosTitle)
                    paradaActivaInfo.push(puntosInfo)
                    paradasActivasCoords.push(Estaciones[u][1])
                }
            }
            app.estaciones.paradasActivasNombre = paradaActivaNombre;
            app.estaciones.paradasActivasInfo = paradaActivaInfo;
            app.estaciones.paradasActivasCoords = paradasActivasCoords;
        };
    }
    app.estaciones.paradas = Estaciones;
}


function currentPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
    document.getElementById('sidebar').classList.toggle('active');
    var blur = document.getElementById("blur");

    blur.style.display = 'block';
    blur.classList.add('blureado');
    blur.style.zIndex = 1200;

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

            if (status == 'OK') {
                var allDistance = [];

                allDistance.push(response.rows[0].elements[0].distance.value)

                /*  console.log("distancia pusheada  " + allDistance) */

                allParadas[s].push(allDistance[0])

                function compare(a, b) {
                    if (a[4] < b[4]) {
                        return -1;
                    }
                    return 0;
                }

                allParadas.sort(compare);

                /*  console.log("distancia mas chiquita   " + allParadas[0][4]) */

                app.localizacion.viajeDistancia.push(allParadas[0][4])
                app.localizacion.destinoFinal.push(allParadas[0][3])

                if (app.localizacion.destinoFinal.slice(-1)[0] === app.estaciones.paradas[0][3]) {
                    calculateAndDisplayRoute(directionsService, directionsRenderer)
                }
            }
        }
    }
}


function shownt() {
    var toggle = document.getElementById('sidebar')
    var blur = document.getElementById("blur");

    toggle.classList.toggle('active');
    blur.style.display = "none";
}


function calculateAndDisplayRoute(directionsService, directionsRenderer) {
   var direccionDePrueba = "-34.94486276284149,-57.96170227030192"
   
    directionsService
        .route({
            origin: {
                query: app.ubicacionActual,
            },
            destination: {
                query: app.localizacion.destinoFinal.slice(-1)[0],
            },
            travelMode: google.maps.TravelMode.WALKING/* [selectedMode] */,
        })
        .then((response) => {
            /*   mapa.panTo(app.localizacion.destinoFinal) */
            app.localizacion.viajeDistancia = app.localizacion.destinoFinalInfo;
         
            document.getElementById('ubicacion').innerHTML = `Estás a ${response.routes[0].legs[0].distance.text} de distancia <br><br> Estás a ${response.routes[0].legs[0].duration.text} de cuidar el planeta :)`
         
            
            directionsRenderer.setDirections(response);
        })
        .catch((e) => window.alert("Directions request failed due to " + status));
}


/////Premios
var premio =
    [       
		{
            "cantEcoins": "7000",
            "img": "https://cdn.shopify.com/s/files/1/0390/9527/1556/products/ECO03-Taupe_0_1_600x.jpg?v=1641942413",
            "descripcion": "Zapatillas Greenway",
            "id": "1",
            "clasificacion":"Indumentaria"
        },        
		{
            "cantEcoins": "1500",
            "img": "https://www.nurorganic.com/wp-content/uploads/2019/09/copa-menstrual-nur.jpg",
            "descripcion": "Copita Menstrual",
            "id": "2",
            "clasificacion":"Higiene"
        },
		{
            "cantEcoins": "300",
            "img": "https://www.hola.com/imagenes/estar-bien/20191212155436/cepillos-dientes-bambu-inconvenientes-gt/0-753-977/dientes-t.jpg?filter=w600",
            "descripcion": "Cepillo de bambu",
            "id": "3",
            "clasificacion":"Higiene"
        },
		{
            "cantEcoins": "250",
            "img": "https://www.supergutierrez.com/img_blog/porque-debo-usas-bolsas-ecologicas.jpg",
            "descripcion": "Bolsas Ecologicas",
            "id": "4",
            "clasificacion":"Accesorio"
        },
		{
            "cantEcoins": "700",
            "img": "https://www.misharastrera.com/wp-content/uploads/2018/11/WEB-Shampoo-Solido-Rulos-II-70g-.jpg",
            "descripcion": "Shampoo Solido",
            "id": "5",
            "clasificacion":"Higiene"
        },
        {
            "cantEcoins": "300",
            "img": "https://th.bing.com/th/id/R.e1b1020b67b2eab8a8c9a27dfceed30d?rik=6MGRdPgiExahww&pid=ImgRaw&r=0",
            "descripcion": "Agua Villavicencio Sport 750ml",
            "id": "6",
            "clasificacion":"Insumo"
        },
        {
            "cantEcoins": "500",
            "img": "https://www.elite.cl/assets/uploads/images/5f946-cl-banner-panuelos-faciales-desktop.png",
            "descripcion": "Panuelitos Elite x6",
            "id": "7",
            "clasificacion":"Higiene"
        },
		{
            "cantEcoins": "650",
            "img": "https://static-01.daraz.pk/p/362a89e71c35a9ac654cf589505044ed.jpg",
            "descripcion": "Taza de madera",
            "id": "8",
            "clasificacion":"Bazar"
        },
		{
            "cantEcoins": "300",
            "img": "https://www.hods.eu/wp-content/uploads/vasopla_hods_web_01.jpg",
            "descripcion": "Vasos Reciclables X12 (ECO)",
            "id": "9",
            "clasificacion":"Bazar"
        },
		{
            "cantEcoins": "700",
            "img": "https://firebasestorage.googleapis.com/v0/b/genbrug-1ff7a.appspot.com/o/gorragw_img.jpg?alt=media&token=b6974455-07f5-43a3-9acf-efe54f88063b",
            "descripcion": "Gorra Greenway",
            "id": "10",
            "clasificacion":"Accesorio"
        },        
		{
            "cantEcoins": "1000",
            "img": "https://firebasestorage.googleapis.com/v0/b/genbrug-1ff7a.appspot.com/o/remeragw_img.jpg?alt=media&token=9ec40c14-699f-4895-a383-d626596056d5",
            "descripcion": "Remera Greenway",
            "id": "11",
            "clasificacion":"Accesorio"
        },
		{
            "cantEcoins": "150",
            "img": "https://firebasestorage.googleapis.com/v0/b/genbrug-1ff7a.appspot.com/o/llavero_img.jpg?alt=media&token=756945a1-526b-4919-9fd0-6dfd10dc7f32",
            "descripcion": "Llavero Greenway",
            "id": "12",
            "clasificacion":"Accesorio"
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
    
    hola = new Vue({
        el: "#prueba",
        data: { recom: [] }
    })
    hola.recom = premio
    
    let allContainerCart = document.querySelector('.products');
    let containerBuyCart = document.querySelector('.card-items');
    let priceTotal = document.querySelector('.price-total')
    
    
    let buyThings = [];
    let totalCard = 0;
    let countProduct = 0;
    
    //functions
    loadEventListenrs();
    function loadEventListenrs(){
    allContainerCart.addEventListener('click', addProduct); // AGREGA ELEMENTOS
    
     containerBuyCart.addEventListener('click', deleteProduct); //DELETE
    } 
    
    function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement; 
        readTheContent(selectProduct);
    }
    }
    
    function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');
    
        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard =  totalCard - priceReduce;
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);
        countProduct--;	
        console.log(countProduct)
    }
    loadHtml();
    }
    
    
    function readTheContent(product){
    const infoProduct = {
        image: product.querySelector('img').getAttribute('src'),
        title: product.querySelector('.card-text').textContent,
        price: product.querySelector('.card-title').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }
    
    
    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);
    
    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct]
        countProduct++;
    }
    loadHtml();
    }
    
      function loadHtml(){
      clearHtml();
         buyThings.forEach(product => {
         const {image,title, price, amount, id} = product;
         
         var row = document.createElement('tr');
         row.classList.add('item');
         row.innerHTML = `
         <td> <img src="${image}" width="20px" alt=""></td>
                 <td>${title}</td>
                                  <td class="cart-price">${price}$</td>
                 <td> ${amount}</td>
             
                 <td>  <span class="delete-product" data-id="${id}">X</span></td>
    
         `;
         containerBuyCart.appendChild(row);
         priceTotal.innerHTML = totalCard;
        
     });
    
     if (countProduct == 0){
        priceTotal.innerHTML = "0"
    } 
     
    }
    function clearHtml(){
    containerBuyCart.innerHTML = '';
    }
    
    
    function input(valor) {
        var arr = []
        valor.forEach(state => {
            arr.push(state.clasificacion)
        })
        const states_ar = new Set(arr);
        arr = [...states_ar]
        for (var i = 0; i < arr.length; i++) {
            var option;
            option = `<option value="${arr[i]}">${arr[i]}</option>`;
            document.getElementById("inputGroupSelect03").innerHTML += option;
        }
    }
    input(premio)
    
    function filtros() {
        inputGroupSelect03.addEventListener('change', filtros)
        clasificacion = document.getElementById("inputGroupSelect03")
        if (clasificacion.value != "Todos") {
             hola.recom = premio.filter(recom => recom.clasificacion == clasificacion.value)
            
        } else {
            hola.recom = premio
        }
    }

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = firebase.auth()
const fs = firebase.firestore()
// const storage = firebase.storage()

//Links
const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')

const loginCheck = user => {
    if (user){
        console.log("funca1")
        loggedInLinks.forEach(link => link.style.display = 'block')
        loggedOutLinks.forEach(link => link.style.display = 'none')
    }
    else{
      console.log("funca2")
        loggedInLinks.forEach(link => link.style.display = 'none')
        loggedOutLinks.forEach(link => link.style.display = 'block')
    }
}
//SignUp

const signUpForm = document.querySelector('#signUp-form')

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = document.querySelector('#signUp-email').value
    const password = document.querySelector('#signUp-password').value

    console.log(email,password)

    auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentential => {

            //Clear the form
            signUpForm.reset() 

            //close the modal
            $('#signUpModal').modal('hide')
            $('#signInModal').modal('hide')
            console.log('sign up')
        })
})

//SignIn

const signInForm = document.querySelector('#login-form')

signInForm.addEventListener('submit', e => {
    e.preventDefault()
    const email = document.querySelector('#login-email').value
    const password = document.querySelector('#login-password').value
    console.log(email,password)
    auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentential => {

            //Clear the form
            signUpForm.reset()

            //close the modal
            $('#signUpModal').modal('hide')
            $('#signInModal').modal('hide')
            console.log('sign in')
        })
})

//LogOut
const logOut = document.querySelector('#logOut')

logOut.addEventListener('click', e => {
    e.preventDefault()
    auth.signOut().then(() => {
        console.log('sign out')
    })
})


//Google Login
// const provider = new firebase.auth.GoogleAuthProvider()
const googleBtn = document.querySelector('#googleLogin-btn')
googleBtn.addEventListener('click', e => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
        .then(result => {
            console.log("google sig in")

            //Clear the form
            signUpForm.reset()

            //close the modal
            $('#signUpModal').modal('hide')
            $('#signInModal').modal('hide')
        })
})

//Facebook Login
const facebookBtn = document.querySelector('#facebookLogin-btn')
facebookBtn.addEventListener('click', e => {
    e.preventDefault()
    const provider = new firebase.auth.FacebookAuthProvider()
    auth.signInWithPopup(provider)
        .then(result => {
            console.log(result)
            console.log('facebook sign in')
        })
        .catch(err => {
            console.log(err)
        })
})

var nombreUsuario = null;
var eCoinsUsuario = null;
var userPhoto = null;
var userEmail = null;

var fotoUser = document.getElementById('userFoto')


var cargarVariables = () =>{
    var myUserId = auth.currentUser.uid;
    var docu = fs.collection('users').doc(myUserId)
    console.log(`Id del usuario: ${myUserId}`)

    docu.get().then((doc) => {
        nombreUsuario = doc.data().userName;
        eCoinsUsuario = doc.data().eCoins;
        userPhoto = auth.currentUser.photoURL;
        userEmail = auth.currentUser.email;
    })
    

}

//cargarDatosAFirebase
var chargeDataFirebase = (result) =>{
    var myUserId = auth.currentUser.uid;
    var docu = fs.collection('users').doc(myUserId)
    console.log(`Id del usuario: ${myUserId}`)

    docu.get().then((doc) => {
        if (doc.exists) {
            console.log(doc.data())
            nombreUsuario = doc.data().userName;
            eCoinsUsuario = doc.data().eCoins;
            userPhoto = auth.currentUser.photoURL;
            userEmail = auth.currentUser.email;
        }
        else{
            if(result.user.displayName == null){
                result.user.displayName = `${fName} + ' ' + ${lName}`
            }
            return fs.collection('users').doc(result.user.uid).set({
                eCoins: 0,
                userName: result.user.displayName,
                userMail: auth.currentUser.email
            });   
        }
    })
}
//Posts

/* const postList = document.querySelector('.posts')
const setUpPosts = data => {
    if (data.length) {
        let html = ''
        data.forEach(doc => {
            const post = doc.data()
            console.log(post)
            const li = `
            <li class="list-group-item list-group-item-action">
                <h5>${post.title}</h5>
                <p>${post.description}</p>
            </li>
            `
            html += li
        });
        postList.innerHTML = html
    }
    else {
        postList.innerHTML = `
        <div class="container"><p class="text-center">Logeate para ver las publicaciones</p></div>
        `
    }
} */

//Events
//list for auth state changes

auth.onAuthStateChanged(user => {
    if (user) {
        console.log('auth: sign in')
        fs.collection('posts')
            .get()
            .then((snapshot) => {
              loginCheck(user)
                /* setUpPosts(snapshot.docs) */
            }) 
        cargarVariables() 
    }else {
      loginCheck(user)
      nombreUsuario = null;
      eCoinsUsuario = null;
      userPhoto = null;
    }
})

var actualizarECoins = () =>{
    fs.collection('users').doc(auth.currentUser.uid).set({
        eCoins: eCoinsUsuario+5
    }, { merge: true });
    cargarVariables()
    console.log(eCoinsUsuario, nombreUsuario, userPhoto)
}
//Para probar la funcion, vaya a inspeccionar la pagina >> console >> y escriba el comando para la funcion "actualizarECoins();", el cambio se ve en firebase




/////////LightModeCache
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

var checkoutPopup = document.getElementById('envioPopup')
var loginCheckEnvio = document.getElementById('signInModal')

function checkout(){
    if (auth.onAuthStateChanged){
    checkoutPopup.style.display = "flex" 
    } else {
        loginCheckEnvio.display.style = "block"
    }
}

function btnEnvio() {
    checkoutPopup.style.display = "none"
}