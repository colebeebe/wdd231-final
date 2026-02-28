// templates.mjs

// The function to create recipe cards on browse.html
// 'data' represents a single recipe, not the whole array that we pulled from
// the json file. We return a single card element that can, in turn, be
// inserted into the html
export function recipeCardTemplate(data) {
    // Get the recipe's image. It must be found inside images/recipes/
    const image = 'images/recipes/' + data.image;

    return `
        <div class="preview">
            <section class="info">
                <img src="${image}" />
                <h2>${data.recipe_name}</h2>
            </section>
            <div class="btn-container">
                <button class="btn btn-orange favorite">Favorite</button>
                <a href="recipe.html" class="btn btn-green view">View</a>
            </div>
        </div>
    `;
}
