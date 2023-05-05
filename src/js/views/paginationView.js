import View from "./view";
import icons from 'url:../../img/icons.svg';

/*
* Pagination view class for the pagination buttons in the app UI.
*/

class PaginationView extends View {

    _htmlEl = document.querySelector('.pagination');

    /**
     * Handler for the pagination view buttons clicks.
     * @param {function} handler For the handler function to call.
     */
    addPaginationHandler(handler) {
        this._htmlEl.addEventListener('click', function (event) {
            const btn = event.target.closest('.btn--inline');

            // For clicks outside button border
            if (!btn) {
                return;
            }

            // Get DOMStringMap key and convert it to a number
            const goToPage = +btn.dataset.goto;

            handler(goToPage);
        });
    }

    /**
     * @returns an HTML code to be inserted into the app DOM.
     */
    _generateHTML() {

        // Calculate max number of pages
        const currPage = this._data.page;
        const pages = Math.ceil(this._data.result.length / this._data.resultsPerPage);

        const nextButton = `
        <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
         <span>Page ${currPage + 1}</span>
         <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
         </svg>
        </button>
        `;

        const prevButton = `
        <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
         <span>Page ${currPage - 1}</span>
        </button>
        `;

        // For first page
        if (currPage === 1 && pages > 1) {
            return nextButton;
        }

        // For last page
        if (currPage === 6 && pages > 1) {
            return prevButton;
        }

        // For other pages
        if (currPage < pages) {
            return prevButton + nextButton;
        }

        // For only one page, no button needed
        return '';
    }

}

// Exporting object for the controller
export default new PaginationView();