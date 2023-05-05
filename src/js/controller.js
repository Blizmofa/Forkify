import * as model from './models/model.js'
import { ADD_RECIPE_FORM_CLOSE_SEC_TIMOUT } from '../js/models/configs.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

/*
* For the Controller section in the MVC Architecture.
*/

/**
 * Controller for getting recipe object.
 */
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

    // Update bookmarks at the app UI
    bookmarksView.updateData(model.state.bookmarks);

    // Load the recipe
    await model.loadRecipe(id);
    const { recipe } = model.state.recipe

    // Render the fetched recipe to the app UI
    recipeView.renderData(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  }
};

/**
 * Controller for getting recipe search results.
 */
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
    searchView.renderError();
  }
};

/**
 * Controller for getting pagination results.
 * @param {number} goToPage For the page to go to.
 */
const getPaginationResult = function (goToPage) {

  // Render the new search results to the app UI
  resultsView.renderData(model.getSearchResultsPage(goToPage));

  // Render the new pagination buttons to the app UI
  paginationView.renderData(model.state.search);
}

/**
 * Controller for getting the servings results.
 * @param {number} servings For the new number of servings.
 */
const getServingsResult = function (servings) {

  // Update the recipe servings 
  model.updateServings(servings);

  // Update the view data accordinglly
  recipeView.updateData(model.state.recipe);
}

/**
 * Controller for getting the bookmarks list results.
 */
const getBookmarkListResult = function () {

  // Handle bookmarks list
  if (!model.state.recipe.bookmarked) {

    model.addBookmark(model.state.recipe);
  }
  else {

    model.removeBookmark(model.state.recipe.id);
  }

  // Update the view data accordinglly
  recipeView.updateData(model.state.recipe);

  // Render bookmarks list to the app UI
  bookmarksView.renderData(model.state.bookmarks);
}

/**
 * Controller for getting the bookmarks render results.
 */
const getBookmarkRenderResult = function () {
  bookmarksView.renderData(searchView.bookmarks);
}

/**
 * Controller for getting the add recipe render results.
 * @param {object} rec For the recipe object to render.
 */
const getAddRecipeResult = async function (rec) {

  try {

    // Renders the loading spinner to the app UI
    addRecipeView.renderLoadingSpinner();

    // Upload the new recipe to the server API
    await model.uploadRecipe(rec);
    console.log(model.state.recipe);

    // Render the new recipe to the app UI
    recipeView.renderData(model.state.recipe);

    // Display upload success message
    addRecipeView.renderMessage();

    // Render the new recipe to the bookmark section
    bookmarksView.renderData(model.state.bookmarks);

    // Change url to the new recipe id
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Set timeout to close form
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, ADD_RECIPE_FORM_CLOSE_SEC_TIMOUT * 1000)

  } catch (err) {
    addRecipeView.renderError(err.message);
  }

}

// Initializes the app UI
const init = function () {

  bookmarksView.addBookmarksHandler(getBookmarkRenderResult);
  recipeView.addRecipeHandler(getRecipeResult);
  recipeView.addServingsHandler(getServingsResult)
  recipeView.addBookmarkhandler(getBookmarkListResult);
  searchView.addSearchHandler(getSearchResult);
  paginationView.addPaginationHandler(getPaginationResult);
  addRecipeView.addUploadRecipeHandler(getAddRecipeResult);
}

init();

