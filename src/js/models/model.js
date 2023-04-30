/*
* Application business logic models.
*/

import { async } from "regenerator-runtime";
import { API_URL, MAX_SEARCH_RESULTS } from "./configs";
import { getJSON } from "../helpers";

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

// For the recipe object
export const loadRecipe = async function (id) {

    try {

        const data = await getJSON(`${API_URL}${id}`);

        // Create new recipe object from the server API
        const { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };

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

// For the search result object 
export const loadSearchResults = async function (query) {

    try {
        state.search.query = query;

        const data = await getJSON(`${API_URL}?search=${query}`);

        state.search.result = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                sourceUrl: recipe.source_url,
                image: recipe.image_url,
            }
        });

        // Reset the search result default page to 1
        state.search.page = 1;

    } catch (err) {
        throw err;
    }
}

// Helper function to return a fixes number of search results
export const getSearchResultsPage = function (page = state.search.page) {

    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.result.slice(start, end);
}

// For the update of the servings quantities
export const updateServings = function (servings) {

    state.recipe.ingredients.forEach(ingredient => {
        ingredient.quantity = ingredient.quantity * servings / state.recipe.servings;
    });

    state.recipe.servings = servings;
}

// Adds recipe to the bookmarks array
export const addBookmark = function (recipe) {

    state.bookmarks.push(recipe);

    if (recipe.id === state.recipe.id) {
        state.recipe.bookmarked = true;
    }

    // Use browser local storage
    saveBookmarksToLocalStorage();
}

// Removes recipe from the bookmarks array
export const removeBookmark = function (id) {

    const index = state.bookmarks.findIndex(element => element.id === id);
    state.bookmarks.splice(index, 1);

    if (id === state.recipe.id) {
        state.recipe.bookmarked = false;
    }

    // Use browser local storage
    saveBookmarksToLocalStorage();
}

// Saves the bookmarks list to the browser local storage
const saveBookmarksToLocalStorage = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

// Gets the bookmarks from the browser local storage
const loadBookmarksFromLocalStorage = function () {

    const storage = localStorage.getItem('bookmarks');

    if (storage) {
        state.bookmarks = JSON.parse(storage);
    }
}
// loadBookmarksFromLocalStorage();

// Clears local storage
const clearBookmarksFromLocalStorage = function () {
    localStorage.clear('bookmarks');
}