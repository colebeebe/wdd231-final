import { getJson, addCards, addMenuFunctionality } from "./modules/utilities.mjs";

async function init() {
    const data = await getJson('./recipes.json');

    // Shuffle recipes
    const shuffled = [...data].sort(() => Math.random() - 0.5);

    // Select two
    const randomRecipes = shuffled.slice(0, 2);

    // First, render using addCards() so layout is correct
    addCards(randomRecipes);
    addMenuFunctionality();
}

init();

