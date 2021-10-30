// @ts-check

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

/* ------------------------------- CONSTANTES ------------------------------- */

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
 * Llave con la que vamos a guardar los Tweets en el Local Storage.
 *
 * Esto porque en el LocalStorage se guarda un diccionario, y de esta manera no
 * sobreescribimos los datos.
 */
const tweetsKey = "tweets";

/* -------------------------------- FUNCIONES ------------------------------- */

/**
 * En esta función se declaran todos los eventos posibles de la aplicación.
 */
function eventListener() {
  /**
   * Agregar tweets.
   * Obtener el evento del formulario. Atrapar evento de tipo "submit".
   */
  tweetForm.addEventListener("submit", addTweetToTweetList);

  /**
   * Mostramos los tweets una vez que el DOM haya terminado de cargar (muy
   * probablemente cuando se recargue o se entre a la página).
   */
  document.addEventListener("DOMContentLoaded", showTweets);
}

/**
 * Agregar un tweet al HTML para poder visualizarlo.
 * Es la misma estructura para todos, por eso solamente se pasa el Tweet como
 * parámetro.
 *
 * @param {string} tweet Tweet que vamos a agregar la lista de tweets del HTML.
 */
function addTweet(tweet) {
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

  // Agregamos el último tweet (div) con la función.
  tweetList.appendChild(newTweet);
}

/**
 * Función para agregar un tweet al final de la lista de Tweets, en donde
 * recibe un evento como parámetro. Se suele poner como `e`, pero lo pongo como
 * `event` en lo que me acostumbro.
 *
 * @param {Event} event Evento que recibe la función.
 */
function addTweetToTweetList(event) {
  // No hacer envío del formulario automáticamente, sino que se "aguanta" o
  // mantiene.
  event.preventDefault();

  /**  Guardar el valor (texto) del tweet que obtenemos del form. */
  const tweet = tweetForm["tweet"].value;

  // Agregamos el tweet al LocalStorage.
  addTweet(tweet);

  // Agregamos el tweet al LocalStorage.
  saveTweet(tweet);
}

/**
 * Obtener Tweets del LocalStorage.
 *
 * @returns Arreglo de string con los tweets del Local Storage.
 * */
function getTweets() {
  /**
   * Tweets obtenidos con la llave del diccionario del LocalStorage.
   *
   * Se obtiene una cadena, no un array.
   */
  let tweetsString = localStorage.getItem(tweetsKey);

  /**
   * En otra variable guardamos el arreglo de tweets que obtenemos del Local
   * Storage. Esto realmente lo hice porque el `ts-check`, que revisa el
   * código de JS, me mostraba una advertencia por hacer la conversión de
   * string a arreglo directamente en la misma variable. Y, claro, esto se
   * puede hacer, pero también se puede poner en variables distintas.
   */
  let tweetsArray = [];

  /**
   * Tenemos que verificar que haya datos o no en el LocalStorage.
   *
   *    tweetsArray = tweetsString == null ? [] : JSON.parse(tweetsString);
   *
   */
  if (tweetsString == null) {
    /** Definimos un arreglo vacío. */
    tweetsArray = [];
  } else {
    /**
     * Si no es null, entonces sí tenemos datos.
     *
     * En Local Storage se guardan cadenas, por lo que tenemos que convertir en
     * objeto y luego guardar en el arreglo, el cual, es un objeto.
     */
    tweetsArray = JSON.parse(tweetsString);
  }

  return tweetsArray;
}

/**
 * Guardar tweet en el Local Storage.
 *
 * - Primero obtenemos todos los tweets del LocalStorage (arreglo de cadenas).
 *
 * @param {String} tweet Tweet como cadena de texto.
 */
function saveTweet(tweet) {
  let tweets = getTweets();

  /** Añadimos el tweets a la list ade tweets. */
  tweets.push(tweet);

  /** Guardar en Local Storage. Primero hay que convertir a cadena JSON. */
  localStorage.setItem(tweetsKey, JSON.stringify(tweets));
}

/**
 * Mostrar tweets guardados en Local Storage.
 */
function showTweets() {
  /** Arreglo de tweets. */
  let tweets = getTweets();

  /**
   * Recorrer arreglo y utilizar funciones flecha (arrow functions).
   *
   * Se pueden utilizar llaves, pero cuando es un proceso, no las requiere.
   *
   * ---
   *
   * Creo que otra alternativa podría ser utilizar `.map()` en lugar de
   * `forEach()`. Creo que tienen un comportamiento similar, pero no estoy
   * seguro.
   *
   * Ahora, de acuerdo a
   *
   * https://www.freecodecamp.org/news/4-main-differences-between-foreach-and-map/,
   *
   * una de las principales diferencias es que `map()` regresa un arreglo,
   * mientras que `forEach()` regresa `undefined`, por lo que el primero
   * permite encadenar otros métodos, y el segundo no, porque no se puede
   * operar con este, dado el valor que regresa.
   *
   * Más que nada, `map()` se podría utilizar cuando queremos devolver un
   * arreglo, y `forEach()` cuando no. En este caso no necesitamos devolver
   * nada, por lo que, con el `forEach()` está bien. No hay necesidad de
   * utilizar el `map()`.
   */
  tweets.forEach((tweet) => {
    /**
     * Por cada uno de los elementos, hacer lo siguiente.
     *
     * > En la clase repetíamos el código que se encontraba en la clase
     * `addTweet()` (ahora llamada `addTweetToTweetList()`, lo cual, es muy
     * verboso, pero para diferenciar), pero mejor lo partí en 2 funciones para
     * no tener que repetir el mismo código.
     */
    addTweet(tweet);
  });
}

/* --------------------------- LLAMADA A FUNCIONES -------------------------- */

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
