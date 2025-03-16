let pagina = 1;
let cantidad = 10;

const link = `https://dragonball-api.com/api/characters?page=${pagina}&limit=${cantidad}`; // Updated link for pagination

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

            // Verificar si personaje.items está definido y es un array
            if (Array.isArray(personaje.items)) {
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

                    card.appendChild(enlace);

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
            } else {
                console.error("No se encontraron personajes.");
            }

            const imprimirBotones = document.getElementById("listaBoton");
            imprimirBotones.innerHTML = "";

            const anterior = document.createElement("li");
            anterior.classList.add("btn", "page-item", "page-link");
            anterior.innerHTML = "<";
            anterior.onclick = () => {
                if (pagina > 1) {
                    contenedor.innerHTML = "";  //limpiar tarjetas anteriores.
                    pagina--;
                    pruebaBoton(`https://dragonball-api.com/api/characters?page=${pagina}&limit=${cantidad}`);
                }
            };

            imprimirBotones.appendChild(anterior);

            const colBoton = document.createElement("div");
            const regreso = document.createElement("button");
            const mensajeSinResultado = document.createElement("p");
            const inicio = document.getElementById('primera');
            const final = document.getElementById('ultima');

            for (let i = 0; i < personaje.meta.totalPages; i++) {
                const boton = document.createElement("li");
                const busqueda = document.getElementById("btnBuscar");
                busqueda.addEventListener("click", () => {
                    const imprimirBusqueda = document.getElementById("resultado");
                    const campoBusqueda = document.getElementById("nombre");
                    const textoBusqueda = campoBusqueda.value.toLowerCase();
                    const tarjetas = document.querySelectorAll(".card");
                    const sinResultado = document.getElementById("resultado");
                    let noHayresultado = false;

                    tarjetas.forEach((tarjeta) => {
                        const nombreTarjeta = tarjeta.querySelector(".card-title").textContent.toLowerCase();
                        if (nombreTarjeta.includes(textoBusqueda)) {
                            imprimirBusqueda.appendChild(tarjeta);
                            tarjeta.style.display = "flex";
                            contenedor.style.display = "none";
                            noHayresultado = true;
                        } else {
                            if (!noHayresultado) {
                                colBoton.classList.add("col-12");
                                regreso.classList.add("stiloBoton");
                                regreso.classList.add("btn", "btn-danger");
                                regreso.innerHTML = "Volver";
                                regreso.onclick = () => {
                                window.location.href = `./index.html`;
                                };
                                mensajeSinResultado.classList.add("text-center", "sinResultado");
                                mensajeSinResultado.textContent = "No se encontraron resultados.";
                                sinResultado.appendChild(mensajeSinResultado);
                                colBoton.appendChild(regreso);
                                sinResultado.appendChild(colBoton);
                                busqueda.style.display = "none";
                                campoBusqueda.style.display = "none";
                                tarjeta.style.display = "none";
                                boton.style.display = "none";
                                inicio.style.display = "none";
                                final.style.display = "none";
                                anterior.style.display = "none";
                                siguiente.style.display = "none";
                            };
                        }
                    });
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
                }
            };
            imprimirBotones.appendChild(siguiente);

            inicio.addEventListener('click', () => {
                let newUrl = `https://dragonball-api.com/api/characters?page=1&limit=10`;
                pruebaBoton(newUrl);
                imprimirBotones.innerHTML = "";
            });

            final.addEventListener('click', () => {
                let newUrl = `https://dragonball-api.com/api/characters?page=6&limit=10`;
                pruebaBoton(newUrl);
                imprimirBotones.innerHTML = "";
            });

            inicio.classList.add("btn");
            final.classList.add("btn");
        })
        .catch(error => {
            console.error("No se pudo obtener la información de la API:", error);
        });
};

pruebaBoton(link);
