/*
* Application business logic models.
*/

import { async } from "regenerator-runtime";
import { API_URL } from "./configs";
import { getJSON } from "../helpers";

// For the state object template
export const state = {
    recipe: {},
    search: {
        query: '',
        result: [],
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

