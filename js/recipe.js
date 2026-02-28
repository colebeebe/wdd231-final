// recipe.js

import { getJson } from "./modules/utilities.mjs";
// Remember that we import we have to include module in the <script> element

// JavaScript doesn't really like to work with awaits outside of a function,
// so we wrap everything that needs to happen in another function, usually
// called init()
async function init() {
    
}

// This is the actual call to our initialization function. Without this, it
// would never run
init();
