import View from "./view";
import icons from 'url:../../img/icons.svg';

/*
* Results view class for search results section in the app UI
*/

class ResultsView extends View {

    _htmlEl = document.querySelector('.results');
    _errorMessage = 'Recpie not found.'
    _successMessage = ''

    // Generate html code to be inserted to the DOM
    _generateHTML() {
        return this._data.map(this._generateSearchResultHTML).join('');
    }

    // Auxiliary method to generate search result HTML
    _generateSearchResultHTML(result) {
        return `
        <li class="preview">
            <a class="preview__link" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
        </li>
    `;
    }
}

// Exporting object for the controller
export default new ResultsView();