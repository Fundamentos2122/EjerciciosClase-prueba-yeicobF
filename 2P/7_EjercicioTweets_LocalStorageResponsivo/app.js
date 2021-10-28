/**
 * Toda la lógica de Javascript.
 * - De la clase del: Martes, 26 de OCTUBRE del 2021.
 *
 * En primera instancia, hay que pensar en cada uno de los eventos con los que
 * el usuario podrá encontrarse o interactuar.
 *
 * ---
 * 1. Más básico: Cuando se da click al botón de enviar al formulario.
 *
 * 2. Para todos los tweets, para al momento en que se da click al botón de la
 * `X`, se vaya a eliminar el tweet.
 *
 * 3. Cuando cargue la página, se debería de obtener la lista de Tweets que se
 * haya quedado guardada en `LocalStorage`.
 */

/**
 * Variable de tipo `const`, que va a ser el formulario.
 */
const tweetForm = document.forms["tweetForm"];

/**
 * Obtenemos la lista de tweets como constante para no hacerlo una y otra vez 
 * cada que agregamos un tweet.
 */
const tweetList = document.getElementById("tweets");

/**
 * En esta función se declaran todos los eventos posibles de la aplicación.
 */
function eventListener() {
  // Agregar tweets.
  // Obtener el evento del formulario. Atrapar evento de tipo "submit".
  tweetForm.addEventListener("submit", addTweet);
}

/* -------------------------------- FUNCIONES ------------------------------- */

/**
 * Función para agregar un tweet, en donde recibe un evento como parámetro. Se
 * suele poner como `e`, pero lo pongo como `event` en lo que me acostumbro.
 *
 * @param {event} event Evento que recibe la función.
 */
function addTweet(event) {
  // No hacer envío del formulario automáticamente, sino que se "aguanta" o
  // mantiene.
  event.preventDefault();

  /**  Guardar el valor (texto) del tweet que obtenemos del form. */
  const tweet = tweetForm["tweet"].value;

  /**
   * Crear el nuevo elemento (div).
   *
   * Añadir estilos y contenido.
   *
   * - Por ahora solamente añadimos las clases `.row` y `.border-top`.
   *
   * ---------
   *
   * ## Template Strings
   *
   * Agregamos la plantilla de un tweet haciendo uso de `template strings`.
   *
   *
   * ### Concatenación de variables
   *
   * En este tipo de cadenas, se pueden concatenar variables utilizando la
   * siguiente sintaxis:
   *
   *  `Cadena normal ${nombreDeVariable} sigue cadena normal.`
   */
  const newTweet = document.createElement("div");
  // Añadimos 2 clases al tweet, el cual, ya es un div.
  newTweet.className = "row border-top";

  // Utilizamos la Template String, concatenando la variable `tweet`.
  newTweet.innerHTML = `
    <div class="col-2">
      <img src="https://picsum.photos/200/" alt="" class="img-fluid" />
    </div>
    <div class="col-9">
      ${tweet}
    </div>
    <div class="col-1">
      <button class="btn btn-danger" title="Eliminar">X</button>
    </div>
  `;
}

/** 
 * Llamamos a la función para escuchar el evento.
 * 
 * Podríamos hacer uso del "hoisting" de JS, en donde no importa que la función 
 * sea declarada antes o después, se puede llamar desde cualquier línea del 
 * código aunque aún no se haya definido. 
 * 
 * Solo que he visto que por legibilidad y buenas prácticas se recomienda que 
 * se llame a la función después de 
 * declararla. Aún así, no sé qué tan cierto sea esto. Al final de cuenta, son 
 * opiniones.
 */
eventListener();
