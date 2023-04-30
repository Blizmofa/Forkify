import * as model from './models/model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

// Controller function for recipe
const getRecipeResult = async function () {

  try {

    // Retrieve the recipe id
    const id = window.location.hash.slice(1);

    if (!id) {
      return;
    }

    // Renders the loading spinner to the app UI
    recipeView.renderLoadingSpinner();

    // For the selected recipe to stay selected in app UI
    resultsView.updateData(model.getSearchResultsPage());

    // Load the recipe
    await model.loadRecipe(id);
    const { recipe } = model.state.recipe

    // Render the fetched recipe to the app UI
    recipeView.renderData(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  }
};

// Controller function for search results
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
    resultsView.renderData(model.getSearchResultsPage());

    // Render the pagination buttons to the app UI
    paginationView.renderData(model.state.search);


  } catch (err) {
    console.log(err);
  }
};

// Controller function for pagination
const getPaginationResult = function (goToPage) {

  // Render the new search results to the app UI
  resultsView.renderData(model.getSearchResultsPage(goToPage));

  // Render the new pagination buttons to the app UI
  paginationView.renderData(model.state.search);
}

// Controller function for servings
const getServingsResult = function (servings) {

  // Update the recipe servings 
  model.updateServings(servings);

  // update the view data accordinglly
  recipeView.updateData(model.state.recipe);
}

// Initializes the app UI
const init = function () {

  recipeView.addRecipeHandler(getRecipeResult);
  recipeView.addServingsHandler(getServingsResult)
  searchView.addSearchHandler(getSearchResult);
  paginationView.addPaginationHandler(getPaginationResult);
}

init();

