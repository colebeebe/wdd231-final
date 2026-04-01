// browse.js

import { getJson, addCards, addMenuFunctionality } from "./modules/utilities.mjs";
// Remember that we import we have to specify module in the <script> element

let favorites = JSON.parse(localStorage.getItem('favorites'));
// Make sure that favorites exists
if (!favorites) favorites = [];

let data = [];

function applyFilter(e) {
    e.preventDefault();

    const input = document.querySelector('#search-bar');
    const filteredList = data.filter(r => r.recipe_name.toLowerCase().includes(input.value.toLowerCase()));

    addCards(filteredList);
}

// JavaScript doesn't really like to work with awaits outside of a function,
// so we wrap everything that needs to happen in another function, usually
// called init()
async function init() {
    // Don't forget: getJson() is an async function so we need to await it
    data = await getJson('./recipes.json');
    data.forEach(r => {
        r.favorite = false;
        if (favorites.find(f => f.name === r.recipe_name && f.author === r.author)) {
            r.favorite = true;
        }
    });
    addCards(data);
    addMenuFunctionality();
}

// This is the actual call to our initialization function. Without this, it
// would never run
init();

const filter = document.querySelector('.recipe-filter');
filter.addEventListener('submit', applyFilter);
