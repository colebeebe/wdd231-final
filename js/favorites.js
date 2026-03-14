// favorites.js

import { getJson } from './modules/utilities.mjs';
import { recipeCardTemplate } from "./modules/templates.mjs";
// Remember that if we use modules, we have to set type to module in the
// <script element in the HTML

// The initializing function. We use this since JavaScript doesn't like
// awaiting things outside of asynchronous functions
async function init() {
    const data = await getJson('./recipes.json');
    const content = document.querySelector('.content');
    const html = data.map(recipeCardTemplate).join('');
    content.insertAdjacentHTML('beforeend', html);
}

init();
