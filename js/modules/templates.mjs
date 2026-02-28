// templates.mjs

// The function to create recipe cards on browse.html
// 'data' represents a single recipe, not the whole array that we pulled from
// the json file. We return a single card element that can, in turn, be
// inserted into the html
export function recipeCardTemplate(data) {
    // Get the recipe's image. It must be found inside images/recipes/
    // We also check to make sure that the data exists.
    let image = 'https://picsum.photos/100/100';
    if (data.image) {
        image = 'images/recipes/' + data.image;
    }

    // Just like the photo, we want to check that the alt info exists
    // This is the ternary operator. It's basically saying 'check what's
    // before the question mark. If true, return the first thing, and if
    // false return the second.' In other words, it's the same thing as
    // what we did for the image but in one line
    const alt = data.image_alt ? data.image_alt : 'recipe photo';

    return `
        <div class="preview">
            <section class="info">
                <img src="${image}" alt="${alt}" />
                <h2>${data.recipe_name}</h2>
            </section>
            <div class="btn-container">
                <button class="btn btn-orange favorite">Favorite</button>
                <a href="recipe.html" class="btn btn-green view">View</a>
            </div>
        </div>
    `;
}

function ingredientsTemplate(data) {
    return data.map(recipe => `
        ${recipe.name ? `<h2 class="recipe-name">${recipe.name}</h2>` : ``}
        <h3>Ingredients:</h3>
        <ul>
            ${recipe.ingredients.map(i => `
                <li>
                    ${i.amount ? i.amount : ``}
                    ${i.unit ? i.unit : ``}
                    ${i.name}${i.notes ? `, ${i.notes}` : ``}
                </li>`).join('')}
        </ul>
    `).join('');
}

function stepsTemplate(data) {
    return data.map(recipe => `
        ${recipe.name ? `<h2 class="recipe-name">${recipe.name}</h2>` : ``}
        <h3>Steps:</h3>
        <ol>
            ${recipe.steps.map(s => `
                <li>${s}</li>
            `).join('')}
        </ol>
    `).join('');
}

// The function to fill out the recipe page
// Again, here 'data' represents a single recipe that will be displayed on the
// page, rather than the entire list of recipes
export function recipePageTemplate(data) {
    // We also want to display the image dynamically, so we get it here
    // Again, we check if the data exists.
    let image = 'https://picsum.photos/800/400';
    if (data.image) {
        image = 'images/recipes/' + data.image;
    }

    // We also need the alt. Look at this line in recipeCardTemplate() for
    // more information on what's going on
    const alt = data.image_alt ? data.image_alt : 'recipe photo';

    return `
        <section class="title-info">
            <h1>${data.recipe_name}</h1>
            <h2>Author: ${data.author}</h2>
        </section>
        <hr />
        <img src="${image}" alt="${alt}" />
        <section class="prep-info">
            ${data.servings ? `<p class="servings">Servings: ${data.servings}</p>`: ``}
            ${data.yields ? `<p class="yields">Yields: ${data.yields}</p>`: ``}
            ${data.prep_time ? `<p class="prep-time">Prep time: ${data.prep_time}</p>`: ``}
            ${data.cook_time ? `<p class="cook-time">Cook time: ${data.cook_time}</p>`: ``}
            ${data.total_time ? `<p class="total-time">Total time: ${data.total_time}</p>`: ``}
        </section>
        <hr />
        <section class="ingredients">
            ${ingredientsTemplate(data.subrecipes)}
        </section>
        <hr />
        <section class="steps">
            ${stepsTemplate(data.subrecipes)}
        </section>
    `;
}
