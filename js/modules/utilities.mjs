// utilities.mjs

// This is pretty closely lifted from the nps project
export async function getJson(url) {
    // The data variable is declared here because we're going to return it,
    // so it can't be created inside the response check or else it will be 
    // killed as it exits that scope. It also must be 'let' because its
    // value is non-deterministic and will be changed
    let data = [];
    // fetch() is an asynchronous function so it must be awaited
    const response = await fetch(url);
    if (response.ok) {
        // Once we've gotten a good response, we can retrieve the data. It's 
        // stored as a JSON object, so we need to map that to a JavaScript
        // object using json() (which is also an async function, so it's also
        // neccessary to await it)
        data = await response.json();
    } else throw new Error("response not ok.");
    return data;
}
