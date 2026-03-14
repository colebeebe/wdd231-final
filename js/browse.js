// browse.js

import { getJson } from "./modules/utilities.mjs";
import { recipeCardTemplate } from "./modules/templates.mjs";
// Remember that we import we have to specify module in the <script> element

let favorites = JSON.parse(localStorage.getItem('favorites'));

// Even though this is getting called by an async function, it does not need
// to be asynchronous itself. This is because we never have to await anything
// on the inside; by the time the data has reached this point we have it
// loaded in memory, so we should have full access to it.
// Here, 'data' represents the JSON object that we pulled from file, with all
// recipes (rather than just a single recipe)
function addCards(data) {
    // We get this element because that's where we've designated that the
    // cards will be added
    const content = document.querySelector(".content");
    // There's a lot going on this next line. At the end of the day, map() and
    // forEach() do roughly the same thing - that is, iterate through all
    // objects in an array (or List, or however you want to call it). The
    // difference is that map() returns a value whereas forEach() does not. In
    // this case, we are creating one string that represents the html for all
    // of the cards, so we use map() to return that. Normally, you might be 
    // accustomed to seeing something like `data.map(object => object.name)`
    // but because recipeCardTemplate() expects two parameters, JavaScript
    // is able to infer that we want to pass each object in `data` into the
    // recipeCardTemplate() function call. After all of that, we need to use
    // `join('')`, which just tells map() to join all elements with nothing
    // (the default is commas).
    const html = data.map(recipeCardTemplate).join('');
    // After we've created our html, we can simply append it to the page. In
    // this case we use insertAdjacentHTML(), which is non-destructive (it
    // doesn't destroy everything that already exists inside the element)
    content.insertAdjacentHTML('beforeend', html);

    content.addEventListener('click', function(e) {
        if (e.target.classList.contains('favorite')) {
            const id = e.target.dataset.id;
            if (!favorites) {
                favorites = [];
            }
            else {
                console.log(favorites);
            }
            const recipe = {
                name: data[id].recipe_name,
                author: data[id].author
            };
            favorites.push(recipe);
            updateFavorites();
        }
    });
}

function updateFavorites() {
    if (!favorites) return;
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// JavaScript doesn't really like to work with awaits outside of a function,
// so we wrap everything that needs to happen in another function, usually
// called init()
async function init() {
    // Don't forget: getJson() is an async function so we need to await it
    const data = await getJson('./recipes.json');
    data.forEach(r => {
        r.favorite = false;
        if (favorites.find(f => f.name === r.recipe_name && f.author === r.author)) {
            r.favorite = true;
        }
    });
    addCards(data);
    
}

// This is the actual call to our initialization function. Without this, it
// would never run
init();
