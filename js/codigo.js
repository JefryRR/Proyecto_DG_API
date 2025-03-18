let pagina = 1;
let cantidad = 10;

const link = `https://dragonball-api.com/api/characters?page=${pagina}&limit=${cantidad}`;
const respuesta = {
    method: 'GET',
    headers: { 'accept': '/' }
};

function pruebaBoton(link) {
    fetch(link, respuesta)
        .then(response => {
            return response.json();
        })
        .then(personaje => {
            const contenedor = document.getElementById("personajes");
            // Limpiar el contenedor antes de agregar nuevos personajes
            contenedor.innerHTML = "";
            personaje.items.forEach(personaje => {
                const tarjetas = document.createElement("div");
                tarjetas.classList.add("col-md-3");
                const card = document.createElement("div");
                card.classList.add("card", "m-2");
                tarjetas.appendChild(card);

                const fondo = document.createElement("div");
                fondo.classList.add("card-body", "fondo");
                const img = document.createElement("img");
                img.src = personaje.image;
                img.classList.add("card-img-top", "tamaño");
                fondo.appendChild(img);

                const linkTransformacion = `./index2.html?characterId=${personaje.id}`;

                const enlace = document.createElement("a");
                enlace.href = linkTransformacion;
                enlace.appendChild(fondo);

                const contenido = document.createElement("h2");
                contenido.classList.add("card-title");
                contenido.innerHTML = personaje.name;

                const contenido3 = document.createElement("p");
                contenido3.classList.add("card-text");
                contenido3.innerHTML = (`${personaje.race}-${personaje.gender}`);

                const titulo = document.createElement("h3");
                titulo.classList.add("card-title");
                titulo.innerHTML = "ki Base:";

                const contenido4 = document.createElement("p");
                contenido4.classList.add("card-text");
                contenido4.innerHTML = (`${personaje.ki}`);

                const titulo2 = document.createElement("h3");
                titulo2.classList.add("card-title");
                titulo2.innerHTML = "ki Total:";

                const contenido5 = document.createElement("p");
                contenido5.classList.add("card-text");
                contenido5.innerHTML = personaje.maxKi;

                const titulo3 = document.createElement("h3");
                titulo3.classList.add("card-title");
                titulo3.innerHTML = "Afiliación:";

                const contenido6 = document.createElement("p");
                contenido6.classList.add("card-text");
                contenido6.innerHTML = personaje.affiliation;

                card.appendChild(enlace);       //carga la imágen

                const datosTarjeta = document.createElement("div");
                datosTarjeta.classList.add("card-body");
                datosTarjeta.appendChild(contenido);
                datosTarjeta.appendChild(contenido3);
                datosTarjeta.appendChild(titulo);
                datosTarjeta.appendChild(contenido4);
                datosTarjeta.appendChild(titulo2);
                datosTarjeta.appendChild(contenido5);
                datosTarjeta.appendChild(titulo3);
                datosTarjeta.appendChild(contenido6);
                card.appendChild(datosTarjeta);
                contenedor.appendChild(tarjetas);
            });
            const imprimirBotones = document.getElementById("listaBoton");
            imprimirBotones.innerHTML = "";

            const anterior = document.createElement("li");
            anterior.classList.add("btn", "page-item", "page-link");
            anterior.innerHTML = "<";
            anterior.onclick = () => {
                if (pagina > 1) {
                    pagina--;
                    pruebaBoton(`https://dragonball-api.com/api/characters?page=${pagina}&limit=${cantidad}`);
                };
            };
            imprimirBotones.appendChild(anterior);

            const ocultarBotones = document.getElementById("botones");
            const inicio = document.getElementById('primera');
            const final = document.getElementById('ultima');
            const busqueda = document.getElementById("btnBuscar");
            const imprimirBusqueda = document.getElementById("resultado");
            const mensajeSinResultado = document.createElement("p");
            const regreso = document.createElement("button");
            regreso.classList.add("stiloBoton", "btn", "btn-danger");
            regreso.innerHTML = "Volver";


            for (let i = 0; i < personaje.meta.totalPages; i++) {
                const boton = document.createElement("li");

                busqueda.addEventListener("click", () => {
                    let noHayresultado = "true";
                    const campoBusqueda = document.getElementById("nombre");
                    const textoBusqueda = campoBusqueda.value.toLowerCase();
                    const tarjetas = document.querySelectorAll(".card");
                    tarjetas.forEach(tarjeta => {
                        const nombreTarjeta = tarjeta.querySelector(".card-title").textContent.toLowerCase();
                        if (nombreTarjeta.includes(textoBusqueda)) {
                            imprimirBotones.style.display = "none";
                            tarjeta.style.display = "flex";
                            contenedor.style.display = "none";
                            ocultarBotones.style.display = "none";
                            imprimirBusqueda.appendChild(tarjeta);
                            noHayresultado = false;
                            mensajeSinResultado.style.display = "none";
                            regreso.onclick = () => {
                                window.history.back();
                            };
                            imprimirBusqueda.appendChild(regreso);
                        };
                    });
                    if (noHayresultado) {
                        contenedor.style.display = "none";
                        mensajeSinResultado.classList.add("sinResultado", "d-flex");
                        mensajeSinResultado.textContent = "No existen personajes con este nombre";
                        ocultarBotones.style.display = "none";
                        imprimirBusqueda.appendChild(mensajeSinResultado);
                        regreso.onclick = () => {
                            window.location.href = "./index.html";
                        };
                        imprimirBusqueda.appendChild(regreso);
                    };
                });

                boton.classList.add("btn", "page-item", "page-link");
                boton.onclick = () => {
                    contenedor.innerHTML = "";
                    imprimirBotones.innerHTML = "";
                    pagina = i + 1;
                    pruebaBoton(`https://dragonball-api.com/api/characters?page=${pagina}&limit=${cantidad}`);
                };
                boton.textContent = i + 1;
                imprimirBotones.appendChild(boton);
            };


            const siguiente = document.createElement("li");
            siguiente.classList.add("btn", "page-item", "page-link");
            siguiente.innerHTML = ">";
            siguiente.onclick = () => {
                if (pagina < 6) {
                    pagina++;
                    pruebaBoton(`https://dragonball-api.com/api/characters?page=${pagina}&limit=${cantidad}`);
                };
            };
            imprimirBotones.appendChild(siguiente);

            inicio.addEventListener('click', () => {
                let newUrl = `https://dragonball-api.com/api/characters?page=1&limit=${cantidad}`;
                pruebaBoton(newUrl);
                imprimirBotones.innerHTML = "";
            });

            final.addEventListener('click', () => {
                let newUrl = `https://dragonball-api.com/api/characters?page=6&limit=${cantidad}`;
                pruebaBoton(newUrl);
                imprimirBotones.innerHTML = "";
            });
        }).catch({
            error: (error) => { console.error("No se pudo obtener la información de la API:", error) }
        })
};
pruebaBoton(link);

function transformaciones(id) {
    const link = `https://dragonball-api.com/api/characters/${id}`; // Cambiar para acceder a un solo personaje

    const respuesta = {
        method: 'GET',
        headers: { 'accept': '/' }
    };
    fetch(link, respuesta)
        .then(response => {
            return response.json();
        })
        .then(personaje => { // Cambiar para acceder al objeto directamente
            const contenedor = document.getElementById("transformaciones");
            personaje.transformations.forEach(transformacion => {
                const tarjetas = document.createElement("div");
                tarjetas.classList.add("col-md-3");
                const card = document.createElement("div");
                card.classList.add("card", "m-2");
                tarjetas.appendChild(card);

                const fondo = document.createElement("div");
                fondo.classList.add("card-body", "fondo");
                const img = document.createElement("img");
                img.src = transformacion.image;
                img.classList.add("card-img-top", "tamaño");
                fondo.appendChild(img);


                const contenido = document.createElement("h2");
                contenido.classList.add("card-title");
                contenido.innerHTML = transformacion.name;

                const titulo = document.createElement("h3");
                titulo.classList.add("card-title");
                titulo.innerHTML = "ki Base:";

                const contenido3 = document.createElement("p");
                contenido3.classList.add("card-text");
                contenido3.innerHTML = (`${personaje.race}-${personaje.gender}`);

                const contenido4 = document.createElement("p");
                contenido4.classList.add("card-text");
                contenido4.innerHTML = (`${transformacion.ki}`);

                const titulo2 = document.createElement("h3");
                titulo2.classList.add("card-title");
                titulo2.innerHTML = "ki Total:";

                const contenido5 = document.createElement("p");
                contenido5.classList.add("card-text");
                contenido5.innerHTML = personaje.maxKi;

                const titulo3 = document.createElement("h3");
                titulo3.classList.add("card-title");
                titulo3.innerHTML = "Afiliación:";

                const contenido6 = document.createElement("p");
                contenido6.classList.add("card-text");
                contenido6.innerHTML = personaje.affiliation;

                card.appendChild(fondo);

                const datosTarjeta = document.createElement("div");
                datosTarjeta.classList.add("card-body");
                datosTarjeta.appendChild(contenido);
                datosTarjeta.appendChild(contenido3);
                datosTarjeta.appendChild(titulo);
                datosTarjeta.appendChild(contenido4);
                datosTarjeta.appendChild(titulo2);
                datosTarjeta.appendChild(contenido5);
                datosTarjeta.appendChild(titulo3);
                datosTarjeta.appendChild(contenido6);
                card.appendChild(datosTarjeta);
                contenedor.appendChild(tarjetas);
            });
            const colBoton = document.createElement("div");
            colBoton.classList.add("col-12");
            const regreso = document.createElement("button");
            regreso.classList.add("stiloBoton");
            regreso.classList.add("btn", "btn-danger");
            regreso.innerHTML = "Volver";
            regreso.onclick = () => {
                window.history.back();
            };
            colBoton.appendChild(regreso);
            contenedor.appendChild(colBoton);
        }).catch(error => {
            console.error("Error al obtener datos", error);
        });
};

// Obtener el ID del personaje desde la URL
const enlaceTransformaciones = new URLSearchParams(window.location.search);
const obtenerId = enlaceTransformaciones.get('characterId');

// Llamar a la función solo para el personaje cuyo ID coincide con el de la URL
if (obtenerId) {
    transformaciones(obtenerId);
};