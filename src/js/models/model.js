import { API_URL, MAX_SEARCH_RESULTS, API_KEY } from "./configs";
import { AJAX } from "../helpers";

/*
* Application business logic models, For the Model section in the MVC Architecture.
*/

// For the state object template
export const state = {
    recipe: {},
    search: {
        query: '',
        result: [],
        page: 1,
        resultsPerPage: MAX_SEARCH_RESULTS,
    },
    bookmarks: [],
};

/**
 * Creates a Recipe object from a given data.
 * @param {object} data For the data object to create.
 * @returns the new created recipe object.
 */
const createRecipeObject = function (data) {

    // Create new recipe object from the server API
    const { recipe } = data.data;
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        // Add the API key only if the recipe object has one
        ...(recipe.key && { key: recipe.key }),
    };
}

/**
 * Helper function to load the recipe data to the app UI.
 * @param {string} id For the recipe id.
 */
export const loadRecipe = async function (id) {

    try {

        // Get the data from the server API
        const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);

        // Create a recipe object
        state.recipe = createRecipeObject(data);

        // load the recipe from the bookmarks array
        if (state.bookmarks.some(bookmark => bookmark.id === id)) {
            state.recipe.bookmarked = true;
        }
        else {
            state.recipe.bookmarked = false;
        }

    } catch (err) {
        throw err;
    }
}

/**
 * Helper function to load the search result to the app UI.
 * @param {string} query For the search query.
 */
export const loadSearchResults = async function (query) {

    try {
        state.search.query = query;

        const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);

        state.search.result = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                sourceUrl: recipe.source_url,
                image: recipe.image_url,
                // Add the API key only if the recipe object has one
                ...(recipe.key && { key: recipe.key }),
            }
        });

        // Reset the search result default page to 1
        state.search.page = 1;

    } catch (err) {
        throw err;
    }
}

/**
 * Helper function to return a fixed number of search results.
 * @param {number} page For the wanted page number.
 * @returns {object} Return an object of the needed page numbers.
 */
export const getSearchResultsPage = function (page = state.search.page) {

    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.result.slice(start, end);
}

/**
 * Updates the servings quantities.
 * @param {number} servings For the new number of servings.
 */
export const updateServings = function (servings) {

    state.recipe.ingredients.forEach(ingredient => {
        ingredient.quantity = ingredient.quantity * servings / state.recipe.servings;
    });

    state.recipe.servings = servings;
}

/**
 * Adds a recipe to the bookmarks array.
 * @param {object} recipe For the recipe object to be added.
 */
export const addBookmark = function (recipe) {

    state.bookmarks.push(recipe);

    if (recipe.id === state.recipe.id) {
        state.recipe.bookmarked = true;
    }

    // Use browser local storage
    saveBookmarksToLocalStorage();
}

/**
 * Removes recipe from the bookmarks array.
 * @param {string} id For the recipe id to remove.
 */
export const removeBookmark = function (id) {

    const index = state.bookmarks.findIndex(element => element.id === id);
    state.bookmarks.splice(index, 1);

    if (id === state.recipe.id) {
        state.recipe.bookmarked = false;
    }

    // Use browser local storage
    saveBookmarksToLocalStorage();
}

/**
 * Saves the bookmarks list to the browser local storage.
 */
const saveBookmarksToLocalStorage = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

/**
 * Gets the bookmarks from the browser local storage.
 */
const loadBookmarksFromLocalStorage = function () {

    const storage = localStorage.getItem('bookmarks');

    if (storage) {
        state.bookmarks = JSON.parse(storage);
        console.log(storage);
        console.log(state.bookmarks);
    }
};

/**
 * Clears local storage.
 */
const clearBookmarksFromLocalStorage = function () {
    localStorage.clear('bookmarks');
}

/**
 * Uploads a new submitted recipe to the server API.
 * @param {object} recipe For the recipe object to upload.
 */
export const uploadRecipe = async function (recipe) {

    try {

        // Convert data to array, filter it, map and deconstruct it to an object
        const ingredients = Object.entries(recipe)
            .filter(ingredient => ingredient[0].startsWith('ingredient') && ingredient[1] !== '')
            .map(ing => {
                const ingredientsArr = ing[1].split(',').map(ele => ele.trim());

                // Validate needed ingredients format
                if (ingredientsArr.length !== 3) {
                    throw new Error('Wrong ingredient format!');
                }

                const [quantity, unit, description] = ingredientsArr;
                return { quantity: quantity ? +quantity : null, unit, description };

            });

        // Update recipe object
        const newRecipe = {
            title: recipe.title,
            source_url: recipe.sourceUrl,
            image_url: recipe.image,
            publisher: recipe.publisher,
            cooking_time: +recipe.cookingTime,
            servings: +recipe.servings,
            ingredients,
        }

        // Send the object to the API server
        const request = await AJAX(`${API_URL}?key=${API_KEY}`, newRecipe);

        // Create a recipe object
        state.recipe = createRecipeObject(request);

        // Add bookmark status to the received object
        addBookmark(state.recipe);

    } catch (err) {
        throw err;
    }
}