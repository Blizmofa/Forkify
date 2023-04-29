import * as model from './models/model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Gets the recipe from the model
const getRecipe = async function () {

  try {

    // Retrieve the recipe id
    const id = window.location.hash.slice(1);

    if (!id) {
      return;
    }

    // Renders the loading spinner to the app UI
    recipeView.renderLoadingSpinner();

    // Load the recipe
    await model.loadRecipe(id);
    const { recipe } = model.state.recipe

    // Render the fetched recipe to the app UI
    recipeView.renderRecipeData(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  }
};

//
const getSearchResult = async function () {

  try {

    // Get the input from the search field
    const quary = searchView.getSearchFieldValue();

    if (!quary) {
      return;
    }

    // Loads the search results
    await model.loadSearchResults(quary)

    console.log(model.state.search.result);

  } catch (err) {
    console.log(err);
  }
};

// Initializes the app UI
const init = function () {

  recipeView.addRecipeHandler(getRecipe);
  searchView.addSearchHandler(getSearchResult);
}

init();

