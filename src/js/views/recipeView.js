import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';

/*
* Recipe view class for recipe section in the app UI
*/

class RecipeView {

    #recipeEl = document.querySelector('.recipe');
    #recipeData;
    #errorMessage = 'Recpie not found.'
    #successMessage = ''

    // Renders a given html data
    renderRecipeData(data) {
        this.#recipeData = data;
        this.#cleanup();
        const html = this.#generateHTML();
        this.#recipeEl.insertAdjacentHTML('afterbegin', html);
    }

    // Auxiliary method to cleanup HTML elements
    #cleanup() {
        this.#recipeEl.innerHTML = '';
    }

    // Renders a loading spinner circle to a given container in the app UI
    renderLoadingSpinner() {

        const html = `
        <div class="spinner">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
        </div>
        `;
        this.#cleanup();
        this.#recipeEl.insertAdjacentHTML('afterbegin', html);
    }

    // Handler for the recipe
    addRecipeHandler(handler) {
        ['hashchange', 'load'].forEach(event => window.addEventListener(event, handler));
    }

    // Renders a given error message to the app UI
    renderMessage(err = this.#errorMessage) {
        const html = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${err}</p>
        </div>
        `;
        this.#cleanup();
        this.#recipeEl.insertAdjacentHTML('afterbegin', html);
    }

    // Renders a given message to the app UI
    renderMessage(msg = this.#successMessage) {
        const html = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${msg}</p>
        </div>
        `;
        this.#cleanup();
        this.#recipeEl.insertAdjacentHTML('afterbegin', html);
    }

    // Auxiliary method to generate html code to be inserted to the DOM
    #generateHTML() {

        return `
      <figure class="recipe__fig">
        <img src="${this.#recipeData.image}" alt="${this.#recipeData.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this.#recipeData.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this.#recipeData.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this.#recipeData.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this.#recipeData.ingredients.map(this.#generateIngredientsHTML).join('')}
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this.#recipeData.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this.#recipeData.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
    }

    // Auxiliary method to generate ingredients HTML
    #generateIngredientsHTML(ingredient) {
        return `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ingredient.quantity ? new Fraction(ingredient.quantity).toString() : ''}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.description}
              </div>
            </li>
            `;
    }
}

// Exporting object for the controller
export default new RecipeView();





