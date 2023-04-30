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
};

// For the recipe object
export const loadRecipe = async function (id) {

    try {

        const data = await getJSON(`${API_URL}${id}`);

        // Create new recipe object
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

//
export const updateServings = function (servings) {

    state.recipe.ingredients.forEach(ingredient => {
        ingredient.quantity = ingredient.quantity * servings / state.recipe.servings;
    });

    state.recipe.servings = servings;
}