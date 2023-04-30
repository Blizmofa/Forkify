import View from "./view";

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

        // Get the selected recipe id
        const currId = window.location.hash.slice(1);

        return `
        <li class="preview">
            <a class="preview__link ${result.id === currId ? 'preview__link--active' : ''}" href="#${result.id}">
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