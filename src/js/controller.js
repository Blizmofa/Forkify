import * as model from './models/model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

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
    recipeView.renderData(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  }
};

//
const getSearchResult = async function () {

  try {

    resultsView.renderLoadingSpinner();

    // Get the input from the search field
    const quary = searchView.getSearchFieldValue();

    if (!quary) {
      return;
    }

    // Loads the search results
    await model.loadSearchResults(quary)

    // Render the search results to the app UI
    resultsView.renderData(model.state.search.result);

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

