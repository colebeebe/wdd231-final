// templates.mjs

// The function to create recipe cards on browse.html
// 'data' represents a single recipe, not the whole array that we pulled from
// the json file. 'id' is the id of the reicpe, which is the same as its index
// in the array. We return a single card element that can, in turn, be
// inserted into the html
export function recipeCardTemplate(data, id) {
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
    const alt = data.image_alt ? data.image_alt : `${data.recipe_name} recipe photo`;

    return `
        <div class="preview">
            <section class="info">
                <img src="${image}" alt="${alt}" />
                <h2>${data.recipe_name}</h2>
                <p class="favorite-marker ${data.favorite ? `` : `hidden`}">❤︎</p>
            </section>
            <div class="btn-container">
                <button class="btn btn-orange favorite" data-id="${id}">${data.favorite ? `Unfavorite`: `Favorite`}</button>
                <a href="recipe.html?name=${data.recipe_name}" class="btn btn-green view">View</a>
            </div>
        </div>
    `;
}

// The template for the ingredients section of recipe.html
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

// The template for recipe steps section of recipe.html
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
            ${data.author ? `<h2>Author: ${data.author}</h2>` : ``}
        </section>
        <hr />
        <img src="${image}" alt="${alt}" />
        <section class="prep-info">
            ${data.servings ? `<section class="prep servings"><p class="prep-title">Servings</p><p>${data.servings}<p></section>`: ``}
            ${data.yields ? `<section class="prep yields"><p class="prep-title">Yields</p><p>${data.yields}</p></section>`: ``}
            ${data.prep_time ? `<section class="prep prep-time"><p class="prep-title">Prep time</p><p>${data.prep_time}</p></section>`: ``}
            ${data.cook_time ? `<section class="prep cook-time"><p class="prep-title">Cook time</p><p>${data.cook_time}</p></section>`: ``}
            ${data.total_time ? `<section class="prep total-time"><p class="prep-title">Total time</p><p>${data.total_time}</p></section>`: ``}
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
