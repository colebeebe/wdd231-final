// recipe.js

import { getJson } from "./modules/utilities.mjs";
import { recipePageTemplate } from "./modules/templates.mjs";
// Remember that we import we have to include module in the <script> element

// JavaScript doesn't really like to work with awaits outside of a function,
// so we wrap everything that needs to happen in another function, usually
// called init()
async function init() {
    // Remember, we had to make getJson asynchronous, so we need to await it
    const data = await getJson('./recipes.json');
    // Get the <main> element
    const main = document.querySelector('main');
    // Get the parameters that are passed via url
    const params = new URLSearchParams(window.location.search);
    // Redirect if there is no recipe specified
    let html = ``;
    if (params.has('id')) {
        html = recipePageTemplate(data[params.get('id')]);
    }
    else if (params.has('name')) {
        html = recipePageTemplate(data.find(r => r.recipe_name.toLowerCase() === params.get('name').toLowerCase()));
    }
    else {
        window.location.href = './';
    }
    // Build the HTML for the page
    // Insert the HTML. This is non-destructive, so anything that already
    // exists won't get overwritten
    main.insertAdjacentHTML('beforeend', html);
}

// This is the actual call to our initialization function. Without this, it
// would never run
init();
