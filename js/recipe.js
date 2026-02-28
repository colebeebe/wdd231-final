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
    // Build the HTML for the page
    const html = recipePageTemplate(data[1]);
    // Insert the HTML. This is non-destructive, so anything that already
    // exists won't get overwritten
    main.insertAdjacentHTML('beforeend', html);
}

// This is the actual call to our initialization function. Without this, it
// would never run
init();
