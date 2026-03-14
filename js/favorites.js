// favorites.js

import { getJson, addCards } from './modules/utilities.mjs';
// Remember that if we use modules, we have to set type to module in the
// <script element in the HTML

let favorites = JSON.parse(localStorage.getItem('favorites'));
if (!favorites) favorites = [];

// The initializing function. We use this since JavaScript doesn't like
// awaiting things outside of asynchronous functions
async function init() {
    const data = await getJson('./recipes.json');
    data.forEach(r => {
        r.favorite = false;
        if (favorites.find(f => f.name === r.recipe_name && f.author === r.author)) {
            r.favorite = true;
        }
    });
    const favs = data.filter(r => r.favorite);
    addCards(favs);
}

init();
