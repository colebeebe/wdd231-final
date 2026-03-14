// browse.js

import { getJson, addCards } from "./modules/utilities.mjs";
// Remember that we import we have to specify module in the <script> element

let favorites = JSON.parse(localStorage.getItem('favorites'));
// Make sure that favorites exists
if (!favorites) favorites = [];


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
