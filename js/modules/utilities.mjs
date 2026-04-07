// utilities.mjs

import { recipeCardTemplate } from "./templates.mjs";

// This is pretty closely lifted from the nps project
export async function getJson(url) {
    // The data variable is declared here because we're going to return it,
    // so it can't be created inside the response check or else it will be 
    // killed as it exits that scope. It also must be 'let' because its
    // value is non-deterministic and will be changed
    let data = [];
    // fetch() is an asynchronous function so it must be awaited
    const response = await fetch(url);
    if (response.ok) {
        // Once we've gotten a good response, we can retrieve the data. It's 
        // stored as a JSON object, so we need to map that to a JavaScript
        // object using json() (which is also an async function, so it's also
        // neccessary to await it)
        data = await response.json();
    } else throw new Error("response not ok.");
    return data;
}

// Even though this is getting called by an async function, it does not need
// to be asynchronous itself. This is because we never have to await anything
// on the inside; by the time the data has reached this point we have it
// loaded in memory, so we should have full access to it.
// Here, 'data' represents the JSON object that we pulled from file, with all
// recipes (rather than just a single recipe)
export function addCards(data) {
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    if (!favorites) favorites = [];
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

    content.innerHTML = html;

    content.addEventListener('click', function(e) {
        if (e.target.classList.contains('favorite')) {
            const id = e.target.dataset.id;
            const item = data.filter(r => r.recipe_name === id)[0]; // the specific recipe object

            if (item.favorite) {
                e.target.textContent = 'Favorite';
                favorites = favorites.filter(f => !(f.name === item.recipe_name && f.author === item.author));
                item.favorite = false;
            } else {
                e.target.textContent = 'Unfavorite';
                const recipe = { name: item.recipe_name, author: item.author };
                favorites.push(recipe);
                item.favorite = true;
            }

            const marker = e.target.closest('.preview').querySelector('.favorite-marker');
            if (marker) marker.classList.toggle('hidden');

            updateFavorites(favorites);
        }
    });
}

function updateFavorites(favorites) {
    if (!favorites) return;
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function addMenuFunctionality() {
    const toggleButton = document.querySelector('.expand-menu');
    toggleButton.addEventListener('click', (e) => {
        e.preventDefault();
        const nav = document.querySelector('nav');
        nav.classList.toggle('menu-close');
    });
}
