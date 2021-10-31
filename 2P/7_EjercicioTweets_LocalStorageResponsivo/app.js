/**
 * // @ts-check
 */

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

  /**
   * Borrar tweets.
   *
   */
  tweetList.addEventListener("click", removeTweet);
}

/**
 * Agregar un tweet al HTML para poder visualizarlo.
 * Es la misma estructura para todos, por eso solamente se pasa el Tweet como
 * parámetro.
 *
 * Dentro del html, agregamos una clase `button-close`, el cual, nos permitirá
 * identificar cuando estemos presionando el botón de `X`, lo que eliminará el
 * tweet. Este será un `bool` que indique `true` o `false` dependiendo de si se
 * puede eliminar o no.
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
    <div class="col-9 tweet-text">
      ${tweet}
    </div>
    <div class="col-1">
      <button class="btn btn-danger button-close" title="Eliminar" close="true">X</button>
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

  // console.log(`tweetForm["tweet"].value: ${tweetForm["tweet"].value}`);

  // Agregamos el tweet al LocalStorage.
  addTweet(tweet);

  // Agregamos el tweet al LocalStorage.
  saveTweetLocalStorage(tweet);
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
   * ----
   *
   * En el if incluso podría no poner la condición de:
   *
   * >      if (tweetsString == null) {
   * >        tweetsArray = [];
   * >      }
   *
   * Esto sería porque ya tenemos el `tweetsArray` inicializado, y ya no
   * sería necesario volver a iniciarlizarlo como arreglo vacío.
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
function saveTweetLocalStorage(tweet) {
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

/**
 * Imprime toda la información de un evento, incluyendo
 * `event.target.currentTarget` y `event.target.target`.
 * @param {Event} event Evento.
 */
function printEventInfo(event) {
  console.log(`event: ${event}`);
  console.log(event);
  /** Elemento específico que se presionó. */
  console.log(`event.target: ${event.target}`);
  console.log(event.target);
  console.log(`event.target.className: ${event.target.className}`);
  console.log(event.target.className);
  console.log(`event.currentTarget: ${event.currentTarget}`);
  console.log(event.currentTarget);
  console.log(
    `event.currentTarget.className: ${event.currentTarget.className}`,
  );
  console.log(event.currentTarget.className);
  console.log(
    `event.target.parentElement.parentElement: ${event.target.parentElement.parentElement}`,
  );
  console.log(event.target.parentElement.parentElement);
  console.log(
    `event.target.parentElement.parentElement.innerHTML: ${event.target.parentElement.parentElement.innerHTML}`,
  );
  console.log("%cAtributo `close` si no es `null`:", "color: #10afc4");
  /**
   * Utilizo el null coalescing operator para imprimir el valor de close (true)
   * si no es null. Si es null, muestra la string de la derecha.
   *
   * Así accedemos a los atributos de un `target`.
   */
  console.log(
    `
      %c${event.target.getAttribute("close") ?? "No existe el atributo `close`"}
    `,
    "color: #b6f2e4",
  );
  /**
   * Quería mostrar atributos y encontré esto, pero no se pudo.
   *
   * console.log(`event.target.attributes: ${event.target.attributes}`);
   * console.log(event.target.attributes);
   *
   * console.log(
   * `event.target.dataset["close"]: ${event.target.dataset["close"]}`,
   * );
   *
   */
  console.log("-------------");
}

/**
 * Elimina un tweet del Local Storage haciendo uso del método `.filter()`.
 *
 * Este método no funciona de la forma que debería, pero lo dejo porque es útil
 * como documentación de las salidas que obtenemos en cada uno de los métodos.
 *
 * ## Solución con `.filter(...)`
 *
 * Obtenemos un elemento de un arreglo haciendo uso de funciones flecha.
 *
 * Hacemos uso de la función `.filter()`, utilizable en arreglos.
 * - Obtener un arreglo que cumpla con las condiciones del filtro.
 *
 * > Obtener arreglo de tweets sin incluir el que queremos eliminar. Esto nos
 * permitirá sustituir el Local Storage con la nueva cadena que no incluye el
 * tweet a eliminar. De esta forma, no eliminamos el tweet como tal, sino que
 * solo obtenemos un arreglo con todos los tweets a excepción del que
 * queremos eliminar, y sustituimos la cadena del Local Storage con esta.
 *
 * ## Problema con este método
 *
 * **Lo malo de esta solución, es que el `.filter()` eliminaría todas las
 * ocurrencias de la condición, por lo que si tenemos 2 tweets iguales, se
 * eliminarían sin importar que no se trate del que se quiere eliminar, por
 * lo que, tenemos que aplicar otro método.**
 *
 * @param {string} tweet Tweet a eliminar.
 */
function removeTweetLocalStorageWithFilter(tweet) {
  /** Tweets aplicando el método `.filter()`. */
  tweetsWithFilter = tweets.filter((t) => t !== tweet);

  console.log(
    "Tweets después de filter (se eliminaron todos los que cumplían con la condición, no solo el que queríamos):",
  );
  console.log(tweetsWithFilter);
}

/**
 * Elimina un tweet del Local Storage.
 *
 * ---
 * ## Problema
 *
 * El detalle con este método es que, aunque solo se borre 1 tweet, no se
 * borrará precisamente el que queremos, sino que se borrará el primero que se
 * encuentre en el ciclo.
 *
 * La cuestión es que, al no tener `ids` confiables aún, es la mejor solución
 * posible. Una vez utilicemos los `ids`, ya podremos hacerlo de mejor manera y
 * borrando el que queremos, no el primero que se encuentre en el ciclo o cosas
 * por el estilo.
 *
 * - También hay otro problema, y es cuando las cadenas se guardan con signos
 * como "\n" y parecidos, ya que en el Local Storage se guardan con ese
 * formato, pero en el texto obtenido del DIV no se guardan. Creo que esto se
 * puede alcanzar con el `.innerHTML` del elemento obtenido directamente de la
 * clase, en lugar del obtenido haciendo la substring.
 * ---
 *
 * Hacemos uso de un `for()` y `.splice()` para poder eliminar solo el elemento
 * buscado y no todos los elementos. En la otra solución utilizamos
 * `.filter()`, pero se eliminan **TODAS** las ocurrencias del tweet y no solo
 * la deseada o al menos 1 sola. Esto está implementado en la función
 * `removeTweetLocalStorageWithFilter(tweet)`.
 *
 * ## Solución con `.splice()`
 *
 * Elimina un rango de elementos del arreglo y recibe los parámetros.
 *
 * ## Parámetros
 *
 * `.splice(posicionInicialAPartirDeDondeVaAEliminar, numeroElementosAEliminar)`
 *
 * @param {string} tweet Tweet a eliminar.
 */
function removeTweetLocalStorage(tweet) {
  let tweets = getTweets();
  /**
   * Tweets que se obtienen con el método `.splice()`.
   * - Este es el método que utilizaremos.
   *
   * No lo hago directamente con `tweets` para poder utilizarlos con los 2
   * métodos y comparar.
   *
   * > No es necesario hacer esto, pero ya lo había hecho cuando tenía también
   * > el filter en esta misma función. Así que mejor lo dejo así.
   */
  let tweetsWithSplice = tweets;

  console.log("Tweets antes de eliminar:");
  console.log(tweets);
  console.log(
    `%cTweet a eliminar: %c${tweet}`,
    "color: hsl(100, 100%, 50%)",
    "color: hsl(20, 100%, 50%)",
  );
  /**
   * Solución con `for(...)`
   */
  for (var i = 0; i < tweetsWithSplice.length; i++) {
    /**
     * Cuando eliminemos un elemento, saldremos del ciclo para no eliminar otro
     * repetido.
     */
    if (tweetsWithSplice[i] === tweet) {
      tweetsWithSplice.splice(i, 1);
      break;
    }
  }
  /**
   * Solo imprimí así para hacer el experimento. Se regresa cada elemento del
   * arreglo, y después se unen para hacer una string con una "," al final (el
   * método `.join()` la agrega automáticamente).
   */
  // console.log(
  //   `Tweets después de ".splice()":
  //   ${tweetsWithSplice.map((t) => `"${t}"`).join()}`,
  // );
  console.log("Tweets después de `.splice()`:");
  console.log(tweetsWithSplice);

  /**
   * Guardamos los tweets en LocalStorage sin incluir el que ya eliminamos.
   * Convertimos a string para guardarlos.
   */
  localStorage.setItem(tweetsKey, JSON.stringify(tweetsWithSplice));
}

/**
 * Eliminar tweet tanto del Local Storage como del DOM. En esta ocasión no nos
 * podemos guiar con un `id` , dado a que no hemos hecho uso de las bases de
 * datos.
 *
 * - Con `event.target` podemos saber a qué elemento le damos click, pero
 * nosotros no queremos solo la `X`, sino todo el contenedor para eliminarlo
 * completo, por lo que tenemos que acceder al padre,
 * `event.target.parentElement`, y así sucesivamente hasta llegar al elemento
 * que sí queremos eliminar, el contenedor principal de todo el tweet.
 *
 * @param {Event} event Evento del event listener.
 */
function removeTweet(event) {
  // printEventInfo(event);

  /**
   * 1. Ver que damos click sobre el botón.
   * 2. Obtener el contenedor principal que vamos a borrar, no solo el botón.
   */
  if (event.target.className.includes("button-close")) {
    console.log(event.target.parentElement.parentElement);
    /** Guardar el elemento padre para luego eliminarlo. */
    var item = event.target.parentElement.parentElement;

    /**
     * MÉTODO 1 PARA OBTENER EL TEXTO DEL TWEET --------------------------------
     *
     * `item.getElementsByClassName("tweet")[0];`
     */

    /**
     * Eliminar elemento del LocalStorage.
     *
     * Ahí solamente guardamos la cadena del Tweet, por lo que tendríamos que
     * obtener esa parte. Para esto haremos uso de una clase auxiliar llamada
     * `tweet-text`, para marcar o indicar que en ese elemento estará el texto
     * del tweet.
     *
     * Obtenemos el tweet por el nombre de la clase. Hay que recordar que el
     * método `.getElementsByClassName()` devuelve un array, y que el método `.
     * getElementByClassName()` no existe. Solo existe el primero que devuelve
     * el array.
     *
     * Como solo tendremos un elemento con esa clase dentro de los tweets, entonces tomaremos la posición 0 del arreglo:
     *
     * `item.getElementsByClassName("tweet-text")[0]`
     */
    var tweetMetodoUno = item.getElementsByClassName("tweet-text")[0];
    console.log(`tweetMetodoUno: ${tweetMetodoUno}`);
    console.log(tweetMetodoUno);
    console.log(
      `%ctweetMetodoUno.innerText (texto que eliminaríamos del LocalStorage): ${tweetMetodoUno.innerText}`,
      "color: hsl(150, 100%, 50%)",
    );

    /** Eliminar elemento del Local Storage con la cadena que obtuvimos. */
    // tweetList

    /**
     * MÉTODO 2 PARA OBTENER TWEET ---------------------------------------------
     *
     * Utilizar una substring. Este es el que utilizó el profe en la clase del
     * Jueves, 28/OCT.
     */

    /**
     * Obtenemos una subcadena de todo el texto del `div` para solamente tomar
     * el texto. El problema es que el `.innerText` también devuelve la `X` del
     * botón de eliminar, por lo que hay que removerla.
     *
     * Para solo obtener el texto del tweet sin la `X`, tenemos que quitar el último caracter, pero como el índice comienza desde 0, entonces tenemos que restar 2 ([-1 por la X] [-1 porque el índice comienza desde 0]).
     */
    var tweetMetodoDos = item.innerText.substring(0, item.innerText.length - 2);
    console.log(
      `%ctweetMetodoDos (texto que eliminaríamos del LocalStorage): ${tweetMetodoDos}`,
      "color: hsl(180, 100%, 50%)",
    );

    /**
     * Eliminar tweet del Local Storage con el método 1.
     *
     * Quise hacer un trim() para ver si así podía eliminar el texto del
     * LocalStorage, pero no puedo. Lo que tendría que hacer es obtener el
     * texto junto a sus caracteres de escape ("\n" principalmente), pero no sé
     * cómo hacerlo. Tendré que investigar.
     */
    // removeTweetLocalStorage(tweetMetodoUno.innerText.trim());
    
    /** Eliminar tweet del Local Storage con el método 2. */
    removeTweetLocalStorage(tweetMetodoDos);

    /** Eliminar elemento del DOM. -------------------------------------------*/
    item.remove();
  }

  /**
   * Si el `target` presionado tiene la clase `button-close` (no está en el
   * Framework), eliminar el tweet.
   *
   * Utilizamos el atributo `.className` para ver si tiene dicha clase dentro.
   * Este es un método de las `string`, por lo que revisa si la cadena tiene
   * este elemento.
   */
  if (event.target.className.includes("button-close")) {
    console.log(
      "Presionando el botón de eliminar tweet con clase `button-close`.",
    );
  }
  if (event.target.getAttribute("close")) {
    // https://stackoverflow.com/questions/30850158/i-need-value-from-a-named-node-map
    // https://stackoverflow.com/a/30850437/13562806
    console.log("Presionando el botón de eliminar tweet con atributo `close`.");
  }
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
