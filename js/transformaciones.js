       
function transformaciones(id){
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
                   
                   // Verificar si existen transformaciones para el personaje
                   if (personaje.transformations && Array.isArray(personaje.transformations)) {
                       personaje.transformations.forEach(transformacion => {
                           const tarjetas = document.createElement("div");
                           tarjetas.classList.add("col-md-3");
                           const card = document.createElement("div");
                           card.classList.add("card", "m-2");
                           tarjetas.appendChild(card);
                           
                           const fondo=document.createElement("div");
                           fondo.classList.add("card-body","fondo");
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
                       const colBoton=document.createElement("div");
                       colBoton.classList.add("col-12");
                       const regreso=document.createElement("button");
                        regreso.classList.add("stiloBoton");
                        regreso.classList.add("btn", "btn-danger");
                        regreso.innerHTML="Volver"; 
                        regreso.onclick= ()=>{
                        window.location.href="index.html";
                        };
                        colBoton.appendChild(regreso);
                        contenedor.appendChild(colBoton);
                   };
               }).catch(error=>{
                console.error("Error al obtener datos", error);
            })
};

// Obtener el ID del personaje desde la URL
const enlaceTransformaciones = new URLSearchParams(window.location.search);
const obtenerId = enlaceTransformaciones.get('characterId');

// Llamar a la función solo para el personaje cuyo ID coincide con el de la URL
if (obtenerId) {
    transformaciones(obtenerId);
}
