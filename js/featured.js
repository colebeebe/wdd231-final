import { getJson, addCards, addMenuFunctionality } from "./modules/utilities.mjs";

async function init() {
    const data = await getJson('./recipes.json');

    // Shuffle recipes
    const shuffled = [...data].sort(() => Math.random() - 0.5);

    // Select two
    const randomRecipes = shuffled.slice(0, 2);

    // First, render using addCards() so layout is correct
    addCards(randomRecipes);
    // Add author to card
    const container = document.getElementById("featured-recipes");
    const cards = container.querySelectorAll(".preview");

    cards.forEach((card, index) => {
        const recipe = randomRecipes[index];
        const title = card.querySelector('.info');
        title.insertAdjacentHTML('afterend', `<p class="author">Author: ${recipe.author}</p>`)
    });
    addMenuFunctionality();
}

init();

