import { getJson, addCards } from "./modules/utilities.mjs";

async function init() {
    const data = await getJson('./recipes.json');

    // Shuffle recipes
    const shuffled = [...data].sort(() => Math.random() - 0.5);

    // Select two
    const randomRecipes = shuffled.slice(0, 2);

    // First, render using addCards() so layout is correct
    addCards(randomRecipes);

    // Then fix the links to point correctly
    const container = document.getElementById("featured-recipes");
    const links = container.querySelectorAll("a");

    links.forEach((link, index) => {
        const recipe = randomRecipes[index];
        link.href = `recipe.html?name=${encodeURIComponent(recipe.recipe_name)}`;
    });
}

init();